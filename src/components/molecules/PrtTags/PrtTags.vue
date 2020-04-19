<script src="./PrtTags.js"></script>
<template>
  <div class="prt-tags">
    <div class="flex" v-if="tags">
      <PrtButton
        class="mr-2"
        v-for="item in tags"
        :key="item.tag.uuid"
        @click="filterItemsByTag(item.tag.uuid, item.tag.name)"
      >
        {{ item.tag.name }}
      </PrtButton>
    </div>
  </div>
</template>
