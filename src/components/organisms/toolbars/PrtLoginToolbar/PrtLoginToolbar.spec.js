import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import PrtLoginToolbar from './PrtLoginToolbar.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('PrtLoginToolbar.vue', () => {
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
  it('renders a login  toolbar component x', () => {
    const component = mount(PrtLoginToolbar, { store, localVue })
    expect(component.contains('.prt-login-toolbar')).toBe(true)
  })
})
