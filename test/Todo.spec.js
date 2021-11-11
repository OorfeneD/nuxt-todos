import { shallowMount } from '@vue/test-utils'
import Todo from '../components/Todo.vue'
import { titleText, todo as todoPropData } from './mocks/todo.mock'
describe('Todo Component', () => {
  const wrapper = shallowMount(Todo, {
    propsData: {
      todo: todoPropData
    }
  })
  const emptyWrapper = shallowMount(Todo)
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('is renders with no props', () => {
    expect(emptyWrapper.vm).toBeTruthy()
    expect(emptyWrapper.vm.todo).not.toBeUndefined()
  })
  test('instance contains `todo` prop data', () => {
    expect(wrapper.vm).toStrictEqual(expect.objectContaining({ todo: todoPropData }))
  })
  test('instance renders title', () => {
    expect(wrapper.text()).toContain(titleText)
  })
  test('matchs snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('emits event on checkbox state changing', () => {
    wrapper.find('input').trigger('click')
    wrapper.find('input').trigger('change')
    expect(wrapper.emitted().updatetodo).toBeTruthy()
  })
  test('status wasn`t changed after checkbox click', () => {
    expect(wrapper.vm.todo.status).not.toBeTruthy()
  })
  test('emitted event contains `status` string with `true` value', () => {
    expect(wrapper.emitted('updatetodo')[0]).not.toBeUndefined()
    expect(wrapper.emitted('updatetodo')[0][0]).toStrictEqual(
      expect.objectContaining(
        { todo: todoPropData, newStatus: true }
      )
    )
  })
  test('emits event on checkbox state changing', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().removetodo).toBeTruthy()
  })
})
