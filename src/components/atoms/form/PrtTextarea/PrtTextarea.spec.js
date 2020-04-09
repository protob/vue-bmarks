import { shallowMount } from '@vue/test-utils'
import PrtTextarea from './PrtTextarea.vue'

describe('PrtTextarea.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtTextarea)
    expect(component.contains('.prt-textarea')).toBe(true)
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

    const component = shallowMount(PrtTextarea, {
      propsData
    })

    Object.keys(propsData).forEach(key => {
      expect(component.props(key)).toBe(propsData[key])
    })
  })

  it('changing elemnt value changes component value', () => {
    const component = shallowMount(PrtTextarea)
    const textarea = component.find('textarea')

    textarea.element.value = '8080'
    textarea.trigger('input')
    expect(textarea.element.value).toBe('8080')
  })

  it('renders error label', () => {
    const propsData = {
      valid: false
    }

    const component = shallowMount(PrtTextarea, {
      propsData
    })

    expect(component.contains('.prt-textarea__error-message')).toBe(true)
  })
})
