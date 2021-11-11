import { shallowMount } from '@vue/test-utils'
import { login, password } from '../mocks/user.mock'
import SignInModal from '@/components/modal/SignInModal'

describe('SignInModal', () => {
  let wrapper = shallowMount(SignInModal)
  beforeEach(() => {
    wrapper = shallowMount(SignInModal)
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('matchs snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('emits event on from submit', () => {
    wrapper.find('input#fir').setValue(login)
    wrapper.find('input#sec').setValue(password)
    wrapper.find('form').trigger('submit')
    expect(wrapper.emitted().submit).toBeTruthy()
  })
  test('emitted data has login and pass', () => {
    wrapper.find('input#fir').setValue(login)
    wrapper.find('input#sec').setValue(password)
    wrapper.find('form').trigger('submit')
    expect(wrapper.emitted().submit[0]).not.toBeUndefined()
    expect(wrapper.emitted().submit[0][0]).not.toBeUndefined()
    expect(wrapper.emitted().submit[0][0].data).not.toBeUndefined()
    expect(wrapper.emitted().submit[0][0].data).toMatchObject([login, password])
  })
  test('didn`t emits on empty inputs', () => {
    wrapper.find('input#fir').setValue('')
    wrapper.find('input#sec').setValue('')
    wrapper.find('form').trigger('submit')
    expect(wrapper.emitted().submit).not.toBeTruthy()
  })
})