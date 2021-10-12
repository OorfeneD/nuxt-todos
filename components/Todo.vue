<template>
  <li :class="`py-2 px-3 border border-gray-100 text-gray-500 rounded-md my-1 flex  ${todo.status ? 'bg-gray-100' : ''}`">
    <input
      :id="todo.id"
      class="flex-grow-0"
      :checked="todo.status"
      type="checkbox"
      name="todo"
      @change="$emit('updatetodo', { todo, status: $event.target.checked, originalEvent: $event})"
    >
    <label class="flex-grow text-center" :for="todo.id">
      <strike v-if="todo.status" class="text-gray-500 italic transition transition-all">
        {{ todo.content.title }}
      </strike>
      <span v-else>
        {{ todo.content.title }}
      </span>
    </label>
    <button class="font-bold text-red-800 flex-grow-0 -my-2 -mx-3 px-3 border-l hover:bg-red-400 hover:text-white transition rounded-r" @click="$emit('removetodo', { todo: todo, originalEvent: $event })">
      <icon close />
    </button>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({
        id: -1,
        content: {
          title: '<i>dead inside</i>'
        }
      })
    }
  }
}
</script>

<style>

</style>
