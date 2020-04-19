// import gql from 'graphql-tag'
import { log } from '@/utils'
// import { GET_BOOKMARKS_BY_CAT } from '@/queries/readQueries.js'
// import {
//   DELETE_BOOKMARK,
//   DELETE_CAT,
//   DELETE_TAG
// } from '@/queries/deleteQueries.js'
import gql from 'graphql-tag'
import deleteBookmark from '@/apollo/queries/delBookmark.gql'
import deleteCat from '@/apollo/queries/delCats.gql'
import deleteTag from '@/apollo/queries/delTags.gql'
import getBookmarksByCat from '@/apollo/queries/getBookmarksByCat.gql'
const DeleteService = {
  prepareDeleteBookmarksTagsQuery(arr) {
    const queryString = `mutation DeleteTags{delete_bookmarks_tags(where: {bookmarkUuid:{_in: ${JSON.stringify(
      arr
    )}}}) {
						affected_rows
							returning {
								tagUuid
							}
						}
					}
					`

    const query = gql`
      ${queryString}
    `

    return query
  },

  async generateBookmarkTagMap(itemData, apollo) {
    const uuid = itemData.taxUuid

    const { data, error } = await apollo.query({
      $loadingKey: 'loading',
      query: getBookmarksByCat,
      variables: {
        uuid
      }
    })
    if (error) {
      log(error)
      return false
    }

    // currently single cat filter is supported

    let tempItem = {
      name: itemData.name,
      bookmarks_cats: data.cats[0].bookmarks.map(el => {
        return { bookmark: el }
      })
    }

    let BookmarkTagMapObj = {}
    tempItem.bookmarks_cats.forEach(item => {
      const tags = item.bookmark.bookmarks_tags
      if (tags) {
        BookmarkTagMapObj[item.bookmark.uuid] = tags.map(el => {
          return {
            uuid: el.tag.uuid
          }
        })
      }
    })

    return BookmarkTagMapObj
  },
  //- CATEGORY
  async deleteCatWithAllBookmarks(itemData, apollo) {
    const BookmarkTagMapObj = await this.generateBookmarkTagMap(
      itemData,
      apollo
    )

    return this.deleteCatBookmarks(BookmarkTagMapObj, itemData, apollo)
  },

  async deleteCatTags(itemData, bookmarksUuids, apollo) {
    const DELETE_BOOKMARKS_TAGS = this.prepareDeleteBookmarksTagsQuery(
      bookmarksUuids
    )

    // it removes only mapping from bookmark_tags table not tag itself
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: DELETE_BOOKMARKS_TAGS
    })

    log(error ? error : data)
    return error ? error : this.deleteSingleCat(itemData, apollo)
  },

  async deleteCatBookmarks(bookmarkTagsMap, itemData, apollo) {
    const bookmarksUuids = Object.keys(bookmarkTagsMap)

    return !bookmarksUuids.length
      ? this.deleteSingleCat(itemData, apollo)
      : this.deleteCatTags(itemData, bookmarksUuids, apollo)
  },

  async deleteSingleCat(itemData, apollo) {
    const uuid = itemData.taxUuid

    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: deleteCat,
      variables: {
        uuid
      },
      refetchQueries: ['getCats', 'getAllBookmarksByCat']
    })
    log(error ? error : data)
    return data
  },

  async deleteSingleTag(uuid, apollo) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: deleteTag,
      variables: {
        uuid
      }
    })
    log(error ? error : data)
    return data
  },
  async deleteSingleBookmark(uuid, apollo) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: deleteBookmark,
      variables: {
        uuid
      }
    })
    log(error ? error : data)

    return data
  },

  async deleteItem(itemData, apollo) {
    const uuid = itemData.taxUuid
    // COLLECTION ITEMS / TAXONOMY ITEMS
    return itemData.target === 'item'
      ? await this.deleteSingleBookmark(uuid, apollo)
      : itemData.target === 'cat'
      ? await this.deleteCatWithAllBookmarks(itemData, apollo)
      : await this.deleteSingleTag(uuid, apollo)
  }
}

export default DeleteService
