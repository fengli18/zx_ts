<template>
  <el-card>
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
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTradeMark(row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-popconfirm
            :title="`确定要删除${row.tmName}吗?`"
            @confirm="removeTradeMark(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
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
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogTitle"
    :before-close="beforeClose"
  >
    <el-form
      ref="formRef"
      label-width="80px"
      :inline="false"
      style="width: 80%"
      :model="addData"
      :rules="rules"
    >
      <el-form-item label="品牌名称" prop="tmName" label-width="100">
        <el-input
          placeholder="请输入名牌名称"
          v-model="addData.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100">
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
import {
  addOrUpdate,
  reqTradMarkList,
  deleteTradeMark,
} from '@/api/product/trademark/trademark'
import { recordsType, tradeMarkDate } from '@/api/product/trademark/type'
import { ResponseData } from '@/api/common'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Array<recordsType>>([])
let total = ref<number>()
let dialogTitle = ref<string>('')
// 新增品牌
let addData = reactive<recordsType>({
  tmName: '',
  logoUrl: '',
})
// 获取form实例
let formRef = ref()
// 控制对话框是否可见
let dialogFormVisible = ref<boolean>(false)
// 获取品牌列表信息
let trademark = async (page = 1) => {
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
  dialogTitle.value = '添加品牌'
  addData.tmName = ''
  addData.logoUrl = ''
}
// 当点击编辑按钮的时候触发的回调函数
const updateTradeMark = (row: recordsType) => {
  dialogFormVisible.value = true
  dialogTitle.value = '修改品牌'
  Object.assign(addData, row)
  // addData.logoUrl = row.logoUrl
  // addData.tmName = row.tmName
  // addData.id = row.id
}
// validatetmName校验tmName
const validatetmName = (rules, value: string, callBack) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称长度要大于等于2'))
  }
}
// 校验validatelogoUrl
const validatelogoUrl = (rules, value: string, callBack) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('请上传Logo图片'))
  }
}
// 对话框底部的取消的确定按钮触发的回调
const confirm = async () => {
  await formRef.value.validate()
  let result = await addOrUpdate(addData)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: addData.id ? '修改成功' : '添加成功',
    })
    trademark()
  } else {
    ElMessage({
      type: 'error',
      message: addData.id ? '修改失败' : '添加失败',
    })
  }
}
const cancel = () => {
  dialogFormVisible.value = false
  formRef.value.resetFields()
}
// 在对话框关闭前触发的回调
const beforeClose = () => {
  dialogFormVisible.value = false
  formRef.value.resetFields()
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
// 删除按钮
const removeTradeMark = async (id: number) => {
  // console.log(id)
  let res = await deleteTradeMark(id)
  // console.log(res)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    trademark(records.value.length >= 2 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  addData.logoUrl = response.data
  ElMessage({
    type: 'success',
    message: '添加图片成功',
  })
  formRef.value.clearValidate('logoUrl')
}
// 表单校验对象
const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatetmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validatelogoUrl,
    },
  ],
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
