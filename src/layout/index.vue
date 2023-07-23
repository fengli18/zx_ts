<template>
  <div class="container">
    <!-- 左侧导航 -->
    <div class="menu_left">
      <!-- 左侧菜单的logo信息 -->
      <Logo></Logo>
      <!-- 左侧菜单的内容 -->
      <el-scrollbar class="scroller_bar">
        <el-menu background-color="#001529" text-color="white">
          <!-- <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item>
          <el-sub-menu index="3">
            <template #title>权限管理</template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu> -->
          <Menu></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="menu_top">456</div>
    <!-- 中间内容 -->
    <div class="menu_content">
      <p style="height: 10000px;">我是一盒</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './logo/menu/index.vue'
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

    .scroller_bar {
      width: 100%;
      height: calc(100vh - $left-logo-height);
    }
  }

  .menu_top {
    position: fixed;
    width: calc(100% - $left-menu-width);
    height: $top-tabbar-height;
    background-color: aqua;
    top: 0;
    left: $left-menu-width;
  }

  .menu_content {
    position: absolute;
    left: $left-menu-width;
    top: $top-tabbar-height;
    width: calc(100% - $left-menu-width);
    height: calc(100vh - $top-tabbar-height);
    overflow: auto;
    padding: 20px;
  }
}
</style>