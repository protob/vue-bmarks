<script src="./PrtModal.js"></script>
<template>
  <section class="prt-modal" :class="[staticClass, className]">
    <PrtOverlay
      v-if="overlay"
      class="prt-modal__overlay"
      :transition="transitionOverlay"
      :visible="visible"
      @click="checkPersistence"
    >
    </PrtOverlay>
    <transition :name="transitionModal">
      <div v-if="visible" class="prt-modal__container">
        <!--@slot -  place content inside the modal bar.-->
        <slot name="modal-bar-desktop desktop-only">
          <PrtBar
            v-show="showDesktopBar"
            class="prt-modal__bar "
            :close="true"
            :title="title"
            @click:close="close"
          />
        </slot>

        <!--@slot -  place content inside the modal bar.-->
        <slot name="modal-bar">
          <PrtBar
            class="prt-modal__bar mobile-only"
            :close="true"
            :title="title"
            @click:close="close"
          />
        </slot>
        <button
          v-if="cross"
          class="prt-modal__close desktop-only"
          :aria-label="ariaLabelClose"
          @click="close"
        >
          <!--@slot -  place content inside the close button.-->
          <slot name="close">
            <PrtIcon icon="cross" size="15px" color="white" />
          </slot>
        </button>
        <div ref="content" class="prt-modal__content">
          <!--@slot - content inside the modal.-->
          <slot />
        </div>
      </div>
    </transition>
  </section>
</template>

<style lang="scss">
@import '@/assets/scss/helpers';
.prt-modal {
  &__container {
    overflow-y: auto;
    box-sizing: border-box;
    position: fixed;
    display: flex;
    z-index: 112;
    top: var(--modal-container-top, 0);
    bottom: var(--modal-container-bottom, 0);
    left: var(--modal-container-left, 50%);
    transform: var(--modal-container-transform, translate(-50%, 0));

    flex-direction: column;
    align-content: space-between;
    max-width: 100%;
    max-height: 100%;
    width: 430px;

    // height: var(--modal-height);

    border: none;
    background-color: white;
    &::-webkit-scrollbar {
      --modal-width: 0;
    }
  }
  &__content {
    padding: var(--modal-content-padding, 2.5em 5em);
  }
  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    border: none;
    background: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  @include for-desktop {
    --modal-container-top: 50%;
    --modal-container-bottom: none;
    --modal-container-transform: translate(-50%, -50%);
    --modal-container-height: auto;
    --modal-content-padding: 2.5em 5em;
  }
}
</style>
