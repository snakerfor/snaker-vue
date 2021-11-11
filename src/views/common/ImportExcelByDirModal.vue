<template>
  <a-modal title="批量上传" style="top: 20px;" :width="800" v-model="visible" :confirmLoading="confirmLoading" @ok="handleSubmit">
    <div slot="footer">
      <a-button @click="handleSubmit">返回</a-button>
    </div>
    <a-form :form="form">
      <a-row type="flex" justify="space-around">
        <a-col :span="15" :show-overflow-tooltip="true">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="文件上传">
            <a-upload :fileList="fileList" :change="handleChange" :beforeUpload="beforeUpload" directory :showUploadList="false">
              <a-button>
                <a-icon type="upload" /> 选择文件夹
              </a-button>
            </a-upload> <br />
            <span v-if="fileList.length > 0 ">
              {{ uploading ? '正在上传...' : '' }}
            </span>
            <span>
              <a style="color:red" @click="downErrInfo">{{ importErrMsg }} </a>
            </span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div style="text-align:center">
      <span>
        操作提示：可下载<a @click="downImportTemplate">导入模板</a>，按照标准模板填写
      </span>
    </div>
  </a-modal>
</template>
<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { } from '@/api/rdds'
import { axios } from '@/utils/request'
import { downloadError } from '@/utils/download'
export default {
  name: 'ImportExcelByDirModal',
  // eslint-disable-next-line vue/require-default-prop
  props: { businessUploadUrl: String, businessDownloadPath: String },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      mdl: {},
      form: this.$form.createForm(this),
      downloadByurl: process.env.VUE_APP_API_BASE_URL + '/system/file/ftp/downloadByUrl?url=' + this.businessDownloadPath,
      downErrorUrl: process.env.VUE_APP_API_BASE_URL + '/system/common/error/',
      headers: {
        token: Vue.ls.get(ACCESS_TOKEN)
      },
      importErrMsg: '',
      errMsgFileName: '',
      fileList: [],
      dirName: '',
      fileCount: 0,
      uploading: false,
      uploadUrl: this.businessUploadUrl
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    handleChange (file) {
      console.log('file')
      console.log(file)
    },
    beforeUpload (file, fl) {
      if (file === fl[fl.length - 1]) {
        this.fileList = fl
        this.handleUploadDir()
      }
      return false
    },
    handleUploadDir () {
      const formData = new FormData()
      var index = 0
      this.fileList.forEach(file => {
        formData.append('file' + (index++), file)
      })
      this.uploading = true
      console.log(formData)
      axios({
        url: this.uploadUrl,
        method: 'post',
        data: formData
      }).then(res => {
        this.fileList = []
        if (res.code !== 0) {
          this.$message.error(res.msg)
          this.importErrMsg = ''
          this.errorKey = ''
        } else {
          if (res.errRowCount === 0) {
            this.$message.success('全部导入成功,共计' + res.successCount + '条')
            this.importErrMsg = ''
            this.errorKey = ''
          } else {
            this.importErrMsg = '成功导入' + res.successCount + '条数据，' + '有' + res.errRowCount + '条错误,可点击下载修改后重新导入'
            this.errorKey = res.errKey
          }
        }
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(() => {
        this.uploading = false
      }
      )
    },
    downErrInfo () {
      downloadError(this.errorKey)
    },
    downImportTemplate () {
      window.location.href = this.downloadByurl
    },
    show () {
      this.visible = true
      this.errorKey = ''
      this.importErrMsg = ''
    },
    handleSubmit (e) {
      this.$emit('ok')
      this.visible = false
    }
  }
}
</script>
