// 品牌管理接口
import { ResponseData } from '@/api/common'
import { tradeMarkDate } from './type'
import request from '@/utils/request'

enum API {
  // 获取品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark',
}
export const reqTradMarkList = (page: number, limit: number) =>
  request.get<any, ResponseData<tradeMarkDate>>(
    API.TRADEMARK_URL + `/${page}/${limit}`,
  )
