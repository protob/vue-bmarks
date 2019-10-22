<template lang="html">
  <div>
    <div class="flex h-full content-wrapper">
      <aside class=" bg-gray-500 sidebar-wrap"></aside>

      <div class="bg-gray-400 w-16  main-panel"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContent"
};
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
.sidebar-wrap {
  width: calc(16.66666% + 2rem);
}
.main-panel {
  width: calc(100% - 16rem);
}
</style>
