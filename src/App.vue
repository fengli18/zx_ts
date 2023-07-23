<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
request({
  url: '/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111'
  }
})
</script>

<style scoped lang="scss"></style>
