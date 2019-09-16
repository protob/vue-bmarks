<template lang="html">
<div>
    <div class="flex h-full content-wrapper">
        <aside class="w-1/6 bg-gray-500 sidebar">
            sidebar
        </aside>
        <div class="w-5/6 bg-gray-400 h-full main-panel">
            listing
        </div>
    </div>
</div>
  
</template>

<script lang="js">


  export default  {
    name: 'main-content',
    props: [],
    components:{

    },
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.content-wrapper,
.sidebar,
.main-panel {
  min-height: 100vh;
  * {
    color: black;
  }
}
</style>
