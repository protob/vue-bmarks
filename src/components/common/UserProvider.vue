<script>
const users = [
  { id: 1, name: "Jane Doe", description: "Nice person" },
  { id: 2, name: "John Doe", description: "Nice person" },
  { formid: "catForm", id: 3, name: "John Doe", description: "Nice person" },
  { formid: "tagForm", id: 4, name: "John Doe", description: "Nice person" },
  {
    formid: "bookmarkForm",
    id: 5,
    name: "John Doe",
    description: "Nice person"
  }
];

export default {
  name: "UserProvider",
  provide: {
    providedUuid: () => "iddd",
    providedName: () => "namae",
    fetch: formid => Promise.resolve(users.find(x => x.id === formid)),
    post: user => users.push(user) && Promise.resolve({ success: true })
  },
  render() {
    return this.$slots.default;
  }
};
</script>
