import { defineStore } from "pinia";

let useLayOutStore = defineStore('LayOut', {
  state: () => {
    return {
      fold: false
    }
  }
})

export default useLayOutStore