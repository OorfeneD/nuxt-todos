// import { createHash } from 'crypto'
import Vue from 'vue'
import { getUrl } from '@/service/url'
export const state = () => ({
  todos: []
})

export const getters = {
  todos: state => state.todos,
  todoById: state => id => state.todos.reduce((acc, v) => v.id === id ? v : acc, null)
}

export const mutations = {
  changeTodos (state, todos) {
    Vue.set(state, 'todos', todos)
  },
  changeTodoStatusByIndex (state, { index, status }) {
    Vue.set(state.todos[index], 'status', status)
  }
}

export const actions = {
  async getTodos ({ commit, rootState }) {
    const data = await fetch(getUrl('getTodos'), {
      method: 'post',
      body: JSON.stringify({
        token: rootState.user.token
      }),
      mode: 'cors'
    }).then(res => res.json()).catch(error => console.error(error) && null)
    if (data && (data != null)) {
      commit('changeTodos', (data.data))
    }
  },
  setTodos ({ commit }, todos) {
    commit('changeTodos', todos)
  },
  updateTodo ({ state, commit }, { status, id }) {
    const index = state.todos.reduce((acc, v, i) => v.id === id ? i : acc, -1)
    if (index >= 0 && index < state.todos.length) {
      commit('changeTodoStatusByIndex', { index, status })
      fetch(getUrl('updateTodo'), {
        method: 'post',
        body: JSON.stringify({
          token: state.user.token,
          status,
          todoId: id
        }),
        mode: 'cors'
      }).then(res => res.json()).catch(error => console.error(error))
    } else {
      throw (new Error(`Invalid index variable: should be greater of zero and smaller than array length\nindex: ${index}, length: ${state.todos.length}`))
    }
    this.$updateLocalStorage(state.todos)
  },
  async addTodo ({ state, commit }, { content }) {
    if (!content.title) {
      throw (new Error('Invalid content variable: title prop is not defined\n content value: ' + content))
    }
    try {
      const response = await fetch(getUrl('addTodo'), {
        method: 'post',
        body: JSON.stringify({
          title: content.title,
          token: state.user.token,
          status: false
        }),
        mode: 'cors'
      }).then(res => res.json())
      // const salt = 'Some salt string'
      // const hash = createHash('md5').update(content.title + Date.now() + Math.floor(Math.random() * (2 ** 64 - 1)) + salt).digest('hex')
      if (response.error) {
        throw (new Error('server error: ' + response.error))
      }
      const id = response.data.id
      commit('changeTodos', [...state.todos, { content, id, status: false }])
      this.$updateLocalStorage(state.todos)
    } catch (error) {

    }
  },
  removeTodo ({ state, commit }, { id }) {
    commit('changeTodos', state.todos.filter(v => v.id !== id))
    this.$updateLocalStorage(state.todos)
    fetch(getUrl('deleteTodo'), {
      method: 'post',
      body: JSON.stringify({
        token: state.user.token,
        todoId: id
      }),
      mode: 'cors'
    }).then(res => res.json()).catch(error => console.error(error))
  }
}
