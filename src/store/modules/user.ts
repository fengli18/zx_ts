import { defineStore } from 'pinia'
import { loginForm, loginResponseData } from '@/api/user/type'
import { reqLogin, reqUserInfo } from '@/api/user'
import { userState } from './types/type'
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from '@/utils/token'
import { routerInfo } from '@/router/routers'
const userStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: routerInfo, // 仓库存储生成菜单
      username: '',
      avatar: ''
    }
  },
  actions: {
    // 用户登录方法
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token
        SET_TOKEN(result.data.token)
        return Promise.resolve('ok')
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      let res = await reqUserInfo()
      console.log(res)
      if (res.code === 200) {
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
      }
    },
    // 退出登录
    logOut(){
      this.token = ''
      this.username = ''
      this.avatar = ''
      DEL_TOKEN()
    }
  },
  getters: {},
})
export default userStore
