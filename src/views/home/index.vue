<template>
  <div>
    <h1>我是一级路由家</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import userStore from '@/store/modules/user';
let user = userStore()
onMounted(() => {
  user.userInfo()
})
</script>

<style scoped></style>