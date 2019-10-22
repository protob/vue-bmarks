import gql from "graphql-tag";

const DELETE_BOOKMARK = gql`
  mutation DeleteBookmarks($uuid: uuid!) {
    delete_bookmarks_cats(where: { bookmarkUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        catUuid
      }
    }
    delete_bookmarks_tags(where: { bookmarkUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        tagUuid
      }
    }
    delete_bookmarks(where: { uuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        uuid
      }
    }
  }
`;

const DELETE_CAT = gql`
  mutation DeleteCats($uuid: uuid!) {
    delete_bookmarks_cats(where: { catUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        catUuid
      }
    }

    delete_bookmarks(where: { catUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        catUuid
      }
    }

    delete_cats(where: { uuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        uuid
      }
    }
  }
`;

const DELETE_TAG = gql`
  mutation DeleteTags($uuid: uuid!) {
    delete_bookmarks_tags(where: { tagUuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        tagUuid
      }
    }

    delete_tags(where: { uuid: { _eq: $uuid } }) {
      affected_rows
      returning {
        uuid
      }
    }
  }
`;

export { DELETE_BOOKMARK, DELETE_CAT, DELETE_TAG };
