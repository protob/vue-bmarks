import { shallowMount } from '@vue/test-utils'
import PrtSelectOption from './PrtSelectOption.vue'
describe('PrtSelectOption.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtSelectOption)
    expect(component.contains('.prt-select-option')).toBe(true)
  })
})
