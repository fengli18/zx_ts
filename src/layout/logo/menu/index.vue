<template>
  <template v-for="(item, index) in menuList" :key="index">
    <!-- 判断一级路由 -->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-show="item.meta.show" @click="goRouter">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且子路由的个数为1 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item :index="item.children[0].path" v-show="item.children[0].meta.show" @click="goRouter">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 判断一级路由及二级或者更多 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu :index="item.path" v-show="item.meta.show">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menu-list="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
defineProps(['menuList'])
// 使用vueRouter
let $router = useRouter()
const goRouter = (vc) => {
  $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  name: 'Menu'
}
</script>
<style scoped></style>