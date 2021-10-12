import { createHash } from 'crypto'
import Vue from 'vue'
export const state = () => ({
  todos: [
    {
      content:
      {
        title: 'Check this ☑ToDo List'
      },
      id: '41c2a2d860f441befdb1e6dbdb18ec26',
      status: false
    },
    {
      content:
      {
        title: 'Follow the OorfeneD 🎈'
      },
      id: '51b816513f441a0be7b2cbc64c4c6f65',
      status: false
    }]
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
  setTodos ({ commit }, todos) {
    commit('changeTodos', todos)
  },
  updateTodo ({ state, commit }, { status, id }) {
    const index = state.todos.reduce((acc, v, i) => v.id === id ? i : acc, -1)
    if (index >= 0 && index < state.todos.length) {
      commit('changeTodoStatusByIndex', { index, status })
    } else {
      throw (new Error(`Invalid index variable: should be greater of zero and smaller than array length\nindex: ${index}, length: ${state.todos.length}`))
    }
    this.$updateLocalStorage(state.todos)
  },
  addTodo ({ state, commit }, { content }) {
    if (!content.title) {
      throw (new Error('Invalid content variable: title prop is not defined\n content value: ' + content))
    }
    const salt = 'Some salt string'
    const hash = createHash('md5').update(content.title + Date.now() + Math.floor(Math.random() * (2 ** 64 - 1)) + salt).digest('hex')
    const id = hash
    commit('changeTodos', [...state.todos, { content, id, status: false }])
    this.$updateLocalStorage(state.todos)
  },
  removeTodo ({ state, commit }, { id }) {
    commit('changeTodos', state.todos.filter(v => v.id !== id))
    this.$updateLocalStorage(state.todos)
  }
}
