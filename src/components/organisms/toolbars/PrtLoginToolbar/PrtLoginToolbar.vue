<script src="./PrtLoginToolbar.js"></script>
<template>
  <div class="prt-login-toolbar sm:flex  flex-col justify-start hidden ">
    <PrtButton @click="authAction">{{ buttonText }}</PrtButton>
  </div>
</template>
<style lang="scss">
.prt-login-toolbar {
  .prt-button {
    --button-padding-top: 0.7rem;
    --button-padding-bottom: 0.7rem;
  }
}
</style>
