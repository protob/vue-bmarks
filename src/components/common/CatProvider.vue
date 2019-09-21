<script>
const users = [
  { id: 1, name: "Jane Doe", description: "Nice person" },
  { id: 2, name: "John Doe", description: "Nice person" }
];

const cats = [
  {
    name: "vue",
    slug: "vue",
    userUuid: "723881c9-a6fa-447d-9553-cac37936989b",
    uuid: "972dd38a-4bf6-42b6-b320-b26e6a44a7dc"
  },
  {
    name: "js",
    slug: "js",
    userUuid: "723881c9-a6fa-447d-9553-cac37936989b",
    uuid: "32f10cba-fdb6-4401-91da-3bf3b8016de8"
  },
  {
    name: "react",
    slug: "react",
    userUuid: "723881c9-a6fa-447d-9553-cac37936989b",
    uuid: "1c7f56ab-7b50-4560-85fd-63cd97095535"
  },
  {
    name: "ecommerce",
    slug: "ecommerce",
    userUuid: "723881c9-a6fa-447d-9553-cac37936989b",
    uuid: "a996917b-a5d7-46b2-876d-a6937fc4bc8d"
  },
  {
    name: "typography",
    slug: "typography",
    userUuid: "f5a92e3c-5b1b-449b-a463-8edb193a4c99",
    uuid: "33c5c2f3-668c-4b87-89c1-454628a0eefd"
  },
  {
    name: "design",
    slug: "design",
    userUuid: "f5a92e3c-5b1b-449b-a463-8edb193a4c99",
    uuid: "0ff6228a-ec86-430f-9f3f-fd7f7e179f33"
  },
  {
    name: "tester",
    slug: "tester",
    userUuid: "723881c9-a6fa-447d-9553-cac37936989b",
    uuid: "ea9a3c60-afac-49c4-b85c-2e0e572a5f7d"
  },
  {
    name: "testTag",
    slug: "testTag",
    userUuid: "723881c9-a6fa-447d-9553-cac37936989b",
    uuid: "572a4d5d-22da-4bb5-a96d-348392227c35"
  },
  {
    name: "kategoriaa",
    slug: "kategoriaa",
    userUuid: "723881c9-a6fa-447d-9553-cac37936989b",
    uuid: "3d466ed7-8d5c-4f35-9cb8-a4c230e60c23"
  }
];

let catData = {
  uuid: "1",
  name: "name2"
};
import { mapGetters } from "vuex";

export default {
  name: "CatProvider",
  data() {
    return {
      // uuid: "1",
      // name: "name2"
    };
  },
  computed: {
    ...mapGetters(["getCurrentUserUuid", "getModalForm"])
  },

  provide: {
    providedUuid: () => {
      return catData.uuid;
    },
    providedName: () => {
      return catData.name;
    },
    fetch: uuid => Promise.resolve(cats.find(x => x.uuid === uuid)),
    post: user => users.push(user) && Promise.resolve({ success: true })
  },
  updated() {
    // catData.uuid = this.getModalForm.taxUuid;
    // catData.name = this.getModalForm.taxName;
  },
  render() {
    return this.$slots.default;
  }
};
</script>
