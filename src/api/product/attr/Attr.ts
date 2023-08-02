import request from '@/utils/request'
import type { ResponseData } from '@/api/common'
import type { AttrDataType, Attrs } from './type'

enum API {
  // 分类1的接口
  C1_URL = '/admin/product/getCategory1',
  // 分类2的接口
  C2_URL = '/admin/product/getCategory2',
  // 分类3的接口
  C3_URL = '/admin/product/getCategory3',
  // 获取商品基础属性接口
  ATTR_URL = '/admin/product/attrInfoList',
}
// 获取一级分类
export const reqC1 = () =>
  request.get<any, ResponseData<AttrDataType>>(API.C1_URL)
// 获取二级分类
export const reqC2 = (id1: number | string) =>
  request.get<any, ResponseData<AttrDataType>>(API.C2_URL + `/${id1}`)
// 获取三级分类
export const reqC3 = (id2: number | string) =>
  request.get<any, ResponseData<AttrDataType>>(API.C3_URL + `/${id2}`)
export const reqAttr = (
  id1: number | string,
  id2: number | string,
  id3: number | string,
) =>
  request.get<any, ResponseData<Attrs>>(API.ATTR_URL + `/${id1}/${id2}/${id3}`)
