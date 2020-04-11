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
    } else {
      const cats = data.cats
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
    }
  },
  //- CATEGORY
  deleteCatWithAllBookmarks(itemData, apollo) {
    this.generateBookmarkTagMap(itemData, apollo).then(obj => {
      this.deleteCatBookmarks(obj, itemData, apollo)
    })
  },

  async deleteCatBookmarks(bookmarkTagsMap, itemData, apollo) {
    const bookmarksUuids = Object.keys(bookmarkTagsMap)

    // dont bother if empty cat
    if (!bookmarksUuids.length) {
      return this.deleteSingleCat(itemData, apollo)
    }
    const DELETE_BOOKMARKS_TAGS = this.prepareDeleteBookmarksTagsQuery(
      bookmarksUuids
    )

    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: DELETE_BOOKMARKS_TAGS,
      refetchQueries: ['getTags', 'getAllBookmarksByCat']
    })

    if (error) {
      log(error)
    } else {
      this.deleteSingleCat(data, apollo)
    }
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
  },

  async deleteSingleTag(uuid, apollo) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: deleteTag,
      variables: {
        uuid
      },
      refetchQueries: ['getTags', 'getAllBookmarksByCat']
    })
    log(error ? error : data)
  },
  async deleteSingleBookmark(uuid, apollo) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: deleteBookmark,
      variables: {
        uuid
      },
      refetchQueries: ['getCats', 'getTags', 'getAllBookmarksByCat']
    })
    log(error ? error : data)
  },

  deleteItem(itemData, apollo) {
    const uuid = itemData.taxUuid
    // COLLECTION ITEMS / TAXONOMY ITEMS
    itemData.target === 'item'
      ? this.deleteSingleBookmark(uuid, apollo)
      : itemData.target === 'cat'
      ? this.deleteCatWithAllBookmarks(itemData, apollo)
      : this.deleteSingleTag(uuid, apollo)
  }
}

export default DeleteService
