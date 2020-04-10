import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import PrtLoginToolbar from './PrtLoginToolbar.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('PrtLoginToolbar.vue', () => {
  it('renders a login  toolbar component', () => {
    const component = mount(PrtLoginToolbar, { localVue })
    expect(component.contains('.prt-login-toolbar')).toBe(true)
  })
})
