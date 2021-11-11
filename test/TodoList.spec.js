import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import TodoList from '../components/TodoList.vue'
import Todo from '../components/Todo'
import { todos } from './mocks/todo.mock'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('TodoList Component', () => {
  let getters, emptyGetters, store, emptyStore
  let wrapper
  beforeEach(() => {
    getters = {
      todos: () => todos
    }
    emptyGetters = {
      todos: () => []
    }
    // eslint-disable-next-line
    store = new Vuex.Store({
      getters
    })
    // eslint-disable-next-line
    emptyStore = new Vuex.Store({
      getters: emptyGetters
    })
  })
  test('is a Vue instance', () => {
    wrapper = shallowMount(TodoList, { store, localVue })
    expect(wrapper.vm).toBeTruthy()
  })
  test('matchs snapshot', () => {
    wrapper = shallowMount(TodoList, { store, localVue })
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('renders with no todos', () => {
    wrapper = shallowMount(TodoList, { store: emptyStore, localVue })
    expect(wrapper.vm).toBeTruthy()
  })
  test('matchs no todos snapshot', () => {
    wrapper = shallowMount(TodoList, { store: emptyStore, localVue })
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('has message about empty todos', () => {
    wrapper = shallowMount(TodoList, { store: emptyStore, localVue })
    expect(wrapper.text()).toContain('Add your first ToDo')
  })
  test('children events passes through', () => {
    wrapper = mount(TodoList, { store, localVue })
    wrapper.findComponent(Todo).vm.$emit('updatetodo')
    wrapper.findComponent(Todo).vm.$emit('removetodo')
    expect(wrapper.emitted().updatetodo).toBeTruthy()
    expect(wrapper.emitted().removetodo).toBeTruthy()
  })
})
