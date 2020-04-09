import { shallowMount, mount } from '@vue/test-utils'
import PrtItem from './PrtItem.vue'

describe('PrtItem.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtItem)
    expect(component.contains('.prt-item')).toBe(true)
  })

  it('renders a component with props', () => {
    const component = shallowMount(PrtItem, {
      propsData: {
        title: 'sampleTitle'
      }
    })

    expect(component.find('.prt-item__link').text()).toContain('sampleTitle')
  })

  it('renders tags', () => {
    const component = mount(PrtItem)
    expect(component.contains('.prt-tags .prt-button')).toBe(true)
  })

  it('renders action buttons', () => {
    const component = mount(PrtItem)
    expect(component.contains('.prt-item__buttons .prt-button')).toBe(true)
  })
})
