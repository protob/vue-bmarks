<script src="./PrtCollectionItem.js"></script>
<template>
  <div class="prt-collection-item">
    <PrtItemCatHeading :text="collectionItem.name" />

    <PrtItem
      v-for="item in collectionItem.bookmarks_cats"
      :key="item.uuid"
      :catUuid="collectionItem.uuid"
      :item="item.bookmark"
    />
  </div>
</template>
