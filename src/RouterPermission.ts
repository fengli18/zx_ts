import router from "./router";
import nprogress from "nprogress"
import 'nprogress/nprogress.css'
import userStore from "./store/modules/user";
import pinia from "./store";
let user = userStore(pinia)
console.log(user)
// 全局前置
router.beforeEach((to, form, next) => {
  nprogress.start()
  // 路由放行
  if (user.token) {
    
  }else {
    if (to.path == '/login') {
      next()
    }else{
      next({
        path: '/login',
        query: {redirect:to.path}
      })
    }
  }
}),
// 全局后置
router.afterEach((to, from) => {
  nprogress.done()
})
