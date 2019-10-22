const slugify = require("slugify");
const uuidv4 = require("uuid/v4");
import { log } from "@/utils";
import {
  ADD_TAGS,
  ADD_BOOKMARK_DEEP,
  GET_TAGS_BY_USERID,
  UPDATE_BOOKMARK_SHALLOW
} from "@/queries/modalFrom.js";

const UpdateService = {
  // prepare

  prepareTagsBeforeSend(itemsObj, bookmarkObj) {
    const userId = this.getCurrentUserId;
    const itemsObj2 = itemsObj.filter(
      (item, index, self) =>
        index === self.findIndex(elem => elem.slug === item.slug)
    ); // only unique tag slugs

    const slugsArr = itemsObj2.map(item => item.slug);

    this.$apollo
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

        const dataToSend = itemsObj2;

        let updatedData = dataToSend;
        if (data.length) {
          const res = data.filter(n =>
            dataToSend.some(n2 => n.slug == n2.slug)
          );
          const responseObj = Object.assign(
            {},
            ...res.map(item => ({ [item.slug]: item }))
          );

          updatedData = dataToSend.map(item => ({
            ...item,
            // uuid: responseObj[item.slug].uuid

            uuid: responseObj[item.slug]
              ? responseObj[item.slug].uuid
              : uuidv4()
          }));
        } else {
          updatedData = dataToSend.map(item => ({
            ...item,
            uuid: uuidv4()
          }));
        }

        this.updateTags(updatedData, bookmarkObj);
      });
  },

  //UPDATE
  updateItemDeep(bookmarkObj) {
    this.$apollo
      .mutate({
        mutation: ADD_BOOKMARK_DEEP,
        variables: bookmarkObj,
        refetchQueries: ["getAllBookmarksByCat"]
      })
      .then(data => log(data))
      .catch(error => log(error));
  },

  updateCollectionItem(obj) {
    let tags = !obj.tags ? [] : obj.tags;
    if (typeof obj.tags == "object") {
      tags = JSON.parse(JSON.stringify(obj.tags));
    } else {
      tags = obj.tags.trim().split(",");
    }

    const userId = this.getCurrentUserId;

    const bookmarkObj = {
      bookmarkUuid: obj.uuid,
      userUuid: this.getCurrentUserUuid,
      userId: userId,
      url: obj.url,
      slug: slugify(obj.name),
      name: obj.name,
      desc: obj.desc,
      catUuid: obj.catUuid
      // tags: tags .filter(n => n) // remove empty strings
    };

    this.$apollo
      .mutate({
        mutation: UPDATE_BOOKMARK_SHALLOW,
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
          userId: this.userId,
          userUuid: this.getCurrentUserUuid
        };
      });

      this.updateTagsStep1(tagsToInsert, bookmarkObj);
    }
    this.toggleModal(bookmarkObj);
  },

  updateTagsStep1(tagsToInsert, bookmarkObj) {
    // prevent duplicates

    this.prepareTagsBeforeSend(tagsToInsert, bookmarkObj);
  },

  updateTags(tagsToInsert, bookmarkObj) {
    this.$apollo
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

        this.updateItemDeep(bookmarkObj);
      })
      .catch(error => log(error));
  }
};

export default UpdateService;
