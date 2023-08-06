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
        <!-- 哈哈哈 -->
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
              @click="updateAttr(row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-popconfirm
              :title="`你确定要删除${row.attrName}吗?`"
              @confirm="removeAttr(row)"
            >
              <template #reference>
                <el-button icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 点击添加属性后的页面 -->
    <div v-show="scene === 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addAttrInPage"
      >
        添加
      </el-button>
      <el-button type="default" size="default" @click="cancelAdd">
        取消
      </el-button>
      <!-- 添加属性值的表格 -->
      <el-table
        border
        stripe
        style="margin: 10px 0"
        :data="attrParams.attrValueList"
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
        ></el-table-column>
        <el-table-column align="center" label="属性值">
          <template #default="{ row, $index }">
            <el-input
              v-model="row.valueName"
              placeholder="请输入属性值"
              clearable
              v-if="row.flag"
              @blur="inputBlur(row, $index)"
              :ref="(vc) => (inputArr[$index] = vc)"
            ></el-input>
            <div v-else @click="toView(row, $index)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="{ $index }">
            <el-button
              type="danger"
              icon="Delete"
              @click="attrParams.attrValueList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="saveAttr">
        保存
      </el-button>
      <el-button type="default" size="default" @click="cancelAdd">
        取消
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {
  reqAttr,
  reqAddOrUpdateArr,
  reqDeleteAttr,
} from '@/api/product/attr/Attr'
import ProductSelect from '@/components/ProductSelect/ProductSelect.vue'
import categoryStore from '@/store/product_category/category'
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import type { Attrs, ArrtValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'

const useCategoryStore = categoryStore()
// input实例
let inputArr = ref([])
let attrData = ref<Attrs[]>([])
// 控制页面的变化 比如点击添加属性变为添加的页面
let scene = ref<number>(0)
// 收集新增属性的信息
let attrParams: Attrs = reactive({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
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
// 当添加属性的输入框失去焦点的时候编程展示模式
/* const changeView = () => {
  flag.value = false
} */
// 添加属性按钮触发的回调
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
  scene.value = 1
  attrParams.categoryId = useCategoryStore.c3Id
}
// 点击修改按钮触发的回调
const updateAttr = (row: Attrs) => {
  // console.log(row)
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  scene.value = 1
}
// 取消按钮的回调
const cancelAdd = () => {
  scene.value = 0
}
// 在添加属性页面点击添加的回调
const addAttrInPage = () => {
  let push: ArrtValue = {
    valueName: '',
    flag: true,
  }
  attrParams.attrValueList.push(push)
  // 当点击添加属性的按钮时 自动聚焦到最后一个输入框
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
// 属性值保存按钮的回调函数
const saveAttr = async () => {
  if (attrParams.attrValueList.length <= 0) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let res = await reqAddOrUpdateArr(attrParams)
  if (res.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
// 添加属性的输入框失去焦点的时候触发
const inputBlur = (row: ArrtValue, $index: number) => {
  // 属性值为空
  if (row.valueName.trim() == '') {
    // 删除多出来的空值
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 属性值重复
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName == row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}
// 从视图模式切换为编辑模式
const toView = (row: ArrtValue, $index: number) => {
  row.flag = true
  // 获取更新后的组件实例或者dom
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
// 当点击删除按钮的时候进行删除属性
const removeAttr = async (row: Attrs) => {
  let res = await reqDeleteAttr(row.id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// 对c3Id进行监听
watch(
  () => useCategoryStore.c3Id,
  () => {
    if (!useCategoryStore.c3Id) return
    getAttr()
  },
)
// 路由销毁时 清空pinia仓库的数据
onBeforeUnmount(() => {
  useCategoryStore.$reset()
})
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
