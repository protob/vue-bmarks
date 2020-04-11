<script src="./PrtItem.js"></script>
<template>
  <div class="prt-item flex justify-between  flex-wrap">
    {{ item }}
    <div class="prt-item__panel ">
      <h1 class="prt-item__h">
        <a href="" target="_blank" class="prt-item__link">{{ item.name }}</a>
      </h1>
      <p>{{ item.url }}</p>
      <p>{{ item.desc }}</p>
      <p>
        {{ item.updated_at }}
      </p>
    </div>

    <div class="prt-item__buttons">
      <PrtButton
        class="mr-2"
        @click.prevent="openModal('item', item.uuid, item, true)"
      >
        <PrtIcon icon="edit" size="15px" color="white"
      /></PrtButton>
      <PrtButton @click.prevent="openModal('tag')">
        <PrtIcon icon="times" size="15px" color="white"
      /></PrtButton>
    </div>

    <div class=" w-full prt-item__tags">
      <PrtTags :tags="item.bookmarks_tags" />
    </div>
  </div>
</template>
<style lang="scss">
.prt-item {
  @apply border-t border-gray-700 pl-4 pr-3 pt-4 pb-8 flex justify-between bg-gray-900 text-left;
  p {
    @apply text-white  pb-2;
  }
  &__h {
    @apply text-white text-2xl pb-2;
  }
}
</style>
