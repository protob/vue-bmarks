<script src="./PrtSidebarItem.js"></script>
<template>
  <div class="prt-sidebar-item flex flex-wrap justify-between">
    <a class="w-auto sm:w-full lg:w-auto" href="#"
      ><h2 class="prt-sidebar-item__text">{{ item.name }}</h2></a
    >

    <div class="prt-sidebar-item__btns w-auto sm:w-full lg:w-auto">
      <PrtButton
        v-show="tax != 'tag'"
        class="ml-2 bg-gray-600"
        @click="
          openModal(
            'item',
            item.uuid,
            { isBookmark: true, taxName: item.name },
            false
          )
        "
      >
        <PrtIcon icon="plus" size="12px" color="white"
      /></PrtButton>
      <PrtButton
        class="ml-2 bg-gray-600"
        @click="openModalTax(tax, item.uuid, item.name, true)"
      >
        <PrtIcon icon="edit" size="12px" color="white"
      /></PrtButton>
      <PrtButton
        class="ml-2  bg-gray-600"
        @click="toggleDeleteTaxModal(tax, item.uuid, item.name)"
      >
        <PrtIcon icon="times" size="12px" color="white"
      /></PrtButton>
    </div>
  </div>
</template>
<style lang="scss">
.prt-sidebar-item__text {
  @apply text-gray-300 py-2 font-bold capitalize cursor-pointer;
}
.prt-sidebar-item {
  @apply flex justify-between p-4  border-t border-gray-600;
}
</style>
