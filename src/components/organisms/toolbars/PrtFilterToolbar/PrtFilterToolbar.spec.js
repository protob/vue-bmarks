import { shallowMount, createLocalVue } from '@vue/test-utils'
import PrtFilterToolbar from './PrtFilterToolbar.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('PrtFilterToolbar.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(PrtFilterToolbar, { localVue })
    expect(component.contains('.prt-filter-toolbar')).toBe(true)
  })
})
