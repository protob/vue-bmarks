const slugify = require("slugify");
const uuidv4 = require("uuid/v4");
import { log } from "@/utils";
import { GET_TAGS_BY_USERID } from "@/queries/readQueries.js";
import {
  UPDATE_BOOKMARK_WITH_TAGS,
  UPDATE_BOOKMARK_AND_IGNORE_TAGS
} from "@/queries/updateQueries.js";
import { ADD_TAGS } from "@/queries/createQueries.js";

const UpdateService = {
  // prepare

  normalizeTags(tags) {
    typeof tags == "object"
      ? (tags = JSON.parse(JSON.stringify(tags)))
      : (tags = tags.trim().split(","));

    return tags.filter(n => n); // remove empty strings
  },
  updateCollectionItem(apollo, obj, userId, userUuid) {
    let tags = !obj.tags ? [] : obj.tags;
    tags = this.normalizeTags(tags);

    const bookmarkObj = {
      bookmarkUuid: obj.uuid,
      userUuid: userUuid,
      userId: userId,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      catUuid: obj.catUuid
    };

    apollo
      .mutate({
        mutation: UPDATE_BOOKMARK_AND_IGNORE_TAGS,
        variables: bookmarkObj,
        refetchQueries: ["getAllBookmarksByCat"]
      })
      .then(data => log(data))
      .catch(error => log(error));

    if (tags.length > 0) {
      const tagsToInsert = tags.map(el => {
        return {
          name: el,
          slug: slugify(el),
          userId: userId,
          userUuid: userUuid
        };
      });

      this.prepareTagsBeforeSend(apollo, userId, tagsToInsert).then(
        updatedData => {
          this.updateTags(apollo, updatedData, bookmarkObj).then(
            updatedBookmarkObj => {
              this.updateCollectionItemWithTags(apollo, updatedBookmarkObj);
            }
          );
        }
      );
    }
  },
  updateTags(apollo, tagsToInsert, bookmarkObj) {
    const output = apollo
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
    return output;
  },

  updateCollectionItemWithTags(apollo, bookmarkObj) {
    apollo
      .mutate({
        mutation: UPDATE_BOOKMARK_WITH_TAGS,
        variables: bookmarkObj,
        refetchQueries: ["getAllBookmarksByCat"]
      })
      .then(data => log(data))
      .catch(error => log(error));
  },

  prepareTagsBeforeSend(apollo, userId, tagsToInsert) {
    const uniqueSlugsItemsArr = tagsToInsert.filter(
      (item, index, self) =>
        index === self.findIndex(elem => elem.slug === item.slug)
    ); // only unique tag slugs

    const slugsArr = uniqueSlugsItemsArr.map(item => item.slug);

    // only existing user tags
    const output = apollo
      .query({
        query: GET_TAGS_BY_USERID,
        variables: {
          userId: userId,
          objects: [...slugsArr]
        },
        fetchPolicy: "no-cache",
        refetchQueries: ["getAllBookmarksByCat", "getTags"]
      })
      .then(result => {
        const data = result.data.tags;
        const dataToSend = uniqueSlugsItemsArr;

        let updatedData = dataToSend;
        if (data.length) {
          //Array of objects intersection
          const res = data.filter(n =>
            dataToSend.some(n2 => n.slug == n2.slug)
          );

          // convert array of Objects into one Object
          const responseObj = Object.assign(
            {},
            ...res.map(item => ({ [item.slug]: item }))
          );

          updatedData = dataToSend.map(item => ({
            ...item,
            uuid: responseObj[item.slug]
              ? responseObj[item.slug].uuid
              : uuidv4()
          }));

          return Promise.resolve(updatedData);
        } else {
          updatedData = dataToSend.map(item => ({
            ...item,
            uuid: uuidv4()
          }));
          return Promise.resolve(updatedData);
        }
      });
    return output;
  }
};

export default UpdateService;
