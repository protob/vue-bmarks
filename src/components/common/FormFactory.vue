<template>
  <div class="form-factory">
    <div v-if="success" class="form-factory-success">Success!</div>
    <template v-else>
      <FormGroup v-for="(field, index) in fieldsWithDefaults" :key="field.name">
        dupa {{ data }}
        <Component
          :is="field.component"
          :key="index"
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
import { mapGetters } from "vuex";

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
  // inject: ["fetch", "post", "providedName", "providedUuid"],
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
    ...mapGetters(["getCurrentUserUuid", "getModalForm"]),
    fieldsWithDefaults() {
      return this.fields.map(x => ({ ...defaultField, ...x }));
    }
  },

  created() {
    // first run
    this.setData();

    this.$root.$on("fireModal", () => {
      //next run
      this.$nextTick().then(() => {
        this.resetData();
        this.setData();
      });
      this.resetDataHtml();
    });
  },

  methods: {
    resetDataHtml() {
      //temporary fix -  input name is not in sync with data.name (ater modifing cat name and add new cat)
      const els = document.querySelectorAll(".form-factory input");
      els.forEach(element => {
        element.value = "";
      });
    },
    resetData(forceUpdate = true) {
      Object.keys(this.data).forEach(key => {
        this.data[key] = "";
      });

      if (forceUpdate) {
        this.$forceUpdate();
      }
    },
    setData() {
      this.resetData(false);
      if (this.getModalForm.isEditing) {
        this.data.uuid = this.getModalForm.taxUuid;
        this.data.name = this.getModalForm.taxName;
      }
      this.$forceUpdate();
    },
    closeModal() {
      this.$root.$emit("closeModal", { target: this.formid });
      this.$store.dispatch("setModalFormData", {});
      this.resetData();
    },

    async submit() {
      this.$v.$touch();
      if (this.$v.$error) return;

      // const { success } = await this.post(this.data);
      const data = JSON.parse(JSON.stringify(this.data));
      this.$root.$emit("sendData", { json: data, formid: this.formid });
      this.resetData();

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
