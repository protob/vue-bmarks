<script src="./PrtHeader.js"></script>
<template>
  <header class="prt-header bg-gray-900 px-4 py-4 w-full z-20">
    <div
      class="prt-header__inner flex flex-wrap justify-center md:justify-between relative"
    >
      <div
        class="border border-white h-12 mb-2 md:mb-0 md:h-auto w-32 text-white flex flex-col justify-center"
      >
        LOGO
      </div>
      <div
        class="prt-login-toolbar sm:hidden flex-col justify-start flex absolute right-0"
      >
        <PrtButton> <PrtIcon icon="user" size="15px" color="white"/></PrtButton>
      </div>

      <div
        class="flex w-full md:w-3/4 lg:w-2/3 xxl:w-1/2 justify-center md:justify-end"
      >
        <PrtFilterToolbar class="w-full sm:w-3/4" />
        <PrtLoginToolbar />
      </div>
    </div>
  </header>
</template>
