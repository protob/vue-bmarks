const slugify = require('slugify')
const uuidv4 = require('uuid/v4')

import { log } from '@/utils'

import addCat from '@/apollo/queries/addCat.gql'
import addTag from '@/apollo/queries/addTag.gql'
import addTags from '@/apollo/queries/addTags.gql'
import addItem from '@/apollo/queries/addItem.gql'

const CreateService = {
  normalizeTags(tags) {
    if (typeof tags == 'object') {
      tags = JSON.parse(JSON.stringify(tags))
    } else {
      tags = tags.trim().split(',')
    }
    return tags.filter(n => n) // remove empty strings
  },

  // ADD
  // add or updatete teampny item
  async addTaxonomyItem(apollo, obj, target, userUuid, userId) {
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
      mutation: target == 'cat' ? addCat : addTag,
      variables: { ...dataInput }
    })

    log(error ? error : data)
    return error ? false : data
  },

  async insertTagsBeforeCollectionItem(apollo, itemObj) {
    // preparetags

    const tagsToInsert = itemObj.tags.map(el => {
      return {
        name: el,
        slug: slugify(el),
        userId: itemObj.userId,
        userUuid: itemObj.userUuid
      }
    })

    return await this.insertTags(apollo, tagsToInsert, itemObj)
  },

  async addCollectionItemAndMaybeTags(apollo, obj, userId, userUuid) {
    let tags = !obj.tags ? [] : obj.tags
    tags = this.normalizeTags(tags)

    const itemObj = {
      itemUuid: uuidv4(),
      userUuid: userUuid,
      userId: userId,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      catUuid: obj.catUuid,
      tags: tags
    }

    const itemObjToInsert =
      tags.length > 0
        ? await this.insertTagsBeforeCollectionItem(apollo, itemObj)
        : itemObj

    return await this.insertCollectionItem(apollo, itemObjToInsert)
  },

  // INSERT
  async insertTags(apollo, tagsToInsert, itemObj) {
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
  async insertCollectionItem(apollo, itemObj) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: addItem,
      variables: itemObj
    })
    log(error ? error : data)

    return error ? false : data
  }
}

export default CreateService
