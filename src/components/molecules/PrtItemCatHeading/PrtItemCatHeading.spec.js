import { shallowMount, mount } from '@vue/test-utils'
import PrtItemCatHeading from './PrtItemCatHeading.vue'

describe('PrtItemCatHeading.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtItemCatHeading)
    expect(component.contains('.prt-item-cat-heading')).toBe(true)
  })

  it('renders a component with props', () => {
    const component = shallowMount(PrtItemCatHeading, {
      propsData: {
        text: 'sampleTitle'
      }
    })

    expect(component.find('.prt-item-cat-heading__text').text()).toContain(
      'sampleTitle'
    )
  })

  it('renders action buttons', () => {
    const component = mount(PrtItemCatHeading)
    expect(component.contains('.prt-item-cat-heading__btns .prt-button')).toBe(
      true
    )
  })
})
