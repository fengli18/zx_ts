import axios from "axios";
import { ElMessage } from "element-plus";
const url: string = "/api"
// 获取axios实例
let request = axios.create({
  baseURL: url,
  timeout: 5000
})

request.interceptors.request.use((config) => {
  return config
})


request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let msg: string = '';
    switch (error.response.status) {
      case 401:
        msg = "token过期";
        break;
      case 403:
        msg = '无权访问';
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现问题";
        break;
      default:
        msg = "无网络";
    }

    ElMessage({
      type: 'error',
      message: msg
    })

    return Promise.reject(error)
  }
)

export default request
