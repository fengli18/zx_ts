import { defineStore } from "pinia";
import { loginForm, loginResponseData } from '@/api/user/type'
import { reqLogin } from "@/api/user";
import { userState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";
import { routerInfo } from "@/router/routers";
let userStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: routerInfo // 仓库存储生成菜单
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token
        SET_TOKEN(result.data.token)
        return Promise.resolve('ok')
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    }
  },
  getters: {

  }
})
export default userStore