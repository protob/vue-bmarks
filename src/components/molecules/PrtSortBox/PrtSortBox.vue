<script src="./PrtSortBox.js"></script>
<template>
  <div class="prt-sort-box">
    <PrtSelect
      v-model="selected"
      :class="'customClassa pb-0'"
      :label="'label'"
      :size="5"
      :required="true"
      :valid="true"
      :error-message="'errorMessage'"
    >
      <PrtSelectOption
        v-for="(option, key) in options"
        :key="key"
        :value="option.value"
      >
        {{ option.label }}
      </PrtSelectOption>
    </PrtSelect>
  </div>
</template>
<style lang="scss">
.prt-sort-box {
  width: 100%;
}
</style>
