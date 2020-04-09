import { shallowMount, mount } from '@vue/test-utils'
import PrtSidebar from './PrtSidebar.vue'

describe('PrtSidebar.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtSidebar)
    expect(component.contains('.prt-sidebar')).toBe(true)
  })

  it('renders cats toolbar', () => {
    const component = mount(PrtSidebar)
    expect(component.contains('.prt-cats-listing')).toBe(true)
  })

  it('renders tags toolbar', () => {
    const component = mount(PrtSidebar)
    expect(component.contains('.prt-tags-listing')).toBe(true)
  })
})
