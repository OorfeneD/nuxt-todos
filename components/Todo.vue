<template>
  <li :class="`border border-gray-100 text-gray-500 rounded-md my-1 pb-2 ${todo.status ? 'bg-gray-100' : ''}`">
    <div class="pt-2 px-3 flex">
      <input
        :id="todo.id"
        class="flex-grow-0 cursor-pointer"
        :checked="todo.status"
        type="checkbox"
        name="todo"
        @change="$emit('updatetodo', { todo, status: $event.target.checked, originalEvent: $event})"
      >
      <label class="flex-grow text-center pl-1 pr-3 cursor-pointer" :for="todo.id">
        <strike v-if="todo.status" class="text-gray-500 transition transition-all">
          {{ todo.content.title }}
        </strike>
        <span v-else>
          {{ todo.content.title }}
        </span>
      </label>
      <button class="font-bold text-red-800 flex-grow-0 -my-2 -mx-3 px-3 hover:bg-red-400 hover:text-white transition rounded-r" @click="$emit('removetodo', { todo: todo, originalEvent: $event })">
        <icon close />
      </button>
    </div>
    <div v-if="!!todo.tags" class="flex flex-row px-1 pt-1">
      <tag-list class="pl-2" :tags="tags.filter(v => todo.tags.includes(v.id))" />
    </div>
  </li>
</template>

<script>
import TagList from './tags/TagList.vue'
export default {
  components: { TagList },
  props: {
    todo: {
      type: Object,
      default: () => ({
        id: -1,
        content: {
          title: '<i>dead inside</i>'
        }
      })
    },
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
