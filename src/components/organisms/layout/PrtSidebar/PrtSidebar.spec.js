import { shallowMount } from '@vue/test-utils'
import PrtSidebar from './PrtSidebar.vue'

describe('PrtSidebar.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtSidebar)
    expect(component.contains('.prt-sidebar')).toBe(true)
  })
})
