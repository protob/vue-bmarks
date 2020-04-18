const slugify = require('slugify')
const uuidv4 = require('uuid/v4')

import { log } from '@/utils'
// import {
//   ADD_CAT,
//   ADD_TAG,
//   ADD_TAGS,
//   ADD_BOOKMARK
// } from '@/queries/createQueries.js'

import addCat from '@/apollo/queries/addCat.gql'
import addTag from '@/apollo/queries/addTag.gql'
import addTags from '@/apollo/queries/addTags.gql'
import addBookmark from '@/apollo/queries/addBookmark.gql'

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

  async insertTagsBeforeCollectionItem(apollo, bookmarkObj) {
    // preparetags
    const tagsToInsert = bookmarkObj.tags.map(el => {
      return {
        name: el,
        slug: slugify(el),
        userId: bookmarkObj.userId,
        userUuid: bookmarkObj.userUuid
      }
    })

    return await this.insertTags(apollo, tagsToInsert, bookmarkObj)
  },

  async addCollectionItemAndMaybeTags(apollo, obj, userId, userUuid) {
    let tags = !obj.tags ? [] : obj.tags
    tags = this.normalizeTags(tags)

    const bookmarkObj = {
      bookmarkUuid: uuidv4(),
      userUuid: userUuid,
      userId: userId,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      catUuid: obj.catUuid,
      tags: tags
    }

    const bookmarkObjToInsert =
      tags.length > 0
        ? await this.insertTagsBeforeCollectionItem(apollo, bookmarkObj)
        : bookmarkObj

    return await this.insertCollectionItem(apollo, bookmarkObjToInsert)
  },

  // INSERT
  async insertTags(apollo, tagsToInsert, bookmarkObj) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: addTags,
      variables: {
        objects: tagsToInsert
      }
    })

    if (error) {
      log(error)
      return data
    }
    const tagsBookmarksMap = await data.insert_tags.returning.map(item => {
      return {
        bookmarkUuid: bookmarkObj.bookmarkUuid,
        tagUuid: item.uuid
      }
    })
    bookmarkObj.tags = tagsBookmarksMap
    return bookmarkObj
  },
  async insertCollectionItem(apollo, bookmarkObj) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: addBookmark,
      variables: bookmarkObj
    })
    log(error ? error : data)

    return error ? false : data
  }
}

export default CreateService
