import request from "@/utils/request";
import type { loginForm, loginResponseData, userResponseData } from './type';

enum API {
  LOGIN_URL = "/user/login",
  USER_INFO_URL = "/user/info"
}

//登录接口
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息

export const reqUserInfo = () => request.get<any, userResponseData>(API.USER_INFO_URL)