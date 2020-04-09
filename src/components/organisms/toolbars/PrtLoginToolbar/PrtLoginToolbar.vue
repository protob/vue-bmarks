<script src="./PrtLoginToolbar.js"></script>
<template>
  <div class="prt-login-toolbar sm:flex  flex-col justify-start hidden ">
    <PrtButton>Logout</PrtButton>
  </div>
</template>
<style lang="scss">
.prt-login-toolbar {
  .prt-button {
    --button-padding-top: 0.6rem;
    --button-padding-bottom: 0.6rem;

    // --button-font-size: 0.875rem;
  }
}
</style>
