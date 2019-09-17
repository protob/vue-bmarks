import { required } from "vuelidate/lib/validators";

import UserProvider from "@/components/common/UserProvider.vue";

import FormInput from "@/components/common/FormInput.vue";
import FormTextarea from "@/components/common/FormTextarea.vue";

export default class FormDirector {
  constructor(builder) {
    this.builder = builder;
  }

  makeUserForm() {
    return this.builder
      .withProvider(UserProvider)
      .addField({
        component: FormInput,
        label: "Name",
        name: "name",
        options: {
          attrs: {
            placeholder: "Your name"
          }
        },
        validation: {
          required
        }
      })
      .addField({
        component: FormTextarea,
        label: "Description",
        name: "description",
        options: {
          attrs: {
            placeholder: "About you"
          }
        }
      })
      .build();
  }
  makeCatForm() {
    return this.builder
      .withProvider(UserProvider)
      .addField({
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
      })
      .addField({
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
      })

      .addField({
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
      })

      .addField({
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
      })

      .build();
  }
  makeTagForm() {
    return this.builder
      .withProvider(UserProvider)
      .addField({
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
      })
      .addField({
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
      })

      .addField({
        component: FormInput,
        label: "tagId",
        name: "tagId",
        options: {
          attrs: {
            placeholder: "tagId"
          }
        },
        validation: {
          required
        }
      })

      .addField({
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
      })

      .build();
  }

  makeBookmarkForm() {
    return this.builder
      .withProvider(UserProvider)
      .addField({
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
      })
      .addField({
        component: FormInput,
        label: "url",
        name: "url",
        options: {
          attrs: {
            placeholder: "url"
          }
        },
        validation: {
          required
        }
      })

      .addField({
        component: FormTextarea,
        label: "desc",
        name: "desc",
        options: {
          attrs: {
            placeholder: "desc"
          }
        },
        validation: {
          required
        }
      })

      .addField({
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
      })
      .addField({
        component: FormInput,
        label: "tags",
        name: "tags",
        options: {
          attrs: {
            placeholder: "tags"
          }
        },
        validation: {
          required
        }
      })
      .build();
  }
}
