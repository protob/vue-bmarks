<script src="./PrtTags.js"></script>
<template>
  <div class="prt-tags flex">
    <PrtButton
      class="mr-2"
      v-for="(item, index) in Array.from(Array(3).keys())"
      :key="index"
    >
      tag {{ item }}</PrtButton
    >
  </div>
</template>
<style lang="scss"></style>
