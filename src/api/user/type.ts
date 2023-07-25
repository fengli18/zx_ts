// 定义登录的数据类型
export interface loginForm {
  username: string
  password: string
}
// 定义登录返回的数据类型
interface dataType {
  token?: string
  message?: string
}
export interface loginResponseData {
  code: number
  data: dataType
}

// 定义用户信息返回类型
interface userInfo {
  userId: number
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userInfo
}
export interface userResponseData {
  code: number
  data: user
}
