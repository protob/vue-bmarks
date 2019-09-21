<template>
  <div class="form-factory">
    <div v-if="success" class="form-factory-success">Success!</div>
    <template v-else>
      <FormGroup v-for="(field, index) in fieldsWithDefaults" :key="field.name">
        <Component
          :is="field.component"
          :id="`${_uid}-${field.name}`"
          :key="index"
          v-model="data[field.name]"
          :name="`${_uid}-${field.name}`"
          v-bind="{ ...field.options.props, ...field.options.attrs }"
          @input="$v.data[field.name].$touch()"
        />

        <FormInlineMessage v-if="$v.data[field.name].$error"
          >Please fill in this field correctly.</FormInlineMessage
        >
      </FormGroup>
      <div class="flex items-center justify-between">
        <btn class="text-lg" @click="submit">
          <span v-if="getModalForm.isEditing">Udpdate</span>
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
const slugify = require("slugify");
const uuidv4 = require("uuid/v4");
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
      isBookmark: false,
      isEditing: false,
      data: {
        uuid: "",
        name: "",
        url: "",
        desc: "",
        tags: ""
      },
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
      this.success = false; // It is required to reset form input data
      this.setData();
    });
  },

  methods: {
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

      this.isBookmark = this.getModalForm.isBookmark;
      this.data.catUuid = this.getModalForm.catUuid;
      if (this.getModalForm.isEditing) {
        this.data.uuid = this.getModalForm.taxUuid; // tax uid is itemuid
        this.data.name = this.getModalForm.taxName;

        //------

        this.data.slug = this.getModalForm.slug;
        this.data.url = this.getModalForm.url;
        this.data.tags = this.getModalForm.tags
          ? this.getModalForm.tags.map(item => item.name)
          : "";
        this.data.desc = this.getModalForm.desc;
      }
      this.$forceUpdate();
    },
    closeModal() {
      this.$root.$emit("closeModal", { target: this.formid });
      this.$store.dispatch("setModalFormData", {});
      this.resetData();
      this.success = true;
    },

    submit() {
      this.$v.$touch();
      if (this.$v.$error) return;

      const data = this.isBookmark
        ? {
            uuid: this.isEditing ? this.data.uuid : uuidv4(),
            name: this.data.name,
            slug: slugify(this.data.name),
            url: this.data.url,
            desc: this.data.desc,
            catUuid: this.data.catUuid
          }
        : { uuid: this.data.uuid, name: this.data.name };

      this.$root.$emit("sendData", {
        json: data,
        formid: this.formid,
        isEditing: this.isEditing
      });
      this.resetData();
      this.success = true;
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
