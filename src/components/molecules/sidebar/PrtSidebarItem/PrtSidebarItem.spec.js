import { shallowMount, mount } from '@vue/test-utils'
import PrtSidebarItem from './PrtSidebarItem.vue'

describe('PrtSidebarItem.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtSidebarItem)
    expect(component.contains('.prt-sidebar-item')).toBe(true)
  })

  it('renders a component with props', () => {
    const component = shallowMount(PrtSidebarItem, {
      propsData: {
        tax: 'tag'
      }
    })

    expect(component.find('.prt-sidebar-item__text').text()).toContain('tag')
  })

  it('renders action buttons', () => {
    const component = mount(PrtSidebarItem)
    expect(component.contains('.prt-sidebar-item__btns .prt-button')).toBe(true)
  })
})
