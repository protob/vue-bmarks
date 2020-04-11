import { shallowMount, createLocalVue } from '@vue/test-utils'
import PrtTaxForm from './PrtTaxForm.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()

localVue.use(Vuex)

describe('PrtTaxForm.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      getCurrentUserUuid: () => 1,
      getModalForm: () => {
        return {
          isEditing: false,
          target: 'cat',
          taxName: 'cat',
          taxUuid: '7b913740-33b7-422e-a540-236a327b6b75'
        }
      },
      getFormMode: () => 'catForm'
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('renders a component', () => {
    const component = shallowMount(PrtTaxForm, {
      store,
      localVue,
      propsData: {
        tax: 'cat'
      }
    })
    expect(component.contains('.prt-tax-form')).toBe(true)
  })
})
