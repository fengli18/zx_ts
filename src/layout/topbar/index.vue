<template>
  <div class="tabbar">
    <TabbarLeft></TabbarLeft>
    <TabbarRight></TabbarRight>
  </div>
</template>

<script setup lang="ts">
import TabbarLeft from './tabbar_left/index.vue'
import TabbarRight from './tabbar_right/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar'
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>