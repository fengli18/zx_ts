<template>
  <div class="login_box">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到登录界面</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import userStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import { getTime } from '@/utils/time'
import type { loginForm } from '@/api/user/type';
// 用户仓库
let useStore = userStore()
// 使用路由器和路由对象
let $route = useRoute()
let $router = useRouter()
// 控制登录的加载状态
let loading = ref(false)
// 获取表单ref
let loginForms = ref()
// 登录表单信息
let loginForm = reactive<loginForm>({
  username: 'admin',
  password: 'atguigu123'
})
// 表单验证对象
let rules = reactive(
  {
    username: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 6,
        message: '用户名长度为3-6位',
        trigger: 'blur'
      },
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        message: '用户名长度最少6位',
        trigger: 'blur'
      }
    ]
  }
)
// 登录请求
let login = async () => {
  // 获取对表单的校验结果
  let formValidate = loginForms.value
  await formValidate.validate()
  // 校验通过就执行
  try {
    // 开始加载
    loading.value = true
    // await默认是成功的
    let suc = await useStore.userLogin(loginForm)
    ElNotification({
      title: `Hi,${getTime()}`,
      type: 'success',
      message: suc
    })
    // 判断是从哪里退出的
    let $query = $route.query.redirect as string
    if ($query) {
      $router.push({
        path: $query
      })
    } else {
      $router.push({
        path: '/home'
      })
    }
  } catch (err) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: err.message
    })
  } finally {
    loading.value = false
  }
}
console.log(getTime())
</script>

<style scoped lang="scss">
.login_box {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    width: 80%;
    position: relative;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>