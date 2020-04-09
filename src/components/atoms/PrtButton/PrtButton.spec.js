import { shallowMount } from '@vue/test-utils'
import PrtButton from './PrtButton.vue'

describe('PrtButton.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtButton)
    expect(component.contains('.prt-button')).toBe(true)
  })

  it('renders html in slot', () => {
    const component = shallowMount(PrtButton, {
      slots: {
        default: '<div class="sample-content"></div>'
      }
    })
    expect(component.findAll('.sample-content').length).toBe(1)
  })
  it('slot renders text', () => {
    const component = shallowMount(PrtButton, {
      slots: {
        default: 'sample'
      }
    })
    expect(component.text()).toBe('sample')
  })
})
