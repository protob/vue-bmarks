import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import PrtHeader from './PrtHeader.vue'

import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('PrtHeader.vue', () => {
  it('renders a component', () => {
    const component = mount(PrtHeader, { localVue })
    expect(component.contains('.prt-header')).toBe(true)
  })

  it('renders filter toolbar', () => {
    const component = mount(PrtHeader, { localVue })
    expect(component.contains('.prt-filter-toolbar')).toBe(true)
  })

  it('renders login toolbar', () => {
    const component = mount(PrtHeader, { localVue })
    expect(component.contains('.prt-login-toolbar')).toBe(true)
  })
})
