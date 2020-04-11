<script src="./PrtModalConfirm.js"></script>
<template>
  <div class="prt-modal-confirm">
    <PrtModal
      :visible="isModalVisible"
      :title="title"
      :overlay="true"
      :cross="true"
      :persistent="false"
      :ariaLabelClose="'Close'"
      @close="isModalVisible = false"
    >
      <div class="mb-6">
        <h1>
          Delete {{ itemData.taxName }}
          <span v-if="itemData.target == 'cat'">and its links.</span>
          <span v-else-if="itemData.target == 'tag'"
            >and remove it from links</span
          >
          <br />Are you sure?
        </h1>
      </div>

      <div class="flex items-center justify-between">
        <PrtButton :type="'small'" @click="deleteItem">Ok</PrtButton>
        <PrtButton :type="'small'" @click="toggleModal">Cancel</PrtButton>
      </div>
    </PrtModal>
  </div>
</template>
<style lang="scss"></style>
