import request from '@/utils/request'
import type { loginForm, userInfoDataType } from './type'
import { ResponseData } from '../common'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USER_INFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口
export const reqLogin = (data: loginForm) =>
  request.post<any, ResponseData<string>>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, ResponseData<userInfoDataType>>(API.USER_INFO_URL)
// 退出登录
export const reqLogOut = (data: string) =>
  request.post<any, ResponseData<null>>(API.LOGOUT_URL, data)
