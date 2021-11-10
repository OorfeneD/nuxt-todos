import { shallowMount } from '@vue/test-utils'
import AddTodo from '../components/AddTodo.vue'

describe('AddTodo Component', () => {
  const wrapper = shallowMount(AddTodo)
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('instance contains `title` empty string variable', () => {
    expect(wrapper.vm).toStrictEqual(expect.objectContaining({ title: '' }))
  })
  test('contains AddTodo html', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('emits event on form submit', () => {
    wrapper.find('input').setValue('test')
    wrapper.find('form').trigger('submit')
    expect(wrapper.emitted().addtodo).toBeTruthy()
  })
  test('input value was cleared after submit', () => {
    expect(wrapper.vm.title.length).toBe(0)
  })
  test('emitted event contains `test` string', () => {
    expect(wrapper.emitted('addtodo')[0]).not.toBeUndefined()
    expect(wrapper.emitted('addtodo')[0][0]).toStrictEqual(
      expect.objectContaining(
        { content: { title: 'test' } }
      )
    )
  })
})
