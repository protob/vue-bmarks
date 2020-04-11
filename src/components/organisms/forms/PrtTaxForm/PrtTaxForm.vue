<script src="./PrtTaxForm.js"></script>

<template>
  <div class="prt-tax-form">
    <PrtForm>
      <ValidationObserver ref="obs">
        <SchemaForm v-model="formData" :schema="schema">
          <!-- login/register -->
        </SchemaForm>

        <div class="prt-form__buttons flex justify-between">
          <PrtButton class="w-full sm:w-1/4" @click.prevent="submitForm">
            {{ submitLabel }}
          </PrtButton>

          <PrtButton
            class="w-full sm:w-1/4"
            @click.prevent="$parent.$emit('close')"
          >
            Cancel
          </PrtButton>
        </div>
      </ValidationObserver>
    </PrtForm>
  </div>
</template>
<style lang="scss"></style>
