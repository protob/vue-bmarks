import { shallowMount, mount } from '@vue/test-utils'
import CreateService from '@/services/creation.service.js'
import { log } from '@/utils'
// import Actions from '../../../src/components/Actions'

//----- temporary tests
describe('creation.service', () => {
  it('normalizeTags', () => {
    const arr = ['tag1', 'tag2', '', '']
    const commaSeparated = 'tag1,tag2'
    const expectedArr = ['tag1', 'tag2']

    expect(CreateService.normalizeTags(arr)).toEqual(
      expect.arrayContaining(expectedArr)
    )
    expect(CreateService.normalizeTags(commaSeparated)).toEqual(
      expect.arrayContaining(expectedArr)
    )
  })

  // mock hasura graphQL responses
  it('adds addTaxonomyItem', () => {
    CreateService.addTaxonomyItem = (apollo, obj, target, userUuid, userId) => {
      const key = target + 's'
      const objKey = `insert_${key}`
      let outputObj = {}
      outputObj[objKey] = {
        returning: [
          { uuid: '6218ac30-c093-4d3c-a46c-7a71d308096e', __typename: key }
        ],
        __typename: `${key}_mutation_response`
      }
      return outputObj
    }

    const output = CreateService.addTaxonomyItem(
      //apollo
      {},
      // data obj
      {
        uuid: '',
        name: 'sampleCat'
      },
      'cat', //tax
      '67df5bc8-7575-4e97-ab44-558c4112c48a', //userUiid
      'auth0|505fd001f15e8fe310bfb69f' //userId
    )
    expect(output.insert_cats['__typename']).toEqual('cats_mutation_response')
  })

  it('insertTagsBeforeCollectionItem', () => {
    CreateService.insertTagsBeforeCollectionItem = (apollo, itemObj) => {
      const outputObj = {
        itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
        userUuid: '7b913740-33b7-422e-a540-236a327b6b75',
        userId: 'auth0|5e8f905fd00e310bfb61f15f',
        url: 'url',
        slug: 'slug',
        name: 'name',
        desc: 'desc',
        catUuid: '6218ac30-c093-4d3c-a46c-7a71d308096e',
        tags: [
          {
            itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
            tagUuid: '8134bec2-d75c-4aaa-b2b8-23c9d8130aaf'
          },
          {
            itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
            tagUuid: 'a3227306-410b-4573-aff6-1c5e74be9c40'
          },
          {
            itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
            tagUuid: '892a8c4c-d9a1-48bd-9dcb-6a8f03b9ce53'
          }
        ]
      }
      return outputObj
    }

    const output = CreateService.insertTagsBeforeCollectionItem(
      //apollo
      {},
      // itemObj
      {
        itemUuid: '6ee99645-f2c3-4b97-aa04-15916138127d',
        userUuid: '7b913740-33b7-422e-a540-236a327b6b75',
        userId: 'auth0|5e8f905fd00e310bfb61f15f',
        url: 'url',
        slug: 'slug',
        name: 'name',
        desc: 'desc',
        catUuid: '6218ac30-c093-4d3c-a46c-7a71d308096e',
        tags: ['tag1', 'tag2', 'tag3']
      }
    )

    expect(output.tags.length).toEqual(3)
  })
  it('addCollectionItemAndMaybeTags', () => {
    CreateService.addCollectionItemAndMaybeTags = (
      apollo,
      obj,
      userId,
      userUuid
    ) => {
      const outputObj = {
        insert_items: {
          affected_rows: 1,
          returning: [
            {
              name: 'sdfsd',
              uuid: '67efeac6-2c00-469c-a688-22dfb645905d',
              __typename: 'items'
            }
          ],
          __typename: 'items_mutation_response'
        },
        insert_items_cats: {
          returning: [
            {
              itemUuid: '67efeac6-2c00-469c-a688-22dfb645905d',
              catUuid: '6218ac30-c093-4d3c-a46c-7a71d308096e',
              __typename: 'items_cats'
            }
          ],
          __typename: 'items_cats_mutation_response'
        },
        insert_items_tags: {
          returning: [
            {
              itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
              tagUuid: '8134bec2-d75c-4aaa-b2b8-23c9d8130aaf',
              __typename: 'items_tags'
            },
            {
              itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
              tagUuid: 'a3227306-410b-4573-aff6-1c5e74be9c40',
              __typename: 'items_tags'
            },
            {
              itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
              tagUuid: '892a8c4c-d9a1-48bd-9dcb-6a8f03b9ce53',
              __typename: 'items_tags'
            }
          ],
          __typename: 'items_tags_mutation_response'
        }
      }
      return outputObj
    }

    const output = CreateService.addCollectionItemAndMaybeTags(
      //apollo
      {},
      //obj
      {
        uuid: 'a901e383-ba6e-49d0-bb3f-e1c02d8bf015',
        name: 'asdfasdfasd',
        slug: 'asdfasdfasd',
        url: 'asdffasdf',
        desc: 'asdfasdf',
        tags: 'tag1,tag2,tag3',
        catUuid: '6218ac30-c093-4d3c-a46c-7a71d308096e'
      },

      //userId:
      'auth0|5e8f905fd00e310bfb61f15f',
      //userUuid:

      '7b913740-33b7-422e-a540-236a327b6b75'
    )

    expect(output.insert_items.__typename).toEqual('items_mutation_response')

    expect(output.insert_items_tags.__typename).toEqual(
      'items_tags_mutation_response'
    )

    expect(output.insert_items_cats.__typename).toEqual(
      'items_cats_mutation_response'
    )
  })

  it('insertTags', () => {
    CreateService.insertTags = (apollo, tagsToInsert, itemObj) => {
      const outputObj = {
        itemUuid: 'dfcdbbe7-1d71-4a76-8f8c-5323f56cf3f8',
        userUuid: '7b913740-33b7-422e-a540-236a327b6b75',
        userId: 'auth0|5e8f905fd00e310bfb61f15f',
        url: 'url',
        slug: 'slug',
        name: 'name',
        desc: 'desc',
        catUuid: '6218ac30-c093-4d3c-a46c-7a71d308096e',
        tags: [
          {
            itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
            tagUuid: '8134bec2-d75c-4aaa-b2b8-23c9d8130aaf'
          },
          {
            itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
            tagUuid: 'a3227306-410b-4573-aff6-1c5e74be9c40'
          },
          {
            itemUuid: 'd1b75f02-41e8-4fad-8230-a3e472dad18e',
            tagUuid: '892a8c4c-d9a1-48bd-9dcb-6a8f03b9ce53'
          }
        ]
      }
      return outputObj
    }

    const output = CreateService.insertTags(
      //apollo
      {},
      //  tagsToInsert
      [
        {
          name: 'tag1',
          slug: 'ty1',
          userId: 'auth0|5e8f905fd00e310bfb61f15f',
          userUuid: '7b913740-33b7-422e-a540-236a327b6b75'
        },
        {
          name: 'tag2',
          slug: 'tag2',
          userId: 'auth0|5e8f905fd00e310bfb61f15f',
          userUuid: '7b913740-33b7-422e-a540-236a327b6b75'
        },
        {
          name: 'tag3',
          slug: 'tag3',
          userId: 'auth0|5e8f905fd00e310bfb61f15f',
          userUuid: '7b913740-33b7-422e-a540-236a327b6b75'
        }
      ],
      //itemObj
      {
        itemUuid: 'f74223c7-c18a-444d-890e-6cb0da2c1fb9',
        userUuid: '7b913740-33b7-422e-a540-236a327b6b75',
        userId: 'auth0|5e8f905fd00e310bfb61f15f',
        url: 'qwerwqe',
        slug: 'werfqwerqwer',
        name: 'werfqwerqwer',
        desc: 'rqwerqwrwe',
        catUuid: '6218ac30-c093-4d3c-a46c-7a71d308096e',
        tags: ['tag1', 'tag2', 'tag3']
      }
    )
    expect(output.tags.length).toEqual(3)
  })
  it('insertCollectionItem', () => {
    CreateService.insertCollectionItem = (apollo, tagsToInsert, itemObj) => {
      const outputObj = {
        insert_items: {
          affected_rows: 1,
          returning: [
            {
              name: 'sampleItem',
              uuid: 'e0b841cc-5b97-4ee6-9d15-b451010526ed',
              __typename: 'items'
            }
          ],
          __typename: 'items_mutation_response'
        },
        insert_items_cats: {
          returning: [
            {
              itemUuid: 'e0b841cc-5b97-4ee6-9d15-b451010526ed',
              catUuid: '6218ac30-c093-4d3c-a46c-7a71d308096e',
              __typename: 'items_cats'
            }
          ],
          __typename: 'items_cats_mutation_response'
        },
        insert_items_tags: {
          returning: [
            {
              itemUuid: 'e0b841cc-5b97-4ee6-9d15-b451010526ed',
              tagUuid: '24b42cd6-370b-4ee4-ba36-c9057e697225',
              __typename: 'items_tags'
            },
            {
              itemUuid: 'e0b841cc-5b97-4ee6-9d15-b451010526ed',
              tagUuid: '6c3645eb-e8e2-4698-ab91-022b7a959e92',
              __typename: 'items_tags'
            }
          ],
          __typename: 'items_tags_mutation_response'
        }
      }
      return outputObj
    }

    const output = CreateService.insertCollectionItem(
      //apollo
      {},
      //  tagsToInsert
      [
        {
          name: 'tag1',
          slug: 'ty1',
          userId: 'auth0|5e8f905fd00e310bfb61f15f',
          userUuid: '7b913740-33b7-422e-a540-236a327b6b75'
        },
        {
          name: 'tag2',
          slug: 'tag2',
          userId: 'auth0|5e8f905fd00e310bfb61f15f',
          userUuid: '7b913740-33b7-422e-a540-236a327b6b75'
        },
        {
          name: 'tag3',
          slug: 'tag3',
          userId: 'auth0|5e8f905fd00e310bfb61f15f',
          userUuid: '7b913740-33b7-422e-a540-236a327b6b75'
        }
      ],
      //itemObj
      {
        itemUuid: 'f74223c7-c18a-444d-890e-6cb0da2c1fb9',
        userUuid: '7b913740-33b7-422e-a540-236a327b6b75',
        userId: 'auth0|5e8f905fd00e310bfb61f15f',
        url: 'qwerwqe',
        slug: 'werfqwerqwer',
        name: 'werfqwerqwer',
        desc: 'rqwerqwrwe',
        catUuid: '6218ac30-c093-4d3c-a46c-7a71d308096e',
        tags: ['tag1', 'tag2', 'tag3']
      }
    )

    expect(output.insert_items.__typename).toEqual('items_mutation_response')

    expect(output.insert_items_tags.__typename).toEqual(
      'items_tags_mutation_response'
    )

    expect(output.insert_items_cats.__typename).toEqual(
      'items_cats_mutation_response'
    )
  })
})
