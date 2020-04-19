import { log } from '@/utils'

import gql from 'graphql-tag'
import deleteItem from '@/apollo/queries/delItem.gql'
import deleteCat from '@/apollo/queries/delCats.gql'
import deleteTag from '@/apollo/queries/delTags.gql'
import getItemsByCat from '@/apollo/queries/getItemsByCat.gql'
const DeleteService = {
  prepareDeleteItemsTagsQuery(arr) {
    const queryString = `mutation DeleteTags{delete_items_tags(where: {itemUuid:{_in: 
      ${JSON.stringify(arr)}}}) {affected_rows returning { tagUuid}}}`

    const query = gql`
      ${queryString}
    `

    return query
  },

  async generateItemTagMap(itemData, apollo) {
    const uuid = itemData.taxUuid

    const { data, error } = await apollo.query({
      $loadingKey: 'loading',
      query: getItemsByCat,
      variables: {
        uuid
      }
    })
    if (error) {
      log(error)
      return false
    }

    // currently single cat filter is supported

    let tempItem = {
      name: itemData.name,
      items_cats: data.cats[0].items.map(el => {
        return { item: el }
      })
    }

    let ItemTagMapObj = {}
    tempItem.items_cats.forEach(item => {
      const tags = item.item.items_tags
      if (tags) {
        ItemTagMapObj[item.item.uuid] = tags.map(el => {
          return {
            uuid: el.tag.uuid
          }
        })
      }
    })

    return ItemTagMapObj
  },
  //- CATEGORY
  async deleteCatWithAllItems(itemData, apollo) {
    const ItemTagMapObj = await this.generateItemTagMap(itemData, apollo)

    return this.deleteCatItems(ItemTagMapObj, itemData, apollo)
  },

  async deleteCatTags(itemData, itemsUuids, apollo) {
    const DELETE_BOOKMARKS_TAGS = this.prepareDeleteItemsTagsQuery(itemsUuids)

    // it removes only mapping from item_tags table not tag itself
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: DELETE_BOOKMARKS_TAGS
    })

    log(error ? error : data)
    return error ? error : this.deleteSingleCat(itemData, apollo)
  },

  async deleteCatItems(itemTagsMap, itemData, apollo) {
    const itemsUuids = Object.keys(itemTagsMap)

    return !itemsUuids.length
      ? this.deleteSingleCat(itemData, apollo)
      : this.deleteCatTags(itemData, itemsUuids, apollo)
  },

  async deleteSingleCat(itemData, apollo) {
    const uuid = itemData.taxUuid

    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: deleteCat,
      variables: {
        uuid
      },
      refetchQueries: ['getCats', 'getAllItemsByCat']
    })
    log(error ? error : data)
    return data
  },

  async deleteSingleTag(uuid, apollo) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: deleteTag,
      variables: {
        uuid
      }
    })
    log(error ? error : data)
    return data
  },
  async deleteSingleItem(uuid, apollo) {
    const { data, error } = await apollo.mutate({
      $loadingKey: 'loading',
      mutation: deleteItem,
      variables: {
        uuid
      }
    })
    log(error ? error : data)

    return data
  },

  async deleteItem(itemData, apollo) {
    const uuid = itemData.taxUuid
    // COLLECTION ITEMS / TAXONOMY ITEMS
    return itemData.target === 'item'
      ? await this.deleteSingleItem(uuid, apollo)
      : itemData.target === 'cat'
      ? await this.deleteCatWithAllItems(itemData, apollo)
      : await this.deleteSingleTag(uuid, apollo)
  }
}

export default DeleteService
