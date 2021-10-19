import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { firebaseConfig } from '@/service/options' // Need to be defined. File is untracked now

export default function ({ app, store }, inject) {
  initializeApp(firebaseConfig)
  const firebaseAuth = getAuth()
  try {
    inject('fireauth', {
      signup: (un, pw) => {
        createUserWithEmailAndPassword(firebaseAuth, un, pw)
          .then((userCredential) => {
            const user = userCredential.user
            store.dispatch('user/setUser', user)
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            // TODO: remove console
            console.error(`[${errorCode}]: ${errorMessage}`) // eslint-disable-line
          })
      },
      signin: (un, pw) => {
        signInWithEmailAndPassword(firebaseAuth, un, pw)
          .then((userCredential) => {
            const user = userCredential.user
            store.dispatch('user/setUser', user)
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            // TODO: remove console
            console.error(`[${errorCode}]: ${errorMessage}`) // eslint-disable-line
          })
      },
      signout: () => {
        signOut(firebaseAuth).then(() => {
          store.dispatch('user/resetUser')
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          // TODO: remove console
          console.error(`[${errorCode}]: ${errorMessage}`) // eslint-disable-line
        })
      }
    })
  } catch (error) {
    //
  }
}
