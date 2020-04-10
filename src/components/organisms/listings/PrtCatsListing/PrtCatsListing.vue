<script src="./PrtCatsListing.js"></script>
<template>
  <div class="prt-cats-listing">
    <PrtSidebarHeading :tax="'cat'" />

    <div class="prt-tags-listing__items">
      <vue-scroll>
        <div class="scrollbar-content">
          <PrtSidebarItem
            v-for="item in items"
            :key="item.uuid"
            :item="item"
            :tax="'cat'"
          />
        </div>
      </vue-scroll>
    </div>
  </div>
</template>
<style lang="scss">
.prt-cats-listing {
  max-height: calc(50vh - 80px);
  height: calc(50vh - 80px);
  @media screen and (max-width: 640px) {
    max-height: 146px;
    height: 146px;
  }
}
.prt-cats-listing__items {
  height: calc(100% - 72px);
  overflow: hidden;
}
</style>
