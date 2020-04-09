import { shallowMount } from '@vue/test-utils'
import PrtFooter from './PrtFooter.vue'

describe('PrtFooter.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtFooter)
    expect(component.contains('.prt-footer')).toBe(true)
  })
})
