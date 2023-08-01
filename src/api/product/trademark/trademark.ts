// 品牌管理接口
import { ResponseData } from '@/api/common'
import { tradeMarkDate, recordsType } from './type'
import request from '@/utils/request'

enum API {
  // 获取品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 添加品牌接口
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌按钮
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETE_URL = '/admin/product/baseTrademark/remove',
}
// 请求品牌列表
export const reqTradMarkList = (page: number, limit: number) =>
  request.get<any, ResponseData<tradeMarkDate>>(
    API.TRADEMARK_URL + `/${page}/${limit}`,
  )

// 添加和修改品牌
export const addOrUpdate = (data: recordsType) => {
  if (data.id) {
    return request.put<any, ResponseData<null>>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    return request.post<any, ResponseData<null>>(API.ADD_TRADEMARK_URL, data)
  }
}

// 删除已有品牌
export const deleteTradeMark = (data: number) =>
  request.delete<any, ResponseData<null | string>>(API.DELETE_URL + `/${data}`)
