<script src="./PrtSearchBox.js"></script>
<template>
  <div class="prt-search-box">
    <PrtInput
      class="pb-0"
      placeholder="Search"
      v-model="filterPhrase"
      @input="filterItems"
    />
  </div>
</template>
<style lang="scss">
.prt-search-box {
  .prt-input input {
    --input-border: none;
    --input-padding: 0.75rem 0.75rem;
  }
}
</style>
