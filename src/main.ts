import { createApp } from 'vue'
import App from './App.vue'
// 引入Element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// SVG
import 'virtual:svg-icons-register'
// import GlobalComponet from '@/components'
// 引入清除默认样式
import '@/style/style.scss'
import axios from 'axios'

axios({
  url: '/api/user/login',
  method: "post",
  data: {
    username: 'admin',
    password: '111111'
  }
})
// 获取Vue实例
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
// app.use(GlobalComponet)
app.mount('#app')
const env = import.meta.env
console.log(env)
