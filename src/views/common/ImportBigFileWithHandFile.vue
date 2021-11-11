<style lang="less" scoped>
.loading-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #ffffff96;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <a-modal title="上传文件" style="top: 20px;" :width="900" v-model="visible" :confirmLoading="confirmLoading" :footer="null">
    <div v-show="loadingmask" class="loading-mask">
      <a-spin size="large" style="position:absolute;top:100px" :tip="loadingTip" />
    </div>
    <a-row type="flex" justify="space-around">
      <a-col :span="24" :show-overflow-tooltip="true">
        <uploader :key="uploaderKey" :options="options" :autoStart="true" :fileStatusText="{
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
    <a-result v-if="handOverFlag" :status="resultStatus" :title="resultTitle" :sub-title="resultSubTitle">
      <template #extra>
        <a-button key="console" type="primary" @click="noShow">
          我知道了!
        </a-button>
      </template>
    </a-result>
  </a-modal>
</template>
<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { getSysProcessApi, handBigFileApi } from '@/api/system'
import { sleep } from '@/utils/util'
export default {
  name: 'ImportBigFileWithHandFile',
  // eslint-disable-next-line vue/require-default-prop
  props: {},
  data () {
    return {
      // 这个用来刷新组件--解决不刷新页面连续上传的缓存上传数据（注：每次上传时，强制这个值进行更改---根据自己的实际情况重新赋值）
      uploaderKey: null,
      sysProcessTypeEnum: null,
      resultStatus: null,
      resultTitle: null,
      resultSubTitle: null,
      handOverFlag: false,
      visible: false,
      loadingmask: false,
      loadingTip: null,
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
        }
      },
      attrs: {
        accept: '*' // 接受文件类型
      }
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    show (sysProcessTypeEnum) {
      if (!sysProcessTypeEnum) {
        alert('sysProcessTypeEnum参数缺失')
        return
      }
      this.uploaderKey = new Date().getTime()
      this.sysProcessTypeEnum = sysProcessTypeEnum
      this.handOverFlag = false
      // success warning
      this.resultStatus = null
      this.resultTitle = null
      this.resultSubTitle = null
      this.loadingmask = false
      this.loadingTip = null
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
      this.handOverFlag = false
    },
    onFileError (file) {
      this.$message.error('上传失败!')
    },
    onFileSuccess (rootFile, file, response, chunk) {
      this.hasUploadFlag = true
      this.loadingTip = '原文件成功上传至服务器,正在解析该文件,耗时较长,请耐心等待.....'
      this.loadingmask = true
      handBigFileApi({ zipPath: response, sysProcessTypeEnumStr: this.sysProcessTypeEnum }).then(res => {
        if (res.code === 0) {
          this.getSysProcess(res.data.id)
        } else {
          this.loadingmask = false
          this.resultStatus = 'warning'
          this.resultTitle = '导入失败'
          this.resultSubTitle = res.msg + ',请联系软件开发人员获取问题详情及解决方案!'
          this.handOverFlag = true
        }
      }).catch(() => {
        this.loadingmask = false
        this.$message.error('系统错误，请稍后再试')
      })
    },
    getSysProcess (sysProcessId) {
      sleep(3000)
      getSysProcessApi(sysProcessId).then(res => {
        if (res.code === 0) {
          var processStatus = res.data.processStatus
          if (processStatus === 'SUCCESS') {
            this.loadingmask = false
            this.resultStatus = 'success'
            this.resultTitle = '导入成功'
            this.resultSubTitle = null
            this.handOverFlag = true
          } else if (processStatus === 'FAIL') {
            this.loadingmask = false
            this.resultStatus = 'warning'
            this.resultTitle = '部分文件导入失败'
            this.resultSubTitle = res.data.processData + '请联系软件开发人员获取问题详情及解决方案!'
            this.handOverFlag = true
          } else {
            this.getSysProcess(res.data.id)
          }
        } else {
          this.loadingmask = false
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(JSON.stringify(err))
        this.loadingmask = false
        this.$message.error(err.msg)
      })
    },
    noShow () {
      this.$emit('ok')
      this.visible = false
    }
  }
}
</script>
