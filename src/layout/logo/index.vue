<template>
  <div class="logo">
    <img :src="settings.logoSrc" alt="Logo" />
    <p v-show="!layOut.fold">{{ settings.title }}</p>
  </div>
</template>

<script setup lang="ts">
import settings from '@/settings'
import useLayOutStore from '@/store/setting';

let layOut = useLayOutStore()
</script>
<script lang="ts">
export default {
  name: 'Logo'
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $left-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
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