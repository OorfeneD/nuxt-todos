import { mount } from '@vue/test-utils'
import Icon from '../components/Icon.vue'

describe('Icon Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Icon)
    expect(wrapper.vm).toBeTruthy()
  })
  test('contains icon html', () => {
    const wrapper = mount(Icon, {
      propsData: {
        github: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('is rendering without props', () => {
    const wrapper = mount(Icon, {
      propsData: {
      }
    })
    expect(Object.is(wrapper.html().trim(), '<span><!----></span>')).toBeTruthy()
  })
})
