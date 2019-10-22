import gql from "graphql-tag";

const GET_TAGS = gql`
  query getTags {
    tags(order_by: { name: asc }) {
      uuid
      name
      slug
    }
  }
`;
const GET_CATS = gql`
  query getCats {
    cats(order_by: { name: asc }) {
      uuid
      name
      slug
    }
  }
`;
export { GET_TAGS, GET_CATS };
