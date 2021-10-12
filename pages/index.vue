<template>
  <div class=" w-96 rounded-xl border border-gray-100 shadow-sm p-5">
    <add-todo @error="showError" @addtodo="_addTodo" />
    <todo-list @removetodo="_removeTodo" @updatetodo="_updateTodo" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AddTodo from '~/components/AddTodo.vue'
import TodoList from '~/components/TodoList.vue'
export default {
  components: { AddTodo, TodoList },
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
      this.updateTodo({ status: event.status, id: event.todo.id })
    }
  }
}
</script>
