<template>
  <ul class="py-1">
    <todo
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @removetodo="$emit('removetodo', $event)"
      @updatetodo="$emit('updatetodo', $event)"
    />
    <li v-if="todos.length < 1" class="text-sm text-gray-400 text-center py-2">
      There is nothing here. Add your first ToDo
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import Todo from './Todo.vue'
export default {
  components: { Todo },
  computed: {
    ...mapGetters(['todos'])
  }
}
</script>

<style>

</style>
