<template>
  <div class="tabbar_right">
    <el-button size="small" circle icon="Refresh"></el-button>
    <el-button size="small" circle icon="FullScreen"></el-button>
    <el-button size="small" circle icon="Setting"></el-button>
    <!-- 用户头像 -->
    <el-image src="/public/logo.png" fit="fill" loading="lazy"></el-image>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        Admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name: 'TabbarRight'
}
</script>

<style scoped lang="scss">
.tabbar_right {
  display: flex;
  // 垂直居中
  align-items: center;

  .el-image {
    width: 24px;
    height: 24px;
    margin: 0 10px;
  }
}
</style>