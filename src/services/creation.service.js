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
    const MUTATION = target == 'cat' ? addCat : addTag
    const query = target == 'cat' ? 'getCats' : 'getTags'
    const name = obj.name
    const slug = slugify(name)
    const uuid = obj.uuid ? obj.uuid.trim() : uuidv4()

    const data = {
      uuid,
      name,
      slug,
      userUuid,
      userId
    }

    // console.log(data)

    const { dataOutput, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: MUTATION,
      variables: data,
      refetchQueries: [query]
    })
    log(error ? error : dataOutput)
  },

  addCollectionItemAndMaybeTags(apollo, obj, userId, userUuid) {
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

    if (tags.length > 0) {
      // preparetags
      const tagsToInsert = bookmarkObj.tags.map(el => {
        return {
          name: el,
          slug: slugify(el),
          userId: userId,
          userUuid: userUuid
        }
      })

      this.insertTags(apollo, tagsToInsert, bookmarkObj).then(
        updatedBookmarkObj => {
          this.insertCollectionItem(apollo, updatedBookmarkObj)
        }
      )
    } else {
      this.insertCollectionItem(apollo, bookmarkObj)
    }
  },

  // INSERT
  async insertTags(apollo, tagsToInsert, bookmarkObj) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: addTags,
      variables: {
        objects: tagsToInsert
      },
      refetchQueries: ['getAllBookmarksByCat', 'getTags']
    })
    if (error) {
      log(error)
    } else {
      const respArr = data.insert_tags.returning
      const tagsBookmarksMap = respArr.map(item => {
        return {
          bookmarkUuid: bookmarkObj.bookmarkUuid,
          tagUuid: item.uuid
        }
      })

      bookmarkObj.tags = tagsBookmarksMap

      return Promise.resolve(bookmarkObj)
    }

    return data
  },
  async insertCollectionItem(apollo, bookmarkObj) {
    const { dataOutput, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: addBookmark,
      variables: bookmarkObj,
      refetchQueries: ['getAllBookmarksByCat']
    })
    log(error ? error : dataOutput)
  }
}

export default CreateService
