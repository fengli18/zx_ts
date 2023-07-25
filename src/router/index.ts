import { createRouter, createWebHashHistory } from 'vue-router'
import { routerInfo } from './routers'
const router = createRouter({
  history: createWebHashHistory(),
  routes: routerInfo,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
