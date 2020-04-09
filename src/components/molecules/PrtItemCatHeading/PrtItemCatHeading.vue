<script src="./PrtItemCatHeading.js"></script>
<template>
  <div class="prt-item-cat-heading">
    <h2 class="prt-item-cat-heading__text">
      {{ text }}
    </h2>
    <div class="prt-item-cat-heading__btns">
      <PrtButton class="mr-2" @click="openModal('tag')">
        <PrtIcon icon="plus" size="15px" color="white"
      /></PrtButton>
      <PrtButton>
        <PrtIcon icon="chevron_down2" size="15px" color="white"
      /></PrtButton>
    </div>
  </div>
</template>
<style lang="scss">
.prt-item-cat-heading {
  @apply bg-blue-600 flex justify-between p-4;

  &__text {
    @apply text-white py-2 font-bold uppercase;
  }
}
</style>
