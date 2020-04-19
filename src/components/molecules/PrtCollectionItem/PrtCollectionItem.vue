<script src="./PrtCollectionItem.js"></script>
<template>
  <div class="prt-collection-item">
    <PrtItemCatHeading :text="collectionItem.name" />

    <PrtItem
      v-for="item in collectionItem.items_cats"
      :key="item.uuid"
      :catUuid="collectionItem.uuid"
      :item="item.item"
    />
  </div>
</template>
