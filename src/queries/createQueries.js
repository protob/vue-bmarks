import gql from "graphql-tag";

const ADD_CAT = gql`
  mutation AddCat(
    $name: String!
    $slug: String!
    $userUuid: uuid!
    $userId: String!
    $uuid: uuid!
  ) {
    insert_cats(
      objects: [
        {
          uuid: $uuid
          name: $name
          slug: $slug
          userUuid: $userUuid
          userId: $userId
        }
      ]
      on_conflict: { constraint: cats_pkey, update_columns: [name, slug] }
    ) {
      returning {
        uuid
      }
    }
  }
`;

const ADD_TAG = gql`
  mutation AddTag(
    $name: String!
    $slug: String!
    $userId: String!
    $userUuid: uuid!
    $uuid: uuid!
  ) {
    insert_tags(
      objects: [
        {
          uuid: $uuid
          name: $name
          slug: $slug
          userUuid: $userUuid
          userId: $userId
        }
      ]
      on_conflict: { constraint: tags_pkey, update_columns: [name, slug] }
    ) {
      returning {
        uuid
      }
    }
  }
`;
const ADD_TAGS = gql`
  mutation upsertTags($objects: [tags_insert_input!]!) {
    insert_tags(
      objects: $objects
      on_conflict: { constraint: tags_pkey, update_columns: updated_at }
    ) {
      affected_rows
      returning {
        uuid
        name
      }
    }
  }
`;

const ADD_BOOKMARK = gql`
  mutation AddBookmarkWithTags(
    $bookmarkUuid: uuid!
    $userUuid: uuid!
    $userId: String!
    $name: String!
    $slug: String!
    $url: String!
    $desc: String!
    $catUuid: uuid!
    $tags: [bookmarks_tags_insert_input!]!
  ) {
    insert_bookmarks(
      objects: [
        {
          uuid: $bookmarkUuid
          name: $name
          slug: $slug
          url: $url
          desc: $desc
          userUuid: $userUuid
          userId: $userId
          catUuid: $catUuid
        }
      ]
    ) {
      affected_rows
      returning {
        name
        uuid
      }
    }
    insert_bookmarks_cats(
      objects: { bookmarkUuid: $bookmarkUuid, catUuid: $catUuid }
    ) {
      returning {
        bookmarkUuid
        catUuid
      }
    }

    insert_bookmarks_tags(
      objects: $tags
      on_conflict: {
        constraint: bookmarks_tags_pkey
        update_columns: bookmarkUuid
      }
    ) {
      returning {
        bookmarkUuid
        tagUuid
      }
    }
  }
`;

export { ADD_CAT, ADD_TAG, ADD_TAGS, ADD_BOOKMARK };
