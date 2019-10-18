import gql from "graphql-tag";

export const TEST_QUERY = gql`
  query {
    test(order_by: { id: asc }) {
      id
    }
  }
`;

export const TEST_QUERY2 = gql`
  query {
    test(order_by: { id: asc }) {
      id
    }
  }
`;
