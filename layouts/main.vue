<template>
  <div>
    <header class="absolute w-full px-5 py-3 flex justify-between items-center">
      <div class=" font-bold text-xl text-purple-800 flex">
        <!-- <icon class="mr-2" note />  od-o-todo -->
      </div>
      <div v-if="isLoggedIn" class="flex flex-row items-center gap-2">
        <p class="text-sm">
          You are logged in as <span class="text-gray-800 underline font">{{ user.email }}</span>
        </p>
        <button class="border border-gray-100 font-thin px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white transition" @click="logoutClick">
          Log out
        </button>
      </div>
      <div v-else>
        <button class="border border-gray-100 font-thin px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white transition" @click="showModal('signup')">
          Sign Up
        </button>
        <button class="border border-gray-100 font-thin px-3 py-1 rounded-md hover:bg-indigo-500 hover:text-white transition" @click="showModal('signin')">
          Sign In
        </button>
      </div>
    </header>
    <Nuxt />
    <div v-if="modalShow" id="modal-bg" class="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center" @click="modalBGClick">
      <sign-up-modal v-if="modalType === 'signup'" class="blur-0" @submit="proceedSignUp" @click.stop="" @close="modalShow = false" />
      <sign-in-modal v-if="modalType === 'signin'" class="blur-0" @submit="proceedSignIn" @click.stop="" @close="modalShow = false" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SignInModal from '~/components/modal/SignInModal.vue'
import SignUpModal from '~/components/modal/SignUpModal.vue'
export default {
  components: { SignUpModal, SignInModal },
  data: () => ({
    modalShow: false,
    modalType: 'signin',
    allowedModal: [
      'signin',
      'signup'
    ]
  }),
  computed: {
    ...mapGetters('user', ['user', 'token', 'isLoggedIn'])
  },
  created () {
    this.$nuxt.$on('modalshow', (type) => {
      this.showModal(type)
    })
  },
  methods: {
    ...mapActions('user', ['setUser']),
    modalBGClick (event) {
      if (event.target.id === 'modal-bg') {
        this.modalShow = false
      }
    },
    showModal (modalType) {
      if (this.allowedModal.includes(modalType)) {
        this.modalType = modalType
        this.modalShow = true
      }
    },
    proceedSignUp (event) {
      try {
        this.$fireauth.signup(event.data[0], event.data[1])
        this.modalShow = false
      } catch (error) {

      }
    },
    proceedSignIn (event) {
      try {
        this.$fireauth.signin(event.data[0], event.data[1])
        this.modalShow = false
      } catch (error) {

      }
    },
    logoutClick () {
      try {
        this.$fireauth.signout()
      } catch (error) {

      }
    }
  }
}
</script>

<style>

</style>
