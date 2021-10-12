export default function ({ app, store }, inject) {
  try {
    inject('updateLocalStorage', (todos) => {
      window.localStorage.setItem('todos', JSON.stringify(todos))
    })
    window.addEventListener('storage', (event) => {
      if (event.key === 'todos') {
        if (window.localStorage !== event.newValue) {
          if (event.storageArea === window.localStorage) {
            store.dispatch('setTodos', JSON.parse(event.newValue))
          }
        }
      }
    })
    const lsJson = window.localStorage.getItem('todos')
    if (lsJson) {
      store.dispatch('setTodos', JSON.parse(lsJson))
    }
  } catch (error) {
    // console.log(error)
  }
}
