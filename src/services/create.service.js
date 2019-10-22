const slugify = require("slugify");
const uuidv4 = require("uuid/v4");

import { log } from "@/utils";
import {
  ADD_CAT,
  ADD_TAG,
  ADD_TAGS,
  ADD_BOOKMARK
} from "@/queries/createQueries.js";

const CreateService = {
  // ADD

  addTaxonomyItem(apollo, obj, target, userUuid, userId) {
    const MUTATION = target == "cat" ? ADD_CAT : ADD_TAG;
    const query = target == "cat" ? "getCats" : "getTags";
    const name = obj.name;
    const slug = slugify(name);
    const uuid = obj.uuid ? obj.uuid.trim() : uuidv4();

    const data = {
      uuid,
      name,
      slug,
      userUuid,
      userId
    };

    apollo
      .mutate({
        mutation: MUTATION,
        variables: data,
        refetchQueries: [query]
      })
      .then(data => log(data))
      .catch(error => log(error));
  },
  normalizeTags(tags) {
    if (typeof tags == "object") {
      tags = JSON.parse(JSON.stringify(tags));
    } else {
      tags = tags.trim().split(",");
    }
    return tags.filter(n => n); // remove empty strings
  },
  addCollectionItemAndMaybeTags(apollo, obj, userId, userUuid) {
    let tags = !obj.tags ? [] : obj.tags;
    tags = this.normalizeTags(tags);

    const bookmarkObj = {
      bookmarkUuid: uuidv4(),
      userUuid: userUuid,
      userId: userId,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      catUuid: obj.catUuid,
      tags: tags
    };

    if (tags.length > 0) {
      // preparetags
      const tagsToInsert = bookmarkObj.tags.map(el => {
        return {
          name: el,
          slug: slugify(el),
          userId: userId,
          userUuid: userUuid
        };
      });

      this.insertTags(apollo, tagsToInsert, bookmarkObj).then(
        updatedBookmarkObj => {
          this.insertCollectionItem(apollo, updatedBookmarkObj);
        }
      );
    } else {
      this.insertCollectionItem(apollo, bookmarkObj);
    }
  },
  // INSERT

  insertTags(apollo, tagsToInsert, bookmarkObj) {
    const obj = apollo
      .mutate({
        mutation: ADD_TAGS,
        variables: {
          objects: tagsToInsert
        },
        refetchQueries: ["getAllBookmarksByCat", "getTags"]
      })

      .then(resp => {
        const respArr = resp.data.insert_tags.returning;
        const tagsBookmarksMap = respArr.map(item => {
          return {
            bookmarkUuid: bookmarkObj.bookmarkUuid,
            tagUuid: item.uuid
          };
        });

        bookmarkObj.tags = tagsBookmarksMap;

        return Promise.resolve(bookmarkObj);
      })
      .catch(error => log(error));
    return obj;
  },

  insertCollectionItem(apollo, bookmarkObj) {
    apollo
      .mutate({
        mutation: ADD_BOOKMARK,
        variables: bookmarkObj,
        refetchQueries: ["getAllBookmarksByCat"]
      })
      .then(data => log(data))
      .catch(error => log(error));
  }
};

export default CreateService;
