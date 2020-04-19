import { shallowMount, createLocalVue } from '@vue/test-utils'
import PrtItemForm from './PrtItemForm.vue'
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
          catUuid: '186270f5-abdf-4459-a088-d8a0a4a0d8a9',
          isItem: true,
          isEditing: false,
          target: 'item',
          taxName: 'ecommerce',
          taxUuid: '186270f5-abdf-4459-a088-d8a0a4a0d8a9'
        }
      },
      getFormMode: () => 'catForm'
    }
    store = new Vuex.Store({
      getters
    })
  })

  it('renders a component', () => {
    const component = shallowMount(PrtItemForm, {
      store,
      localVue,
      propsData: {
        tax: 'cat'
      }
    })
    expect(component.contains('.prt-item-form')).toBe(true)
  })
})
