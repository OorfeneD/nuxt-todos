<template>
  <div class="p-4 bg-white rounded-xl shadow-md my-5 border border-gray-100 w-96 ">
    <header class="flex justify-between border-b border-gray-200 pb-2 mb-4">
      <p><b>Sign in</b> with e-mail and password</p>
      <button @click.prevent="$emit('close', $event)">
        <icon close />
      </button>
    </header>
    <form class="" action="post" @submit.prevent="proceed">
      <div>
        <label class="text-sm underline block" for="fir">E-mail:</label>
        <input id="fir" v-model="fir" class="mb-4 w-full focus:shadow-inner transition shadow-xs focus:outline-none border border-gray-200 text-gray-600 px-3 py-2 rounded-md flex-grow " type="text" name="fir">
      </div>
      <div>
        <label class="text-sm underline block" for="sec">Password:</label>
        <input id="sec" v-model="sec" class="mb-4 w-full focus:shadow-inner transition shadow-xs focus:outline-none border border-gray-200 text-gray-600 px-3 py-2 rounded-md flex-grow " type="password" name="sec">
      </div>
      <div>
        <button class=" hover:bg-indigo-500 text-gray-600 hover:text-white transition px-2 py-2 border border-gray-200 rounded-md hover:shadow-sm">
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  components: { Icon },
  data: () => ({
    fir: '',
    sec: ''
  }),
  methods: {
    proceed (event) {
      try {
        this.$emit('submit', { data: [this.fir, this.sec], originalEvent: event })
        // this.$fireauth.signup(this.fir, this.sec)
      } catch (error) {
        // TODO: remove console
        console.error(error) // eslint-disable-line
      }
    }
  }
}
</script>

<style>

</style>
