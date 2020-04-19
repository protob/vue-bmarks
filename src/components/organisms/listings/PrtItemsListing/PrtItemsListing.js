import PrtCollectionItem from '@/components/molecules/PrtCollectionItem/PrtCollectionItem.vue'

import gql from 'graphql-tag'
import { log } from '@/utils'
import getAllBookmarksByCat from '@/apollo/queries/getAllBookmarksByCat.gql'
import getBookmarksByTag from '@/apollo/queries/getBookmarksByTag.gql'
import getBookmarksByCat from '@/apollo/queries/getBookmarksByCat.gql'

import getBookmarksByPhrase from '@/apollo/queries/getBookmarksByPhrase.gql'

export default {
  name: 'PrtItemsListing',
  components: {
    PrtCollectionItem
  },

  data: () => {
    return {
      items: [],
      isLoading: true,
      error: ''
    }
  },

  mounted() {
    this.getItems()
    this.enableRefetchListener()
    this.enableSortByOrder()
    this.enableSortByPhrase()
    this.enableFilterItemsByCat()
    this.enableFilterItemsByTag()
  },
  methods: {
    prepareSortQuery(key) {
      const map = {
        'date-asc': '{updated_at: asc}',
        'date-desc': '{updated_at: desc}',
        'name-asc': '{name: asc}',
        'name-desc': '{name: desc}'
      }
      const order = map[key]

      const queryString = `
						query getBookmarksByOrder{
							bookmarks(order_by:${order}) {
								uuid
								name
								slug
								updated_at
								url
								user {
									id
								}
								bookmarks_tags {
									tag {
										uuid
										name
										slug
									}
								}
							}
						}
					`

      const query = gql`
        ${queryString}
      `

      return query
    },
    enableFilterItemsByCat() {
      // items by cat
      this.$root.$on('filterItemsByCat', async catData => {
        const { uuid, catName } = catData

        const { data, error } = await this.$apollo.query({
          query: getBookmarksByCat,
          variables: {
            uuid
          },
          fetchPolicy: 'no-cache'
        })
        log(error ? error : data)

        const catItems = data.cats[0].bookmarks // currently single cat filter is supported
        const formattedItems = catItems.map(el => {
          return { bookmark: el }
        })
        let item = {
          name: catName,
          id: new Date().getTime(),
          bookmarks_cats: formattedItems
        }

        this.items = [item]
      })
    },
    enableFilterItemsByTag() {
      //items by tag
      this.$root.$on('filterItemsByTag', async tagData => {
        const { uuid, tagName } = tagData

        const { data, error } = await this.$apollo.query({
          query: getBookmarksByTag,
          variables: {
            uuid
          }
        })
        log(error ? error : data)

        const tags = data.tags
        const tagItems = tags[0].bookmarks_tags // currently single tag filter is supported
        let item = {
          name: tagName,
          id: new Date().getTime(),
          bookmarks_cats: tagItems
        }

        this.items = [item]
      })
    },

    enableSortByOrder() {
      // sort by order
      this.$root.$on('sortItemsByOrder', data => {
        this.$apollo
          .query({
            query: this.prepareSortQuery(data.order)
          })
          .then(result => {
            const tempId = new Date().getTime()
            const items = result.data.bookmarks.map(el => {
              return { bookmark: el }
            })

            let item = {
              name: data.order,
              uuid: tempId,
              bookmarks_cats: items
            }
            this.items = [item]
          })
      })
    },
    enableSortByPhrase() {
      // search by phrase
      this.$root.$on('filterItemsByPhrase', async phraseObj => {
        const { phrase } = phraseObj
        if (!phrase) {
          const { data, error } = await this.$apollo.query({
            query: getAllBookmarksByCat
          })
          log(error ? error : data)
          this.items = data.cats
          return data
        }

        const queryName = '%' + phrase + '%'

        const { data, error } = await this.$apollo.query({
          query: getBookmarksByPhrase,
          variables: {
            phrase: queryName
          }
        })

        log(error ? error : data)
        const tempId = new Date().getTime()
        const items = data.bookmarks.map(el => {
          return { bookmark: el }
        })

        let item = {
          name: phrase,
          uuid: tempId,
          bookmarks_cats: items
        }
        this.items = [item]
        return data
      })
    },
    enableRefetchListener() {
      this.$root.$on('refetchItems', () => {
        this.getItems()
      })
    },
    async getItems() {
      const { data, error } = await this.$apollo.query({
        $loadingKey: 'loading',
        query: getAllBookmarksByCat,
        fetchPolicy: 'no-cache',
        variables: {}
      })
      if (error) {
        this.error = error
      } else {
        this.items = data.cats
        this.isLoading = false
      }
    }
  }
}
