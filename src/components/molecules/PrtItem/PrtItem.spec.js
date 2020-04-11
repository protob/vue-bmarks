import { shallowMount, mount } from '@vue/test-utils'
import PrtItem from './PrtItem.vue'

describe('PrtItem.vue', () => {
  const item = {
    name: 'sampleTitle',
    bookmarks_tags: [
      {
        tag: {
          uuid: 'e84482e7-4d7d-4507-9f10-7ead62a54ca1',
          name: 'persta',
          slug: 'persta',
          __typename: 'tags'
        },
        __typename: 'bookmarks_tags'
      }
    ]
  }
  const catUuid = 'e84482e7-4d7d-4507-9f10-7ead62a54ca1'
  it('renders a component', () => {
    const component = shallowMount(PrtItem, {
      propsData: {
        item,
        catUuid
      }
    })
    expect(component.contains('.prt-item')).toBe(true)
  })

  it('renders a component with props', () => {
    const component = shallowMount(PrtItem, {
      propsData: {
        item,
        catUuid
      }
    })

    expect(component.find('.prt-item__link').text()).toContain('sampleTitle')
  })

  it('renders tags', () => {
    const component = mount(PrtItem, {
      propsData: {
        item,
        catUuid
      }
    })
    expect(component.contains('.prt-tags .prt-button')).toBe(true)
  })

  it('renders action buttons', () => {
    const component = mount(PrtItem, {
      propsData: {
        item,
        catUuid
      }
    })
    expect(component.contains('.prt-item__buttons .prt-button')).toBe(true)
  })
})
