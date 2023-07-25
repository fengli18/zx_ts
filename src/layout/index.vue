<template>
  <div class="container">
    <!-- 左侧导航 -->
    <div class="menu_left" :class="{ fold: useLayOut.fold ? true : false }">
      <!-- 左侧菜单的logo信息 -->
      <Logo></Logo>
      <!-- 左侧菜单的内容 -->
      <el-scrollbar class="scroller_bar">
        <el-menu
          background-color="#001529"
          text-color="white"
          :default-active="$route.path"
          :collapse="useLayOut.fold"
        >
          <Menu :menuList="useUserStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="menu_top" :class="{ fold: useLayOut.fold ? true : false }">
      <TopBar></TopBar>
    </div>
    <!-- 中间内容 -->
    <div class="menu_content" :class="{ fold: useLayOut.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './logo/menu/index.vue'
import userStore from '@/store/modules/user'
import Main from './main/index.vue'
import TopBar from './topbar/index.vue'
// 引入当前路由对象
import { useRoute } from 'vue-router'
import useLayOutStore from '../store/setting'
// 使用路由
let $route = useRoute()
// 用户数据仓库
let useUserStore = userStore()
// LayOut仓库
let useLayOut = useLayOutStore()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;

  .menu_left {
    width: $left-menu-width;
    height: 100vh;
    background-color: $left-menu-bkcolor;
    color: white;
    transition: all 0.3s;

    .scroller_bar {
      width: 100%;
      height: calc(100vh - $left-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $left-menu-minWidth;
    }
  }

  .menu_top {
    position: fixed;
    width: calc(100% - $left-menu-width);
    height: $top-tabbar-height;
    background-color: aqua;
    top: 0;
    left: $left-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $left-menu-minWidth);
      left: $left-menu-minWidth;
    }
  }

  .menu_content {
    position: absolute;
    left: $left-menu-width;
    top: $top-tabbar-height;
    width: calc(100% - $left-menu-width);
    height: calc(100vh - $top-tabbar-height);
    overflow: auto;
    padding: 20px;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $left-menu-minWidth);
      left: $left-menu-minWidth;
    }
  }
}
</style>
