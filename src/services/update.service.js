const slugify = require('slugify')
const uuidv4 = require('uuid/v4')
import { log } from '@/utils'

import addTags from '@/apollo/queries/addTags.gql'
import updateItemAndIgnoreTags from '@/apollo/queries/updateItemAndIgnoreTags.gql'
import updateItemWithTags from '@/apollo/queries/updateItemWithTags.gql'
import getTagsByUserId from '@/apollo/queries/getTagsByUserId.gql'
// mpove to update servie
import updateCat from '@/apollo/queries/updateCat.gql'
import updateTag from '@/apollo/queries/updateTag.gql'
import gql from 'graphql-tag'
const UpdateService = {
  // prepare
  prepareDeleteItemsTagsQuery(arr) {
    const queryString = `mutation DeleteTags{delete_items_tags(where: {itemUuid:{_in: 
      ${JSON.stringify(arr)}}}) {affected_rows returning { tagUuid}}}`

    const query = gql`
      ${queryString}
    `

    return query
  },
  normalizeTags(tags) {
    typeof tags == 'object'
      ? (tags = JSON.parse(JSON.stringify(tags)))
      : (tags = tags.trim().split(','))

    return tags.filter(n => n) // remove empty strings
  },

  // add or updatete teampny item
  async updateTaxonomyItem(apollo, obj, target, userUuid, userId) {
    const name = obj.name
    const slug = slugify(name)
    const uuid = obj.uuid ? obj.uuid.trim() : uuidv4()

    const dataInput = {
      uuid,
      name,
      slug,
      userUuid,
      userId
    }

    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: target == 'cat' ? updateCat : updateTag,
      variables: { ...dataInput }
    })

    log(error ? error : data)
    return error ? false : data
  },

  async updateCollectionItem(apollo, obj, userId, userUuid) {
    let tags = !obj.tags ? [] : obj.tags
    tags = this.normalizeTags(tags)

    const itemObj = {
      itemUuid: obj.uuid,
      userUuid: userUuid,
      userId: userId,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      catUuid: obj.catUuid
    }

    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: updateItemAndIgnoreTags,
      variables: itemObj,
      refetchQueries: ['getAllItemsByCat']
    })
    log(error ? error : data)

    //------

    await this.clearCollectionItemTags(apollo, itemObj)

    if (tags.length > 0) {
      await this.updateCollectionItemTags(apollo, itemObj, tags)
    }
    return error ? false : data
  },
  async clearCollectionItemTags(apollo, itemObj) {
    const itemsUuids = [itemObj.itemUuid]

    const DELETE_BOOKMARKS_TAGS = this.prepareDeleteItemsTagsQuery(itemsUuids)
    // it  removes only mapping from item_tags table not tag itself
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: DELETE_BOOKMARKS_TAGS
    })

    log(error ? error : data)
    return error ? error : data
  },

  async updateCollectionItemTags(apollo, itemObj, tags) {
    const { userId, userUuid } = itemObj
    const tagsToInsert = tags.map(el => {
      return {
        name: el,
        slug: slugify(el),
        userId,
        userUuid
      }
    })

    const updatedData = await this.prepareTagsBeforeSend(
      apollo,
      userId,
      tagsToInsert
    )

    const updatedItemObj = await this.updateTags(apollo, updatedData, itemObj)

    return await this.updateCollectionItemWithTags(apollo, updatedItemObj)
  },

  // to be fefactored creation service.line 97
  async updateTags(apollo, tagsToInsert, itemObj) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: addTags,
      variables: {
        objects: tagsToInsert
      }
    })
    if (error) {
      log(error)
      return false
    }
    const tagsItemsMap = await data.insert_tags.returning.map(item => {
      return {
        itemUuid: itemObj.itemUuid,
        tagUuid: item.uuid
      }
    })
    itemObj.tags = tagsItemsMap
    return itemObj
  },

  async updateCollectionItemWithTags(apollo, itemObj) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: updateItemWithTags,
      variables: itemObj
    })
    log(error ? error : data)
    return error ? false : data
  },

  getUniqueTags(tags) {
    return tags.filter(
      (item, index, self) =>
        index === self.findIndex(elem => elem.slug === item.slug)
    )
  },

  async prepareTagsBeforeSend(apollo, userId, tagsToInsert) {
    // only unique tag slugs
    const uniqueSlugsItemsArr = this.getUniqueTags(tagsToInsert)
    const slugsArr = uniqueSlugsItemsArr.map(item => item.slug)

    // only existing user tags
    const { data, error } = await apollo.query({
      $loadingKey: 'loading',
      query: getTagsByUserId,
      variables: {
        userId: userId,
        objects: [...slugsArr]
      },
      fetchPolicy: 'no-cache'
    })

    if (error) {
      log(error)
      return false
    }

    let updatedData = uniqueSlugsItemsArr

    return data.tags.length
      ? this.mapTagsBeforeSend(data.tags, uniqueSlugsItemsArr, updatedData)
      : uniqueSlugsItemsArr.map(item => ({
          ...item,
          uuid: uuidv4()
        }))
  },

  mapTagsBeforeSend(dataTags, dataToSend) {
    const res = dataTags.filter(n => dataToSend.some(n2 => n.slug == n2.slug))

    // convert array of Objects into one Object
    const responseObj = Object.assign(
      {},
      ...res.map(item => ({ [item.slug]: item }))
    )

    return dataToSend.map(item => ({
      ...item,
      uuid: responseObj[item.slug] ? responseObj[item.slug].uuid : uuidv4()
    }))
  }
}

export default UpdateService
