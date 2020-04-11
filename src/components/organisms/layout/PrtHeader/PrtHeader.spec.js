import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import PrtHeader from './PrtHeader.vue'

import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('PrtHeader.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      getUser: () => 'auth0|00000000000000000000'
    }
    store = new Vuex.Store({
      modules: {
        account: {
          getters
        }
      }
    })
  })
  it('renders a component', () => {
    const component = mount(PrtHeader, { store, localVue })
    expect(component.contains('.prt-header')).toBe(true)
  })

  it('renders filter toolbar', () => {
    const component = mount(PrtHeader, { store, localVue })
    expect(component.contains('.prt-filter-toolbar')).toBe(true)
  })

  it('renders login toolbar', () => {
    const component = mount(PrtHeader, { store, localVue })
    expect(component.contains('.prt-login-toolbar')).toBe(true)
  })
})
