import gql from "graphql-tag";

// used in update service
const GET_TAGS_BY_USERID = gql`
  query getTagsBySLug($userId: String!, $objects: [String!]!) {
    tags(
      where: { _and: { userId: { _eq: $userId }, slug: { _in: $objects } } }
    ) {
      name
      slug
      userUuid
      userId
      uuid
    }
  }
`;

//TAXONOMY

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

// LISTING COLLECTION

const GET_ALL_BOOKMARKS_BY_CAT = gql`
  query getAllBookmarksByCat {
    cats {
      name
      uuid
      bookmarks_cats {
        bookmark {
          uuid
          name
          slug
          desc
          updated_at
          url
          user {
            uuid
          }
          bookmarks_tags {
            tag {
              uuid
              name
              slug
            }
          }
        }
      }
    }
  }
`;
// used in delete service
const GET_BOOKMARKS_BY_CAT = gql`
  query getBookmarksByCat($uuid: uuid!) {
    cats(where: { uuid: { _eq: $uuid } }) {
      name
      uuid
      bookmarks {
        name
        uuid
        userUuid
        url
        desc
        updated_at
        slug
        bookmarks_tags {
          tag {
            uuid
            name
            slug
            uuid
          }
        }
      }
    }
  }
`;

const GET_BOOKMARKS_BY_TAG = gql`
  query getBookmarksByTag($uuid: uuid!) {
    tags(where: { uuid: { _eq: $uuid } }) {
      name
      slug
      uuid
      bookmarks_tags {
        bookmark {
          desc
          uuid
          name
          slug
          url
          desc
          updated_at
          uuid
          bookmarks_tags {
            tag {
              updated_at
              slug
              name
              uuid
            }
          }
        }
      }
    }
  }
`;

const GET_BOOKMARKS_BY_PHRASE = gql`
  query getBookmarksByPhrase($phrase: String!) {
    bookmarks(
      where: {
        _or: [
          { name: { _ilike: $phrase } }
          { desc: { _ilike: $phrase } }
          { url: { _like: $phrase } }
        ]
      }
    ) {
      uuid
      name
      slug
      updated_at
      url
      desc
      user {
        uuid
      }
      bookmarks_tags {
        tag {
          uuid
          name
          slug
        }
      }
    }
  }
`;

export {
  GET_TAGS_BY_USERID,
  GET_TAGS,
  GET_CATS,
  GET_ALL_BOOKMARKS_BY_CAT,
  GET_BOOKMARKS_BY_CAT,
  GET_BOOKMARKS_BY_TAG,
  GET_BOOKMARKS_BY_PHRASE
};
