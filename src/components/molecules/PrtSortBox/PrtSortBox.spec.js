import { shallowMount } from '@vue/test-utils'
import PrtSortBox from './PrtSortBox.vue'

describe('PrtSortBox.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtSortBox)
    expect(component.contains('.prt-sort-box')).toBe(true)
  })
})
