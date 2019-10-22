import gql from "graphql-tag";

const UPDATE_BOOKMARK_WITH_TAGS = gql`
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

      on_conflict: {
        constraint: bookmarks_pkey
        update_columns: [name, url, slug, desc]
      }
    ) {
      affected_rows
      returning {
        name
        uuid
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

// --- upsert bookmark only, without cats and tags

const UPDATE_BOOKMARK_AND_IGNORE_TAGS = gql`
  mutation AddBookmark(
    $bookmarkUuid: uuid!
    $userUuid: uuid!
    $userId: String!
    $name: String!
    $slug: String!
    $url: String!
    $desc: String!
    $catUuid: uuid! # $tags: [bookmarks_tags_insert_input!]!
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
      on_conflict: {
        constraint: bookmarks_pkey
        update_columns: [name, url, slug, desc]
      }
    ) {
      affected_rows
      returning {
        name
        uuid
      }
    }
    insert_bookmarks_cats(
      objects: { bookmarkUuid: $bookmarkUuid, catUuid: $catUuid }
      on_conflict: {
        constraint: bookmarks_cats_pkey
        update_columns: bookmarkUuid
      }
    ) {
      returning {
        bookmarkUuid
        catUuid
      }
    }
  }
`;

export { UPDATE_BOOKMARK_WITH_TAGS, UPDATE_BOOKMARK_AND_IGNORE_TAGS };
