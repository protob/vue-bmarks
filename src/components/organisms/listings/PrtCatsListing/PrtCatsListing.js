import PrtSidebarItem from '@/components/molecules/sidebar/PrtSidebarItem/PrtSidebarItem.vue'
import PrtSidebarHeading from '@/components/molecules/sidebar/PrtSidebarHeading/PrtSidebarHeading.vue'

import getCats from '@/apollo/queries/getCats.gql'

export default {
  name: 'PrtCatsListing',
  components: {
    PrtSidebarHeading,
    PrtSidebarItem
  },

  data: () => {
    return {
      items: [],
      error: '',
      isLoading: true
    }
  },

  mounted() {
    this.getCats()
  },
  methods: {
    async getCats() {
      const { data, error } = await this.$apollo.query({
        $loadingKey: 'loading',
        query: getCats,
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
