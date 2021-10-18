import { createHash } from 'crypto'
import Vue from 'vue'
export const state = () => ({
  todos: [
    {
      content:
      {
        title: 'Check this ☑ToDo List',
        description: 'todo list, that made for peoples!'
      },
      tags: [0],
      id: '41c2a2d860f441befdb1e6dbdb18ec26',
      status: false
    },
    {
      content:
      {
        title: 'Follow the OorfeneD 🎈',
        description: 'Is this boy are really so good?'
      },
      id: '51b816513f441a0be7b2cbc64c4c6f65',
      tags: [1, 2],
      status: false
    }],
  tags: [
    {
      title: 'Important',
      color: '#ca4422'
    },
    {
      title: 'Hobby',
      color: '#33ca22'
    },
    {
      title: 'DevDays',
      color: '#3344ca'
    }
  ]
})

export const getters = {
  todos: state => state.todos,
  todoById: state => id => state.todos.reduce((acc, v) => v.id === id ? v : acc, null),
  tags: state => state.tags.map((v, i) => Object.assign({ id: i }, v)),
  tagById: state => id => state.tags[id]
}

export const mutations = {
  changeTodos (state, todos) {
    Vue.set(state, 'todos', todos)
  },
  changeTodoStatusByIndex (state, { index, status }) {
    Vue.set(state.todos[index], 'status', status)
  },
  addTag (state, { title, color }) {
    state.tags.push({ title, color })
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
  },
  addTag ({ state, commit }, { title }) {
    const color = `hsl(${Math.floor(Math.random() * 360)}, 75%, 50%)`
    commit('addTag', { color, title })
  },
  addTagToTodo ({ state, commit }, { tagId, todoId }) {
    //
  }
}
