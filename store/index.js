import { createHash } from 'crypto'
import Vue from 'vue'
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
  updateTodo ({ state, commit }, { status, id }) {
    const index = state.todos.reduce((acc, v, i) => v.id === id ? i : acc, -1)
    if (index >= 0 && index < state.todos.length) {
      commit('changeTodoStatusByIndex', { index, status })
    } else {
      throw (new Error(`Invalid index variable: should be greater of zero and smaller than array length\nindex: ${index}, length: ${state.todos.length}`))
    }
  },
  addTodo ({ state, commit }, { content }) {
    if (!content.title) {
      throw (new Error('Invalid content variable: title prop is not defined\n content value: ' + content))
    }
    const salt = 'Some salt string'
    const hash = createHash('md5').update(content.title + Date.now() + Math.floor(Math.random() * (2 ** 64 - 1)) + salt).digest('hex')
    const id = hash
    commit('changeTodos', [...state.todos, { content, id, status: false }])
  },
  removeTodo ({ state, commit }, { id }) {
    commit('changeTodos', state.todos.filter(v => v.id !== id))
  }
}
