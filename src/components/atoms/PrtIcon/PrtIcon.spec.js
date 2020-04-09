import { shallowMount } from '@vue/test-utils'
import PrtIcon from './PrtIcon.vue'

describe('PrtIcon.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtIcon)
    expect(component.contains('.prt-icon')).toBe(true)
  })

  it('slot renders html', () => {
    const component = shallowMount(PrtIcon, {
      slots: {
        default: '<svg class="sample-svg"></svg>'
      }
    })
    expect(component.findAll('.sample-svg').length).toBe(1)
  })
  it('slot renders text', () => {
    const component = shallowMount(PrtIcon, {
      slots: {
        default: 'sample'
      }
    })
    expect(component.text()).toBe('sample')
  })

  it('renders a component with props', () => {
    const component = shallowMount(PrtIcon, {
      propsData: {
        icon: 'chevron',
        size: '15px',
        color: 'green',
        viewBox: '0 0 24 24'
      }
    })

    expect(component.props('icon')).toBe('chevron')
    expect(component.props('size')).toBe('15px')
    expect(component.props('color')).toBe('green')
    expect(component.props('viewBox')).toBe('0 0 24 24')
  })
})
