<template>
  <div class="tabbar_right">
    <el-button size="small" circle icon="Refresh" @click="refresh"></el-button>
    <!-- 刷新按钮 -->
    <el-button size="small" circle icon="FullScreen" @click="fullScreen"></el-button>
    <el-button size="small" circle icon="Setting"></el-button>
    <!-- 用户头像 -->
    <el-image :src="user.avatar" fit="fill" loading="lazy"></el-image>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ user.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayOutStore from '@/store/setting.ts'
import userStore from '@/store/modules/user';
import { useRouter,useRoute } from 'vue-router';
// 使用用户仓库
let user = userStore()
let layOutStore = useLayOutStore()
// 使用路由器
let $router = useRouter()
let $route = useRoute()
// 刷新页面按钮
const refresh = () => {
  layOutStore.refresh = !layOutStore.refresh
}
// 全面模式回调
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    // 不是全屏模式 切换全屏
    document.documentElement.requestFullscreen()
  } else {
    // 如果是全屏 则退出全屏模式
    document.exitFullscreen()
  }
}
// 退出登录回调
const logout = () => {
  user.$reset()
  user.logOut()
  $router.push({
    path: '/login',
    query: {
      redirect: $route.path
    }
  })
}
</script>
<script lang="ts">
export default {
  name: 'TabbarRight',
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
    border-radius: 50%;
  }
}
</style>
