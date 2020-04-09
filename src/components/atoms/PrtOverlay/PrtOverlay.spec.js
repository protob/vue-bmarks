import { shallowMount } from '@vue/test-utils'
import PrtOverlay from './PrtOverlay.vue'

describe('PrtOverlay.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtOverlay, {
      propsData: {
        visible: true
      }
    })
    expect(component.contains('.prt-overlay')).toBe(true)
  })
})
