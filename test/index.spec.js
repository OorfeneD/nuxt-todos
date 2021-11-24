import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueX from 'vuex'
import { todo, badTodo } from './mocks/todo.mock'
import index from '@/pages/index'
import AddTodo from '~/components/AddTodo.vue'
import TodoList from '~/components/TodoList.vue'

const localVue = createLocalVue()
localVue.use(VueX)
global.alert = jest.fn()
describe('index page', () => {
  let actions
  let getters
  let store
  let emptyGetters
  let emptyStore
  const spies = {
    showError: jest.fn()
  }
  const preInit = () => {
    actions = {
      addTodo: jest.fn(),
      removeTodo: jest.fn(),
      updateTodo: jest.fn()
    }
    getters = {
      isLoggedIn: () => true
    }
    emptyGetters = {
      isLoggedIn: () => false
    }
    // eslint-disable-next-line
    store = new VueX.Store({
      actions,
      modules: {
        user: {
          getters,
          namespaced: true
        }
      }
    })
    // eslint-disable-next-line
    emptyStore = new VueX.Store({
      actions,
      modules: {
        user: {
          getters: emptyGetters,
          namespaced: true
        }
      }
    })
    spies.showError = jest.spyOn(index.methods, 'showError')
  }
  describe('render', () => {
    beforeAll(preInit)
    test('is Vue instance', () => {
      const wrapper = shallowMount(index, { store, localVue })
      expect(wrapper.vm).toBeTruthy()
    })
    test('is match snapshot with logged in user', () => {
      const wrapper = shallowMount(index, { store, localVue })
      expect(wrapper.html()).toMatchSnapshot()
    })
    test('is match snapshot with logged out user', () => {
      const wrapper = shallowMount(index, { store: emptyStore, localVue })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
  describe('vuex', () => {
    let wrapper
    beforeAll(() => {
      preInit()
      wrapper = shallowMount(index, {
        store,
        localVue
      })
    })
    test('dispatches `addTodo` action on `AddTodo` events', () => {
      wrapper.findComponent(AddTodo).vm.$emit('addtodo', todo)
      expect(actions.addTodo).toHaveBeenCalled()
    })
    test('`_addTodo` method calls `showError` on invalid data', () => {
      wrapper.findComponent(AddTodo).vm.$emit('addtodo', badTodo)
      expect(spies.showError).toHaveBeenCalled()
    })
    test('calls `showError` action on `AddTodo` events', () => {
      wrapper.findComponent(AddTodo).vm.$emit('error', { msg: '' })
      expect(spies.showError).toHaveBeenCalled()
      wrapper.vm.$forceUpdate()
    })
    test('dispatches `removeTodo` action on `TodoList` component events', () => {
      wrapper.findComponent(TodoList).vm.$emit('removetodo', { todo })
      expect(actions.removeTodo).toHaveBeenCalled()
    })
    test('dispatches `updateTodo` action on `TodoList` component events', () => {
      wrapper.findComponent(TodoList).vm.$emit('updatetodo', { newStatus: true, todo })
      expect(actions.updateTodo).toHaveBeenCalled()
    })
  })
})
