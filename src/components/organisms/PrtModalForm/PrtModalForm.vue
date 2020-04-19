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
      <component :is="currentModalForm" v-bind="currentProperties"></component>
    </PrtModal>
  </div>
</template>
