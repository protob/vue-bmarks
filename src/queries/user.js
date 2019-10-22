import gql from "graphql-tag";
const ADD_USER = gql`
  mutation AddUser(
    $uuid: uuid!
    $username: String!
    $email: String!
    $id: String!
    $userId: String!
    $name: String!
    $slug: String!
  ) {
    insert_users(
      objects: {
        uuid: $uuid
        username: $username
        email: $email
        id: $id
        userId: $userId
        name: $name
        slug: $slug
      }
      on_conflict: { constraint: users_pkey, update_columns: username }
    ) {
      returning {
        uuid
      }
    }
  }
`;

const GET_USER_BY_ID = gql`
  query getUserById($userId: String!) {
    users(where: { userId: { _eq: $userId } }) {
      name
      uuid
    }
  }
`;

export { ADD_USER, GET_USER_BY_ID };
