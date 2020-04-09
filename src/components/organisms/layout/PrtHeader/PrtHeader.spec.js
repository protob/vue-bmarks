import { shallowMount } from '@vue/test-utils'
import PrtHeader from './PrtHeader.vue'

describe('PrtHeader.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtHeader)
    expect(component.contains('.prt-header')).toBe(true)
  })
})
