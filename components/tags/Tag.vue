<template>
  <span
    class="p-1 text-xs rounded-lg shadow-sm hover:shadow-md cursor-pointer transition pl-2 border border-l-4"
    :style="`border-left-color: ${color}`"
    @click="$emit('click', $event)"
  >
    {{ title }}
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'empty'
    },
    color: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style>

</style>
