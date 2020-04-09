<script src="./PrtForm.js"></script>
<template>
  <div class="prt-form">
    <slot></slot>
  </div>
</template>
<style lang="scss">
.prt-form .prt-button {
  --button-border-radius: 0;
  --button-padding-top: 0.75rem;
  --button-padding-bottom: 0.75rem;
}
.prt-textarea textarea {
  --input-padding: 1rem 1rem 1rem 1rem;
}

.prt-input input {
  --input-padding: 1rem 1rem 1rem 1rem;
}

.prt-input__wrapper {
  --input-border: 1px solid #cbd5e0;
  --input-border-width: 1px 1px 1px 1px;
  --input-label-display: none;
}

.prt-textarea__wrapper {
  --input-border: 1px solid #cbd5e0;
  --input-border-width: 1px 1px 1px 1px;
  --input-label-display: none;
}
</style>
