import { required } from "vuelidate/lib/validators";

import UserProvider from "@/components/common/UserProvider.vue";
import CatProvider from "@/components/common/CatProvider.vue";
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
      .withProvider(CatProvider)
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
        label: "uuid",
        name: "uuid",
        options: {
          attrs: {
            placeholder: "uuid"
          }
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
        label: "uuid",
        name: "uuid",
        options: {
          attrs: {
            placeholder: "uuid"
          }
        }
      })

      .build();
  }

  makeLoginForm() {
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
        label: "Email",
        name: "email",
        options: {
          attrs: {
            placeholder: "email"
          }
        },
        validation: {
          required
        }
      })
      .addField({
        component: FormInput,
        label: "Password",
        name: "password",
        options: {
          attrs: {
            placeholder: "password"
          }
        },
        validation: {
          required
        }
      })
      .build();
  }

  makeRegisterForm() {
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
        label: "Email",
        name: "email",
        options: {
          attrs: {
            placeholder: "email"
          }
        },
        validation: {
          required
        }
      })
      .addField({
        component: FormInput,
        label: "Password",
        name: "password",
        options: {
          attrs: {
            placeholder: "password"
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
        label: "catUuid",
        name: "catUuid",
        options: {
          attrs: {
            placeholder: "catUuid"
          }
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
        }
      })
      .build();
  }
}
