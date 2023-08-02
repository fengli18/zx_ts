import type { AttrDataType } from '@/api/product/attr/type'

export type AttrState = {
  c1Id: number | string
  c1Arr: Array<AttrDataType>
  c2Arr: Array<AttrDataType>
  c2Id: number | string
  c3Arr: Array<AttrDataType>
  c3Id: number | string
}
