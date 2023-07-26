import { defineStore } from 'pinia'
import { ResponseData, loginForm, userInfoDataType } from '@/api/user/type'
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user'
import type { userState } from './types/type'
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from '@/utils/token'
import { routerInfo } from '@/router/routers'
import { ElNotification } from 'element-plus'
const userStore = defineStore('User', {
  state: () => {
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
      const result:ResponseData<string> = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return Promise.resolve('ok')
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息
    async userInfo() {
      let res:ResponseData<userInfoDataType> = await reqUserInfo()
      // console.log(res)
      if (res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        return Promise.resolve('ok')
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    // 退出登录
    async logOut() {
      let result = await reqLogOut(this.token as string)
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        DEL_TOKEN()
        ElNotification({
          type: 'success',
          message: '退出登录成功'
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  getters: {},
})
export default userStore
