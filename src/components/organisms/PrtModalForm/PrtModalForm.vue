<script src="./PrtModalForm.js"></script>
<template>
  <div class="prt-modal-form">
    <PrtModal
      :visible="isModalVisible"
      :title="title"
      :overlay="true"
      :cross="true"
      :persistent="false"
      :ariaLabelClose="'Close'"
      @close="isModalVisible = false"
    >
      <component v-bind:is="currentModalForm"></component>
      <!-- <PrtCatForm />
      <PrtTagForm />
      <PrtLoginForm /> -->
    </PrtModal>
  </div>
</template>
<style lang="scss"></style>
