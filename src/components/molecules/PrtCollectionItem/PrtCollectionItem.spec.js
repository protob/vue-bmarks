import { shallowMount } from '@vue/test-utils'
import PrtCollectionItem from './PrtCollectionItem.vue'

describe('PrtCollectionItem.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtCollectionItem, {
      propsData: {
        collectionItem: {
          name: 'vue',
          uuid: '0cbd7327-5e96-493e-af59-203da9e0de22',
          items_cats: [
            {
              item: {
                uuid: '6370cc14-2d83-4e54-a6e3-bee56f782c6c',
                name: 'vue',
                slug: 'vue',
                desc: 'The Progressive JavaScript Framework',
                updated_at: '2020-04-09T21:17:50.964745+00:00',
                url: 'https://vuejs.org',
                user: {
                  uuid: '7b913740-33b7-422e-a540-236a327b6b75',
                  __typename: 'users'
                },
                items_tags: [],
                __typename: 'items'
              },
              __typename: 'items_cats'
            }
          ],
          __typename: 'cats'
        }
      }
    })
    expect(component.contains('.prt-collection-item')).toBe(true)
  })
})
