<template>
  <div class="tabbar_left">
    <!-- 左侧收缩按钮 -->
    <el-icon class="tabbar_left_icon">
      <component :is="layOutStore.fold ? 'Expand':'Fold' " @click="changeIcon"></component>
    </el-icon>
    <!-- 左侧面包屑信息 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="(item, index) in $route.matched" :key="index">
        <el-breadcrumb-item v-if="item.name != 'layout'" :to="item.path">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLayOutStore from '../../../store/setting'
// 导入路由
import { useRoute } from 'vue-router';
let layOutStore = useLayOutStore()
// 获取当前路由对象
let $route = useRoute()
// 当点击Icon时进行收缩的事件处理
let changeIcon = () => {
  layOutStore.fold = !layOutStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'TabbarLeft'
}
</script>

<style scoped lang="scss">
.tabbar_left {
  display: flex;
  align-items: center;
  margin-left: 20px;

  .tabbar_left_icon {
    margin-right: 10px;
  }
}
</style>