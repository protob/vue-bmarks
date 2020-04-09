<script src="./PrtButton.js"></script>
<template>
  <button
    class="prt-button btn-blue"
    v-bind="$attrs"
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.btn-blue {
  @apply bg-blue-500;
}
.prt-button {
  padding-top: var(--button-padding-top, 0.5rem);
  padding-bottom: var(--button-padding-bottom, 0.5rem);
  border-radius: var(--button-border-radius, 0.25rem);
  font-size: var(--button-font-size, 1rem);
  @apply text-white font-bold  px-4;
}
.prt-button:hover {
  @apply bg-blue-700;
}
</style>
