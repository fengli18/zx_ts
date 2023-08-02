<template>
  <!-- 三级分类 -->
  <ProductSelect :scene="scene"></ProductSelect>
  <el-card class="bottom_card">
    <div v-show="scene === 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="useCategoryStore.c3Id ? false : true"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border stripe class="bottom_table" :data="attrData">
        <el-table-column
          label="序号"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          align="center"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #default="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="(item, index) in row.attrValueList"
              :key="index"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button
              icon="Edit"
              type="primary"
              @click="updateAttr"
            ></el-button>
            <el-button icon="Delete" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene === 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" icon="Plus">添加</el-button>
      <el-button type="default" size="default" @click="cancelAdd">
        取消
      </el-button>
      <el-table border stripe style="margin: 10px 0">
        <el-table-column
          align="center"
          type="index"
          label="序号"
        ></el-table-column>
        <el-table-column align="center" label="属性值"></el-table-column>
        <el-table-column align="center" label="操作"></el-table-column>
      </el-table>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="default" size="default" @click="cancelAdd">
        取消
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr/Attr'
import ProductSelect from '@/components/ProductSelect/ProductSelect.vue'
import categoryStore from '@/store/product_category/category'
import { ref, watch } from 'vue'
import { Attrs } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
const useCategoryStore = categoryStore()
let attrData = ref<Attrs[]>([])
// 控制页面的变化 比如点击添加属性变为添加的页面
let scene = ref<number>(0)
// 获取属性值信息
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = useCategoryStore
  // console.log(c1Id, c2Id, c3Id)
  attrData.value = []
  let res = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code == 200) {
    attrData.value = res.data
  } else {
    ElMessage({
      type: 'error',
      message: '获取属性信息失败',
    })
  }
}
// 添加属性按钮触发的回调
const addAttr = () => {
  scene.value = 1
}
// 点击修改按钮触发的回调
const updateAttr = () => {
  scene.value = 1
}
// 取消按钮的回调
const cancelAdd = () => {
  scene.value = 0
}
// 对c3Id进行监听
watch(
  () => useCategoryStore.c3Id,
  () => {
    if (!useCategoryStore.c3Id) return
    getAttr()
  },
)
</script>
<script lang="ts">
export default {
  name: 'Attr',
}
</script>
<style scoped lang="scss">
.bottom_card {
  margin: 20px 0;
  .bottom_table {
    margin: 20px 0;
  }
}
</style>
