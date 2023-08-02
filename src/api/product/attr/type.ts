// 三级分类选择的返回类型
export type AttrDataType = {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 属性的返回值类型
type ArrtValue = {
  id: number
  valueName: string
  attrId: number
}
// 每个属性值数组的类型
type AttrValueList = ArrtValue[]
// 定义Attr数据的返回类型
export type Attrs = {
  id: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValueList
}
