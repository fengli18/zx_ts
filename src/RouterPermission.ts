import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import pinia from './store'
import userStore from './store/modules/user'
import settings from './settings'
import { ElNotification } from 'element-plus'

const user = userStore(pinia)
nprogress.configure({ showSpinner: false })
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = settings.title + to.meta.title
  nprogress.start()
  // 路由放行
  if (user.token) {
    // 判断token是否存在 若存在 判断去往的路径
    if (to.path == '/login') {
      next({ path: '/home' })
    } else {
      // 不是去login的页面 判断用户信息是否存在
      if (user.username) {
        // 存在
        next()
      } else {
        // 不存在 重新获取信息
        try {
          await user.userInfo()
          next()
        } catch (error) {
          ElNotification({
            type: 'error',
            message: error,
          })
          await user.logOut()
          next({ path: '/login' })
        }
      }
    }
  } else {
    // 未登录 跳转到登录
    if (to.path == '/login') {
      next()
    } else {
      ElNotification({
        type: 'error',
        message: '请先登录',
      })
      next({
        path: '/login',
        query: { redirect: to.path },
      })
    }
  }
}),
  // 全局后置守卫
  router.afterEach((to, from) => {
    nprogress.done()
  })
