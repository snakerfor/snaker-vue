<template>
  <a-modal title="上传文件" style="top: 20px;" :width="900" v-model="visible" :confirmLoading="confirmLoading" :footer="null">
    <a-row type="flex" justify="space-around">
      <a-col :span="24" :show-overflow-tooltip="true">
        <uploader :options="options" :autoStart="true" :fileStatusText="{
          success: '上传成功',
          error: '上传失败',
          uploading: '正在上传',
          paused: '暂停上传',
          waiting: '等待上传'
        }" @file-success="onFileSuccess" @file-added="fileAdded" @file-error="onFileError" class="uploader-example">
          <uploader-unsupport></uploader-unsupport>
          <uploader-drop>
            <a-row>
              <a-col :md="11" :sm="15"></a-col>
              <a-col :md="6" :sm="15">
                <uploader-btn :attrs="attrs" single>
                  <a-icon type="upload" /> 选择文件
                </uploader-btn>
              </a-col>
            </a-row>
          </uploader-drop>
          <a-row>
            <uploader-list></uploader-list>
          </a-row>
        </uploader>
      </a-col>
    </a-row>
    <a-row type="flex" justify="start">
      <a-col :span="24">
        <span>
          <a style="color:red" @click="downErrInfo">{{ importDesc }} </a>
        </span>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { downloadError } from '@/utils/download'
export default {
  name: 'ImportBigFile',
  props: { result: { type: String, default: null } },
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
      headers: {
        token: Vue.ls.get(ACCESS_TOKEN)
      },
      options: {
        target: process.env.VUE_APP_API_BASE_URL + '/system/file/bigFileUpload',
        chunkSize: 5 * 1024 * 1024,
        testChunks: false,
        headers: {
          token: Vue.ls.get(ACCESS_TOKEN)
        },
        singleFile: true,
        query: {
          // module: 10
        },
        errorKey: ''
      },
      attrs: {
        accept: '*' // 接受文件类型
      }
    }
  },
  computed: {
    importDesc: function () {
      try {
        const res = JSON.parse(this.result)
        if (res.errRowCount === 0) {
          return '全部导入成功,共计' + res.successCount + '条'
        } else {
          return '成功导入' + res.successCount + '条数据，' + '有' + res.errRowCount + '条错误,可点击下载修改后重新导入'
        }
      } catch (e) {
        return this.result
      }
    },
    errorKey: function () {
      try {
        const res = JSON.parse(this.result)
        if (res.errRowCount > 0) {
          return res.errKey
        } else {
          return ''
        }
      } catch (e) {
        return ''
      }
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    show () {
      this.visible = true
    },
    // 大文件上传标签删除
    handleClose () {
      alert('handleClose')
    },
    // 大文件上传所需
    fileAdded (file) {
      // 选择文件后暂停文件上传，上传时手动启动
      // file.pause()
    },
    onFileError (file) {
      this.$message.error('上传失败!')
    },
    onFileSuccess (rootFile, file, response, chunk) {
      this.$emit('ok', response)
    },
    downErrInfo () {
      downloadError(this.errorKey)
    }
  }
}
</script>
