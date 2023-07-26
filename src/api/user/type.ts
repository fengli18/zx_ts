// 定义登录的数据类型
export interface loginForm {
  username: string
  password: string
}
// 定义用户信息返回类型
export interface userInfoDataType {
  roles?: string[]
  buttons?: string[]
  routes?: string[]
  avatar?: string
  name?: string
}
