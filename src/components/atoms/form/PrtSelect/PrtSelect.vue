<script src="./PrtSelect.js"></script>
<template>
  <div
    class="prt-select"
    :aria-expanded="open ? 'true' : 'false'"
    :aria-owns="'lbox_' + _uid"
    aria-autocomplete="none"
    role="combobox"
    tabindex="0"
    :class="{
      'prt-select--is-active': isActive,
      'prt-select--is-selected': isSelected,
      'prt-select--is-required': required
    }"
    @click="toggle($event)"
    @blur="closeHandler"
    @keyup.space="openHandler"
    @keyup.up="move(-1)"
    @keyup.down="move(1)"
    @keyup.enter="enter($event)"
  >
    <div class="prt-select__inner relative">
      <div class="prt-select__selected prt-select-option" v-html="html"></div>
      <slot name="label">
        <div v-if="label" class="prt-select__label">label: {{ label }}</div>
      </slot>

      <transition name="prt-select">
        <div v-show="open" class="prt-select__dropdown">
          <ul :style="{ maxHeight }" class="prt-select__options">
            <slot />
          </ul>
          <button
            ref="cancel"
            class="prt-select__cancel sf-button--full-width mobile-only"
            @click="closeHandler"
          >
            Cancel
          </button>
        </div>
      </transition>
    </div>
    <div v-if="valid !== undefined" class="prt-select__error-message">
      <transition name="fade">
        <div v-if="!valid">
          <slot name="error-message" v-bind="{ errorMessage }">{{
            errorMessage
          }}</slot>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="scss">
@import '@/assets/scss/helpers';
.prt-select {
  @apply appearance-none  block w-full bg-white text-gray-700 rounded leading-tight;
}
.prt-select__inner {
  box-sizing: border-box;
  // @apply py-3 px-4;
}

.prt-select__selected {
  @apply py-3 px-4;
}
.prt-select--is-active {
  @apply rounded-b-none;

  .prt-select__selected {
    @apply rounded-b-none;
  }
}
.prt-select-option {
  @apply appearance-none  block w-full bg-white text-gray-700 border border-white rounded py-3 px-4 leading-tight;
}
.prt-select-option {
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--is-active {
    background: #2b6cb0;
    color: white;
  }
  @include for-desktop {
    &:hover {
      background: #2b6cb0;
      color: white;
    }
  }
}

.prt-select {
  background: white;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  outline: none;
  cursor: default;
  &__label {
    position: absolute;
    top: 0;
    left: 0;
    color: black;
    transform: translate3d(0, calc(50% * -1), 0);
    transition: top 0.15s linear, font-size 0.15s linear;

    opacity: 0;
  }
  &__selected {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-height: 1.875rem;
    margin: 0;
    border: 1px solid transparent;
    border-width: 0 0 1px 0;
  }
  &__dropdown {
    position: var(--select-dropdown-position, fixed);
    top: var(--select-dropdown-top, auto);
    left: 0;
    bottom: var(--select-dropdown-bottom, 0);
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    background: white;
    box-shadow: 0 8px 11px rgba(0, 0, 0, 0.1);
  }
  &__options {
    // overflow: auto;
    margin: 0;
    padding: 0;
    list-style-type: none;
    &::-webkit-scrollbar {
      width: 0;
    }
  }

  &-enter-active {
    animation: var(--select-animation-enter, ssmobile 150ms);
  }
  &-leave-active {
    animation: var(--select-animation-leave, ssmobile 150ms revers);
  }
  @include for-desktop {
    --select-dropdown-position: absolute;
    --select-dropdown-top: 100%;
    --select-dropdown-bottom: auto;
    --select-animation-enter: ssdesktop 150ms;
    --select-animation-leave: ssdesktop 150ms revers;
  }
}

@keyframes ssdesktop {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes ssmobile {
  0% {
    transform: translate(0, 100%);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
