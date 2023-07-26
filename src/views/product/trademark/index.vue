<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table border stripe :data="records">
      <el-table-column
        label="序号"
        width="80"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" align="center">
        <template #default="{ row }">
          {{ row.tmName }}
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #default="{ row }">
          <el-image
            :src="row.logoUrl"
            fit="fill"
            :lazy="true"
            style="width: 100px; height: 100px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[15, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total "
      :total="400"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqTradMarkList } from '@/api/product/trademark/trademark'
import { recordsType, tradeMarkDate } from '@/api/product/trademark/type'
import { ResponseData } from '@/api/common'
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Array<recordsType>>([])
// 获取品牌列表信息
let trademark = async () => {
  let result: ResponseData<tradeMarkDate> = await reqTradMarkList(
    pageNo.value,
    pageSize.value,
  )
  records.value = result.data.records
}

onMounted(() => {
  trademark()
})
</script>
<script lang="ts">
export default {
  name: 'TradeMark',
}
</script>
<style scoped lang="scss">
.el-table {
  margin: 10px 0;
}
</style>
