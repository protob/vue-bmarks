import { shallowMount, mount } from '@vue/test-utils'
import PrtSidebarHeading from './PrtSidebarHeading.vue'

describe('PrtSidebarHeading.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtSidebarHeading)
    expect(component.contains('.prt-sidebar-heading')).toBe(true)
  })

  it('renders a component with props', () => {
    const component = shallowMount(PrtSidebarHeading, {
      propsData: {
        text: 'sampleTitle'
      }
    })

    expect(component.find('.prt-sidebar-heading__text').text()).toContain(
      'sampleTitle'
    )
  })

  it('renders action buttons', () => {
    const component = mount(PrtSidebarHeading)
    expect(
      component.contains('.prt-sidebar-heading__buttons .prt-button')
    ).toBe(true)
  })
})
