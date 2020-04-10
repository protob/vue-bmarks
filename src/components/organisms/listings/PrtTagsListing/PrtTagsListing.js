import PrtSidebarItem from '@/components/molecules/sidebar/PrtSidebarItem/PrtSidebarItem.vue'
import PrtSidebarHeading from '@/components/molecules/sidebar/PrtSidebarHeading/PrtSidebarHeading.vue'
import getTags from '@/apollo/queries/getTags.gql'
import vueScroll from 'vuescroll'
export default {
  name: 'PrtTagsListing',
  components: {
    PrtSidebarHeading,
    PrtSidebarItem,
    vueScroll
  },
  data: () => {
    return {
      items: [],
      isLoading: true,
      error: ''
    }
  },

  mounted() {
    this.getTags()
  },
  methods: {
    async getTags() {
      const { data, error } = await this.$apollo.query({
        $loadingKey: 'loading',
        query: getTags,
        variables: {}
      })
      if (error) {
        this.error = error
      } else {
        this.items = data.tags
        this.isLoading = false
      }
    }
  }
}
