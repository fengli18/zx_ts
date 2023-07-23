<template>
  <div class="logo">
    <img :src="settings.logoSrc" alt="Logo" />
    <p>{{ settings.title }}</p>
  </div>
</template>

<script setup lang="ts">
import settings from '@/settings'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $left-logo-height;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: 24px;
    margin-left: 20px;
  }
}
</style>