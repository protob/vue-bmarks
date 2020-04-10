const slugify = require('slugify')
const uuidv4 = require('uuid/v4')
import { log } from '@/utils'
// import { GET_TAGS_BY_USERID } from '@/queries/readQueries.js'
// import {
//   UPDATE_BOOKMARK_WITH_TAGS,
//   UPDATE_BOOKMARK_AND_IGNORE_TAGS
// } from '@/queries/updateQueries.js'

// import { ADD_TAGS } from '@/queries/createQueries.js'

import addTags from '@/apollo/queries/addTags.gql'
import updateBookmarkAndIgnoreTags from '@/apollo/queries/updateBookmarkAndIgnoreTags.gql'
import updateBookmarkWithTags from '@/apollo/queries/updateBookmarkWithTags.gql'
import getTagsByUserId from '@/apollo/queries/getTagsByUserId.gql'
const UpdateService = {
  // prepare

  normalizeTags(tags) {
    typeof tags == 'object'
      ? (tags = JSON.parse(JSON.stringify(tags)))
      : (tags = tags.trim().split(','))

    return tags.filter(n => n) // remove empty strings
  },

  async updateCollectionItem(apollo, obj, userId, userUuid) {
    let tags = !obj.tags ? [] : obj.tags
    tags = this.normalizeTags(tags)

    const bookmarkObj = {
      bookmarkUuid: obj.uuid,
      userUuid: userUuid,
      userId: userId,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      catUuid: obj.catUuid
    }

    const { data, error } = await this.$apollo.mutate({
      $loadingKey: 'loading',
      mutation: updateBookmarkAndIgnoreTags,
      variables: bookmarkObj,
      refetchQueries: ['getAllBookmarksByCat']
    })
    log(error ? error : data)

    //------

    if (tags.length > 0) {
      const tagsToInsert = tags.map(el => {
        return {
          name: el,
          slug: slugify(el),
          userId: userId,
          userUuid: userUuid
        }
      })

      this.prepareTagsBeforeSend(apollo, userId, tagsToInsert).then(
        updatedData => {
          this.updateTags(apollo, updatedData, bookmarkObj).then(
            updatedBookmarkObj => {
              this.updateCollectionItemWithTags(apollo, updatedBookmarkObj)
            }
          )
        }
      )
    }
  },
  async updateTags(apollo, tagsToInsert, bookmarkObj) {
    const { data, error } = await this.$apollo.mutate({
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

  async updateCollectionItemWithTags(apollo, bookmarkObj) {
    const { data, error } = await this.$apollo.mutate({
      $loadingKey: 'loading',
      mutation: updateBookmarkWithTags,
      variables: bookmarkObj,
      refetchQueries: ['getAllBookmarksByCat']
    })
    log(error ? error : data)
  },

  async prepareTagsBeforeSend(apollo, userId, tagsToInsert) {
    const uniqueSlugsItemsArr = tagsToInsert.filter(
      (item, index, self) =>
        index === self.findIndex(elem => elem.slug === item.slug)
    ) // only unique tag slugs

    const slugsArr = uniqueSlugsItemsArr.map(item => item.slug)

    // only existing user tags

    const { data, error } = await this.$apollo.query({
      $loadingKey: 'loading',
      query: getTagsByUserId,
      variables: {
        userId: userId,
        objects: [...slugsArr]
      },
      fetchPolicy: 'no-cache',
      refetchQueries: ['getAllBookmarksByCat', 'getTags']
    })

    if (error) {
      log(error)
    } else {
      const data = data.tags
      const dataToSend = uniqueSlugsItemsArr

      let updatedData = dataToSend
      if (data.length) {
        //Array of objects intersection
        const res = data.filter(n => dataToSend.some(n2 => n.slug == n2.slug))

        // convert array of Objects into one Object
        const responseObj = Object.assign(
          {},
          ...res.map(item => ({ [item.slug]: item }))
        )

        updatedData = dataToSend.map(item => ({
          ...item,
          uuid: responseObj[item.slug] ? responseObj[item.slug].uuid : uuidv4()
        }))

        return Promise.resolve(updatedData)
      } else {
        updatedData = dataToSend.map(item => ({
          ...item,
          uuid: uuidv4()
        }))
        return Promise.resolve(updatedData)
      }
    }
    return data
  }
}

export default UpdateService
