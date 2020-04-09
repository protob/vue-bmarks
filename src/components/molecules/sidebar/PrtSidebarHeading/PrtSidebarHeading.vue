<script src="./PrtSidebarHeading.js"></script>
<template>
  <div class="prt-sidebar-heading flex justify-between shadow-xl">
    <h1 class="prt-sidebar-heading__text w-1/2 sm:w-full xl:w-1/2 xxl:w-full">
      {{ text }}
    </h1>

    <div
      class="prt-sidebar-heading__buttons flex justify-end sm:justify-between xl:justify-end w-1/2 sm:w-full xl:w-1/2 xxl:w-full"
    >
      <PrtButton class="bg-gray-900 mr-2" @click="openModal('tag')">
        <PrtIcon icon="plus" size="15px" color="white"
      /></PrtButton>
      <PrtButton class="bg-gray-900">
        <PrtIcon icon="chevron_down2" size="15px" color="white"
      /></PrtButton>
    </div>
  </div>
</template>
<style lang="scss">
.prt-sidebar-heading__text {
  @apply text-white py-2 font-bold uppercase text-left;

  @screen sm {
    @apply w-full;
  }
}

.prt-sidebar-heading {
  @apply bg-gray-800 flex  flex-wrap justify-between p-4;

  @screen xxl {
    @apply flex-no-wrap;
  }
}
</style>
