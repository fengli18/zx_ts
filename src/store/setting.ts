import { defineStore } from 'pinia'

const useLayOutStore = defineStore('LayOut', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
  actions: {
    changeRefresh() {
      this.refresh = !this.refresh
    },
  },
})

export default useLayOutStore
