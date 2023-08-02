<template>
  <el-card class="top_card">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="useCategoryStore.c1Id"
          @change="getC2"
          :disabled="scene == 1 ? true : false"
        >
          <el-option
            v-for="(c1, i1) in useCategoryStore.c1Arr"
            :key="i1"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="useCategoryStore.c2Id"
          @change="getC3"
          :disabled="scene == 1 ? true : false"
        >
          <el-option
            v-for="(c2, i2) in useCategoryStore.c2Arr"
            :key="i2"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="useCategoryStore.c3Id"
          :disabled="scene == 1 ? true : false"
        >
          <el-option
            v-for="(c3, i3) in useCategoryStore.c3Arr"
            :key="i3"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import categoryStore from '@/store/product_category/category'
let useCategoryStore = categoryStore()
const getC2 = () => {
  useCategoryStore.c2Arr = []
  useCategoryStore.c2Id = ''
  useCategoryStore.c3Arr = []
  useCategoryStore.c3Id = ''
  useCategoryStore.getC2()
}
const getC3 = () => {
  useCategoryStore.c3Arr = []
  useCategoryStore.c3Id = ''
  useCategoryStore.getC3()
}
// 接收父组件传递的值
defineProps(['scene'])
onMounted(() => {
  useCategoryStore.getC1()
})
</script>

<style scoped></style>
