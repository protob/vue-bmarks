import { shallowMount } from '@vue/test-utils'
import PrtModal from './PrtModal.vue'

describe('PrtModal.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtModal)
    expect(component.contains('.prt-modal')).toBe(true)
  })

  it('renders html in slot', () => {
    const component = shallowMount(PrtModal, {
      propsData: {
        title: 'title',
        visible: true,
        persistent: true
      },
      slots: {
        default: '<div class="sample-content"></div>'
      }
    })
    expect(component.findAll('.sample-content').length).toBe(1)
  })

  it('renders a component with props', () => {
    const propsData = {
      showDesktopBar: true,
      title: 'title',
      visible: true,
      cross: true,
      overlay: true,
      persistent: true,
      transitionOverlay: true,
      transitionModal: true,
      ariaLabelClose: 'close'
    }

    const component = shallowMount(PrtModal, {
      propsData
    })

    Object.keys(propsData).forEach(key => {
      expect(component.props(key)).toBe(propsData[key])
    })
  })
})
