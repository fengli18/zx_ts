<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import useLayOutStore from '@/store/setting.ts'
import { watch, nextTick, ref } from 'vue'

let layOut = useLayOutStore()
let flag = ref(true)
watch(
  () => layOut.refresh,
  () => {
    // console.log(layOut.refresh)
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
