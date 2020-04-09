import { shallowMount, mount } from '@vue/test-utils'
import PrtHeader from './PrtHeader.vue'

describe('PrtHeader.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtHeader)
    expect(component.contains('.prt-header')).toBe(true)
  })

  it('renders filter toolbar', () => {
    const component = mount(PrtHeader)
    expect(component.contains('.prt-filter-toolbar')).toBe(true)
  })

  it('renders login toolbar', () => {
    const component = mount(PrtHeader)
    expect(component.contains('.prt-login-toolbar')).toBe(true)
  })
})
