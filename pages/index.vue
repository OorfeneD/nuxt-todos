<template>
  <div class="w-screen flex flex-col items-center py-2">
    <div class="py-3 px-2">
      <h1 class="w-full text-center text-2xl">
        ToDo List
      </h1>
      <span class="text-gray-400 text-sm">
        by <a href="https://github.com/OorfeneD" class="text-blue-300 hover:bg-gray-100 hover:text-blue-500 transition p-1 rounded" title="GitHub OorfeneD"><icon github /> OorfeneD</a>
      </span>
    </div>
    <div v-if="isLoggedIn" class="w-full sm:w-96 rounded-0 sm:rounded-xl border border-gray-100 shadow-md p-5">
      <add-todo @error="showError" @addtodo="_addTodo" />
      <todo-list @removetodo="_removeTodo" @updatetodo="_updateTodo" />
    </div>
    <div v-else>
      Authenticate to work with TODOs
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddTodo from '~/components/AddTodo.vue'
import Icon from '~/components/Icon.vue'
import TodoList from '~/components/TodoList.vue'
export default {
  components: { AddTodo, TodoList, Icon },
  layout: 'main',
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
  },
  methods: {
    ...mapActions(['addTodo', 'removeTodo', 'updateTodo']),
    showError (event) {
      alert(event.msg)
    },
    _removeTodo (event) {
      this.removeTodo(event.todo)
    },
    _addTodo (event) {
      if (!event.content.title || event.content.title.length < 1) {
        this.showError('error', { msg: 'Todo title is empty or invalid' })
        return
      }
      this.addTodo({ content: event.content })
    },
    _updateTodo (event) {
      this.updateTodo({ status: event.newStatus, id: event.todo.id })
    },
    showModal (modalType) {
      this.$nuxt.$emit('modalshow', modalType)
    }
  }
}
</script>
