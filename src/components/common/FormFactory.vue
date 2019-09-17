<template>
  <div class="form-factory">
    <div v-if="success" class="form-factory-success">Success!</div>
    <template v-else>
      <FormGroup v-for="field in fieldsWithDefaults">
        <Component
          :is="field.component"
          :id="`${_uid}-${field.name}`"
          v-model="data[field.name]"
          v-bind="{ ...field.options.props, ...field.options.attrs }"
          @input="$v.data[field.name].$touch()"
        />

        <FormInlineMessage v-if="$v.data[field.name].$error"
          >Please fill in this field correctly.</FormInlineMessage
        >
      </FormGroup>
      <div class="flex items-center justify-between">
        <btn class="text-lg" @click="submit">
          <span v-if="isEditing">Udpdate</span>
          <span v-else>Add</span>
        </btn>
        <btn class="text-lg" @click="closeModal">Cancel</btn>
      </div>
    </template>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import btn from "@/components/atoms/btn.vue";
import FormGroup from "./FormGroup.vue";
import FormInlineMessage from "./FormInlineMessage.vue";

const defaultField = {
  component: null,
  label: "",
  name: "",
  options: {},
  validation: {}
};

export default {
  name: "FormFactory",
  components: {
    FormGroup,
    FormInlineMessage,
    btn
  },
  mixins: [validationMixin],
  // Injecting dependencies makes it
  // possible or reuse this component
  // for all kinds of content types.
  inject: ["fetch", "post"],
  props: {
    fields: {
      default: () => [],
      type: Array
    },
    formid: {
      default: null,
      type: [Number, String]
    }
  },
  data() {
    return {
      isEditing: false,
      data: {},
      success: false
    };
  },
  computed: {
    // Apply default field configuration
    // to make sure all properties we rely
    // on in the template do exist.
    fieldsWithDefaults() {
      return this.fields.map(x => ({ ...defaultField, ...x }));
    }
  },
  async created() {
    // if (this.formid) {
    //   this.data = await this.fetch(this.formid);
    // }
    // it causes the bug
  },
  methods: {
    closeModal() {
      const eventName =
        this.formid == "catForm"
          ? "closeCatModal"
          : this.formid == "tagForm"
          ? "closeTagModal"
          : "closeBookmarkModal";

      this.$root.$emit(eventName);
    },

    async submit() {
      this.$v.$touch();
      if (this.$v.$error) return;

      const { success } = await this.post(this.data);
      const data = JSON.parse(JSON.stringify(this.data));

      // triple ternary
      const eventName =
        this.formid == "catForm"
          ? "sendCatData"
          : this.formid == "tagForm"
          ? "sendTagData"
          : "sendBookmarkData";

      this.$root.$emit(eventName, data);

      this.success = false;
    }
  },
  // The vuelidate validation configuration is
  // automatically generated for us.
  validations() {
    const data = this.fieldsWithDefaults
      .filter(x => x.validation)
      .reduce(
        (prev, field) => ({
          ...prev,
          [field.name]: field.validation
        }),
        {}
      );
    return { data };
  }
};
</script>

<style>
.form-factory > :not(:first-child) {
  margin-top: 1em;
}

.form-factory-success {
  color: green;
}
</style>
