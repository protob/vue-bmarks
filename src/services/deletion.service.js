import gql from 'graphql-tag'
import { log } from '@/utils'
import { GET_BOOKMARKS_BY_CAT } from '@/queries/readQueries.js'
import {
  DELETE_BOOKMARK,
  DELETE_CAT,
  DELETE_TAG
} from '@/queries/deleteQueries.js'

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
  generateBookmarkTagMap(itemData, apollo) {
    const uuid = itemData.taxUuid

    let out = apollo
      .query({
        query: GET_BOOKMARKS_BY_CAT,
        variables: {
          uuid
        }
      })
      .then(result => {
        const cats = result.data.cats
        const catItems = cats[0].bookmarks // currently single cat filter is supported
        const formattedItems = catItems.map(el => {
          return { bookmark: el }
        })
        let tempItem = {
          name: itemData.name,
          bookmarks_cats: formattedItems
        }

        let o = {}
        tempItem.bookmarks_cats.forEach(item => {
          const tags = item.bookmark.bookmarks_tags
          if (tags) {
            const arr = tags.map(el => {
              return {
                uuid: el.tag.uuid
              }
            })
            if (arr.length) {
              o[item.bookmark.uuid] = arr
            }
          }
        })

        return Promise.resolve(o)
      })

    return out
  },
  deleteCatWithAllBookmarks(itemData, apollo) {
    this.generateBookmarkTagMap(itemData, apollo).then(obj => {
      this.deleteCatBookmarks(obj, itemData, apollo)
    })
  },
  deleteCatBookmarks(bookmarkTagsMap, itemData, apollo) {
    const bookmarksUuids = Object.keys(bookmarkTagsMap)
    const DELETE_BOOKMARKS_TAGS = this.prepareDeleteBookmarksTagsQuery(
      bookmarksUuids
    )
    apollo
      .mutate({
        mutation: DELETE_BOOKMARKS_TAGS,
        refetchQueries: ['getTags', 'getAllBookmarksByCat']
      })
      .then(() => this.deleteSingleCat(itemData, apollo))
      .catch(error => log(error))
  },

  deleteSingleCat(itemData, apollo) {
    const uuid = itemData.taxUuid
    apollo
      .mutate({
        mutation: DELETE_CAT,
        variables: {
          uuid
        },
        refetchQueries: ['getCats', 'getAllBookmarksByCat']
      })
      .then(data => log(data))
      .catch(error => log(error))
  },

  deleteSingleTag(uuid, apollo) {
    apollo
      .mutate({
        mutation: DELETE_TAG,
        variables: {
          uuid
        },
        refetchQueries: ['getTags', 'getAllBookmarksByCat']
      })
      .then(data => log(data))
      .catch(error => log(error))
  },
  deleteSingleBookmark(uuid, apollo) {
    apollo
      .mutate({
        mutation: DELETE_BOOKMARK,
        variables: {
          uuid
        },
        refetchQueries: ['getCats', 'getTags', 'getAllBookmarksByCat']
      })
      .then(data => log(data))
      .catch(error => log(error))
  },

  deleteItem(itemData, apollo) {
    const uuid = itemData.taxUuid
    // COLLECTION ITEMS / TAXONOMY ITEMS
    itemData.target === 'bookmark'
      ? this.deleteSingleBookmark(uuid, apollo)
      : itemData.target === 'cat'
      ? this.deleteCatWithAllBookmarks(itemData, apollo)
      : this.deleteSingleTag(uuid, apollo)
  }
}

export default DeleteService
