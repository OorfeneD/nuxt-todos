<template>
  <div class="flex flex-row gap-1">
    <tag v-for="tagEntry, index in tags" :key="index" :title="tagEntry.title" :color="tagEntry.color" />
  </div>
</template>

<script>
import Tag from './Tag.vue'
export default {
  components: { Tag },
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
