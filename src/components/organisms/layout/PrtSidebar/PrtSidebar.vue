<script src="./PrtSidebar.js"></script>
<template>
  <div class="prt-sidebar bg-gray-700 h-full">
    <div class="sidebar__cats"><PrtCatsListing /></div>
    <div class="sidebar__tags"><PrtTagsListing /></div>
  </div>
</template>
<style lang="scss">
.sidebar__cats,
.sidebar__tags {
  overflow: hidden;
}
</style>
