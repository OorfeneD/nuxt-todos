<template>
  <ul class="py-1">
    <todo
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      :tags="tags"
      @removetodo="$emit('removetodo', $event)"
      @updatetodo="$emit('updatetodo', $event)"
    />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import Todo from './Todo.vue'
export default {
  components: { Todo },
  computed: {
    ...mapGetters(['todos', 'tags'])
  }
}
</script>

<style>

</style>
