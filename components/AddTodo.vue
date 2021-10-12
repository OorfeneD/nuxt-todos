<template>
  <form class="flex w-full justify-between align-middle" @submit.prevent="addTodo">
    <input v-model="title" class="focus:shadow-inner transition shadow-xs focus:outline-none border border-gray-200 text-gray-600 px-3 py-2 rounded-md flex-grow mr-2" type="text" placeholder="todo title ...">
    <button class="hover:bg-indigo-500 text-gray-600 hover:text-white transition px-2 py-2 border border-gray-200 rounded-md hover:shadow-sm">
      Add
    </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    addTodo (event) {
      this.$emit('addtodo', { content: { title: this.title } })
      this.title = ''
    }
  }
}
</script>

<style>

</style>
