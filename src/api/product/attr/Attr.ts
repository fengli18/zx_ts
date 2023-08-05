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
  // 添加或者修改已有属性的接口
  ADD_OR_UPDATE = '/admin/product/saveAttrInfo',
  // 删除已有属性
  DELETE_ATTR = '/admin/product/deleteAttr',
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
// 获取商品基础属性接口
export const reqAttr = (
  id1: number | string,
  id2: number | string,
  id3: number | string,
) =>
  request.get<any, ResponseData<Attrs>>(API.ATTR_URL + `/${id1}/${id2}/${id3}`)
// 添加或者修改已有属性
export const reqAddOrUpdateArr = (data: Attrs) =>
  request.post<any, ResponseData<any>>(API.ADD_OR_UPDATE, data)
// 删除已有的属性
export const reqDeleteAttr = (attrId: number) =>
  request.delete<any, ResponseData<any>>(API.DELETE_ATTR + `/${attrId}`)
