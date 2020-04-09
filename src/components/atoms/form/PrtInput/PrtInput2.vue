<script src="./PrtInput.js"></script>

<template>
  <div
    class="prt-input"
    :class="{
      'prt-input--has-text': !!value,
      'prt-input--invalid': valid === false
    }"
  >
    <div class="prt-input__wrapper">
      <input
        class="prt-input__field"
        :id="name"
        v-bind="$attrs"
        :value="value"
        :required="required"
        :disabled="disabled"
        :name="name"
        :class="{ 'prt-input--is-password': isPassword }"
        :type="inputType"
        :aria-label="ariaLabel"
        v-on="listeners"
      />
      <span class="prt-input__bar"></span>
      <label class="prt-input__label" :for="name">
        <slot name="label" v-bind="{ label }">{{ label }}</slot>
      </label>
      <slot
        v-if="isPassword"
        v-bind="{
          isPasswordVisible,
          switchVisibilityPassword
        }"
        name="show-password"
      >
      </slot>
    </div>
    <div v-if="valid !== undefined" class="prt-input__error-message">
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
// focus:outline-none focus:bg-white focus:border-gray-500

.prt-input {
  //border border-white
  @apply appearance-none  block w-full bg-white text-gray-700  rounded py-3 leading-tight;

  &__field {
    @apply px-4 w-full;
  }
}
</style>

<style lang="scss">
@import '@/assets/scss/helpers';
.prt-input {
  position: relative;
  box-sizing: border-box;
  width: var(--input-width);
  height: var(--input-height);
  color: var(--input-color, var(--c-text));
  &__label {
    position: absolute;
    top: var(--input-label-top, 50%);
    color: var(--input-label-color, inherit);
    font: var(
      --input-label-font,
      font(
        --input-label,
        400,
        var(--font-size-big),
        normal,
        var(--body-font-family-secondary)
      )
    );
    transform: var(
      --input-label-transform,
      translate3d(0, calc(var(--input-label-top, 50%) * -1), 0)
    );
    transition: var(
      --input-label-transition,
      top 150ms linear,
      font-size 150ms linear
    );
    &::after {
      content: var(--input-label-required);
      color: var(--input-label-color, var(--c-primary));
    }
  }
  &__bar {
    position: relative;
    display: block;
    &::before,
    &::after {
      position: absolute;
      bottom: 0;
      width: var(--input-bar-width, 0);
      height: 1px;
      background: var(--input-bar-background, var(--c-primary));
      transition: width 150ms linear;
      content: '';
    }
    &::before {
      left: 50%;
    }
    &::after {
      right: 50%;
    }
  }
  &__password-button {
    --button-padding: 0;
    --button-background: transparent;
    position: absolute;
    top: 50%;
    right: var(--spacer-big);
    transform: translate3d(0, -50%, 0);
    &:hover {
      --button-background: transparent;
    }
  }
  &__password-icon {
    --icon-width: var(--input-password-icon-width, 1.375rem);
    --icon-height: 0.8125rem;
    --icon-color: var(--c-dark-variant);
    position: relative;
    &--hidden {
      --icon-color: var(--c-gray-variant);
      --input-password-icon-scaleX: 1;
    }
    &::after {
      position: absolute;
      top: 50%;
      width: 100%;
      height: 1px;
      background: var(--c-gray-variant);
      transform: translate3d(0, -50%, 0) rotate(45deg)
        scaleX(var(--input-password-icon-scaleX, 0));
      transition: transform 150ms linear;
      content: '';
    }
  }
  &__error-message {
    color: var(--input-error-message-color, var(--c-danger));
    font: var(
      --input-error-message-font,
      font(
        --input-error-message,
        400,
        var(--font-size-small),
        1.6,
        var(--body-font-family-secondary)
      )
    );
  }
  &__wrapper,
  input {
    width: 100%;
    height: 100%;
  }
  &__wrapper {
    position: relative;
    margin: var(--input-margin, 0 0 var(--spacer-small) 0);
  }
  input {
    display: block;
    box-sizing: border-box;
    padding: var(--input-padding, 0.9375rem 0 0.625rem 0);
    border: var(--input-border, 1px solid var(--c-light));
    border-width: var(--input-border-width, 0 0 1px 0);
    background: var(--input-background);
    color: inherit;
    font: var(
      --input-font,
      font(
        --input,
        300,
        var(--font-size-big),
        normal,
        var(--body-font-family-primary)
      )
    );
    outline: none;
    &:focus {
      & ~ * {
        --input-label-top: 0;
        --input-label-color: var(--c-primary);
        --input-label-font-size: var(--font-size-extra-small);
        --input-bar-width: 50%;
      }
    }
    &:required {
      & ~ * {
        --input-label-required: ' *';
      }
    }
    &:disabled {
      & ~ * {
        --input-color: var(--c-text-muted);
        --input-label-color: var(--c-text-muted);
      }
    }
    &[type='number'] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    &[type='password'] {
      --input-padding: 0.9375rem
        calc(var(--spacer-big) * 2 + var(--input-password-icon-width, 1.375rem))
        10px 0;
    }
  }
  &--has-text {
    --input-label-top: 0;
    --input-label-font-size: var(--font-size-extra-small);
  }
}
</style>
