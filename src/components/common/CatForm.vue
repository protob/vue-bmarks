<template>
  <UserProvider>
    <FormFactory :fields="fields" :id="id" />
  </UserProvider>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import FormFactory from "./FormFactory.vue";
import FormInput from "./FormInput.vue";
import FormTextarea from "./FormTextarea.vue";
import UserProvider from "./UserProvider.vue";

export default {
  name: "UserForm",
  components: {
    FormFactory,
    FormInput,
    FormTextarea,
    UserProvider
  },
  props: {
    // Passing an ID as a property makes
    // the form load an existing user and
    // switches the form into editing mode.
    id: {
      default: null,
      type: [Number, String]
    }
  },
  created() {
    this.fields = [
      {
        component: FormInput,
        label: "Name",
        name: "name",
        options: {
          attrs: {
            placeholder: "Name"
          }
        },
        validation: {
          required
        }
      },

      {
        component: FormInput,
        label: "id",
        name: "id",
        options: {
          attrs: {
            placeholder: "id"
          }
        },
        validation: {
          required
        }
      },

      {
        component: FormInput,
        label: "catId",
        name: "catId",
        options: {
          attrs: {
            placeholder: "catId"
          }
        },
        validation: {
          required
        }
      },

      {
        component: FormInput,
        label: "bmarksIds",
        name: "bmarksIds",
        options: {
          attrs: {
            placeholder: "bmarksIds"
          }
        },
        validation: {
          required
        }
      }
    ];
  }
};
</script>
