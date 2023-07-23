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
// 注册路由
import router from './router'
// 注册pinia
import pinia from './store'
// 获取Vue实例
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(pinia)
app.mount('#app')
