<script src="./PrtItemsListing.js"></script>
<template>
  <div class="prt-items-listing ">
    <PrtItemCatHeading :text="'test cat'" />

    <div class="prt-items-listing__items">
      <vue-scroll>
        <div class="scrollbar-content">
          <PrtItem
            v-for="(item, index) in Array.from(Array(32).keys())"
            :key="index"
            :text="'item-' + index"
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
  height: calc(100% - 72px);
  overflow: hidden;
}
</style>
