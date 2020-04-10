<script src="./PrtItemsListing.js"></script>
<template>
  <div class="prt-items-listing ">
    <div class="prt-items-listing__items">
      <vue-scroll>
        <div class="scrollbar-content">
          <PrtCollectionItem
            v-for="item in items"
            :key="item.uuid"
            :collectionItem="item"
          />
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<style lang="scss">
.prt-items-listing {
  max-height: calc(100vh - 149px);
  height: calc(100vh - 149px);
}
.prt-items-listing__items {
  // height: calc(100% - 72px);
  height: 100%;
  overflow: hidden;
}
</style>
