<template>
  <ProductSelect></ProductSelect>
  <el-card class="bottom_card">
    <el-button type="primary" icon="Plus">添加属性</el-button>
    <el-table border stripe class="bottom_table">
      <el-table-column
        label="序号"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="属性名称" align="center"></el-table-column>
      <el-table-column label="属性值名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import ProductSelect from '@/components/ProductSelect/ProductSelect.vue'
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
