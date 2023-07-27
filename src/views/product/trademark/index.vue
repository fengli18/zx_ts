<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus" @click="addTradMark">
      添加品牌
    </el-button>
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
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </el-card>

  <!-- 添加品牌对话框 -->
  <el-dialog v-model="dialogFormVisible" title="添加品牌">
    <el-form ref="form" label-width="80px" :inline="false" style="width: 80%">
      <el-form-item label="品牌名称">
        <el-input
          placeholder="请输入名牌名称"
          v-model="addData.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO">
        <!-- action为上传的服务器接口地址 -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="addData.logoUrl" :src="addData.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 对话框底部的按钮 -->
    <template #footer>
      <el-button type="default" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { addOrUpdate, reqTradMarkList } from '@/api/product/trademark/trademark'
import { recordsType, tradeMarkDate } from '@/api/product/trademark/type'
import { ResponseData } from '@/api/common'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Array<recordsType>>([])
let total = ref<number>()
// 新增品牌
let addData = reactive<recordsType>({
  tmName: '',
  logoUrl: '',
})
// 控制对话框是否可见
let dialogFormVisible = ref<boolean>(false)
// 获取品牌列表信息
let trademark = async () => {
  let result: ResponseData<tradeMarkDate> = await reqTradMarkList(
    pageNo.value,
    pageSize.value,
  )
  records.value = result.data.records
  total.value = result.data.total
}
// 页码发生变化的自定义事件
const currentChange = () => {
  trademark()
}

// 当Pagesize变化时触发
const sizeChange = () => {
  pageNo.value = 1
  trademark()
}
// 当点击添加品牌触发的事件
const addTradMark = () => {
  dialogFormVisible.value = true
  addData.tmName = ''
  addData.logoUrl = ''
}
// 对话框底部的取消的确定按钮触发的回调
const confirm = async () => {
  let result = await addOrUpdate(addData)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    trademark()
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
  }
}
const cancel = () => {
  dialogFormVisible.value = false
}
// 上传图片之前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 约束文件上传的大小和类型
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage.error('图片大小不能大于4M')
      return false
    }
  } else {
    ElMessage.error('图片只支持JPG、PNG、GIF格式')
    return false
  }
  return true
}
// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  addData.logoUrl = response.data
  ElMessage({
    type: 'success',
    message: '添加图片成功',
  })
}

onMounted(async () => {
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

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
