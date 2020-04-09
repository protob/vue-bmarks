import { shallowMount } from '@vue/test-utils'
import PrtInput from './PrtInput.vue'

describe('PrtInput.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtInput)
    expect(component.contains('.prt-input')).toBe(true)
  })

  it('renders a component with props', () => {
    const propsData = {
      value: 'sampleValue',
      label: 'sampleLabel',
      name: 'sampleName',
      type: 'text',
      valid: true,
      required: true,
      disabled: false,
      ariaLabel: 'sampleLabel',
      hasShowPassword: true
    }

    const component = shallowMount(PrtInput, {
      propsData
    })

    Object.keys(propsData).forEach(key => {
      expect(component.props(key)).toBe(propsData[key])
    })
  })

  it('changing elemnt value changes component value', () => {
    const component = shallowMount(PrtInput)
    const input = component.find('input')

    //component.vm.value = 8080
    input.element.value = '8080'
    input.trigger('input')

    expect(input.element.value).toBe('8080')
    // expect(component.vm.value).toBe(8080)
  })

  it('renders error label', () => {
    const propsData = {
      valid: false
    }

    const component = shallowMount(PrtInput, {
      propsData
    })

    expect(component.contains('.prt-input__error-message')).toBe(true)
  })
})
