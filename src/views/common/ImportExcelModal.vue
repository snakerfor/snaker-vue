<template>
  <a-modal title="批量导入" style="top: 20px;" :width="800" v-model="visible" :confirmLoading="confirmLoading" @ok="handleSubmit">
    <div slot="footer">
      <a-button @click="handleSubmit">返回</a-button>
    </div>
    <div>
      <a-upload-dragger :multiple="true" :action="uploadUrl" @change="handleChange" @reject="reject" :accept="accept" :showUploadList="false" :headers="headers">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p>将文件拖到此处，或<a>点击上传</a></p>
      </a-upload-dragger>
    </div>
    <div style="margin-top:5px">
      <a-table rowKey="uid" :key="tableKey" size="small" :locale="locale" :pagination="false" :showHeader="false" :columns="columns" :data-source="fileList">
        <span slot="result" slot-scope="text,record">
          <a v-if="record.response && record.response.code === 0" style="color:green">上传成功</a>
          <a v-else style="color:red">上传失败</a>
        </span>
        <span slot="message" slot-scope="text,record">
          <a v-if="record.response && record.response.code === 0 && record.response.errRowCount === 0" style="color:green">
            全部导入成功,共计{{ record.response.successCount }}条</a>
          <a v-if="record.response && record.response.code === 0 && record.response.errRowCount > 0" @click="downErrInfo(record.response.errKey)" style="color:red">
            成功导入{{ record.response.successCount }}条数据，有{{ record.response.errRowCount }}条错误,可点击下载修改后重新导入</a>
        </span>
      </a-table>
    </div>
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
import { downloadError, downloadTemplate } from '@/utils/download'
export default {
  name: 'ImportExcelModal',
  // eslint-disable-next-line vue/require-default-prop
  props: {
    businessUploadUrl: {
      type: String,
      default: ''
    },
    businessDownloadPath: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
    }
  },
  data () {
    return {
      locale: {
        emptyText: '暂无数据'
      },
      tableKey: 0,
      visible: false,
      confirmLoading: false,
      mdl: {},
      uploadUrl: process.env.VUE_APP_API_BASE_URL + this.businessUploadUrl,
      // downloadByurl: process.env.VUE_APP_API_BASE_URL + '/system/file/ftp/downloadByUrl?url=' + this.businessDownloadPath,
      downErrorUrl: process.env.VUE_APP_API_BASE_URL + '/system/common/error/',
      headers: {
        token: Vue.ls.get(ACCESS_TOKEN)
      },
      importErrMsg: '',
      errorKey: '',
      fileList: [],
      uploading: false,
      fileName: '',
      // 结果列表
      columns: [{
        dataIndex: 'name',
        title: '文件名'
      }, {
        dataIndex: 'size',
        title: '大小',
        customRender: (text) => {
          return parseInt(text / 1024) + 'K'
        }
      }, {
        dataIndex: 'size',
        title: '结果',
        scopedSlots: { customRender: 'result' }
      }, {
        dataIndex: 'size',
        title: '详情',
        scopedSlots: { customRender: 'message' }
      }
      ]
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      // 若要进入done 状态，不能使用受控模式，a-upload组件的fileList属性不能赋值
      if (info.file.status === 'done') {
        console.log(info.fileList)
        this.fileList = []
        // 数据要做深拷贝
        const [...arr] = info.fileList
        this.fileList = arr
      } else if (info.file.status === 'error') {
        this.isCanDelFile = false
        this.$message.error(`${info.file.name} 文件上传失败`)
      }
    },
    // 上传文件格式不一致回调函数
    reject (fileList) {
      // 简单处理
      this.$message.error('上传的文件不符合要去，请重新选择！')
      return false
    },
    downErrInfo (key) {
      downloadError(key)
    },
    downImportTemplate () {
      downloadTemplate(this.businessDownloadPath)
    },
    show () {
      this.visible = true
      this.errorKey = ''
      this.importErrMsg = ''
      // this.fileList = []
    },
    handleSubmit (e) {
      // this.fileList = []
      this.$emit('ok')
      this.visible = false
    }
  }
}
</script>
