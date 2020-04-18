import PrtCollectionItem from '@/components/molecules/PrtCollectionItem/PrtCollectionItem.vue'

import getAllBookmarksByCat from '@/apollo/queries/getAllBookmarksByCat.gql'
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
  },
  methods: {
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
