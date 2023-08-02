import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/Attr'
import { ElMessage } from 'element-plus'
import type { AttrState } from './type'
const categoryStore = defineStore('category', {
  state: (): AttrState => {
    return {
      c1Arr: [],
      c1Id: '',
      c2Arr: [],
      c2Id: '',
      c3Arr: [],
      c3Id: '',
    }
  },
  actions: {
    // 获取分类1的信息
    async getC1() {
      let res = await reqC1()
      if (res.code == 200) {
        this.c1Arr = res.data
      } else {
        ElMessage({
          type: 'error',
          message: '获取一级分类信息失败',
        })
      }
    },
    // 获取分类2的信息
    async getC2() {
      let res = await reqC2(this.c1Id)
      if (res.code == 200) {
        this.c2Arr = res.data
      } else {
        ElMessage({
          type: 'error',
          message: '获取二级分类信息失败',
        })
      }
    },
    // 获取分类3的信息
    async getC3() {
      let res = await reqC3(this.c2Id)
      if (res.code == 200) {
        this.c3Arr = res.data
      } else {
        ElMessage({
          type: 'error',
          message: '获取三级分类信息失败',
        })
      }
    },
  },
  getters: {},
})
export default categoryStore
