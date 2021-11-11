<template>
  <a-modal style="top: 20px;" :width='1000' v-model="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" :footer="null">
    <div slot="title">{{title}}</div>
    <a-form :form="form" class="ant-advanced-search-form">
      <div class="content">
        <table class="tb_normal">
          <tbody>
            <tr v-for="(item, i) in rea" :key="i">
              <td class="td_normal_title">
                {{item[0].label}}
              </td>
              <td class="td_normal_content">
                <span v-if="item[0].value">{{item[0].value}}</span>
                <div v-else class="small">
                  <a-list item-layout="horizontal" :data-source="item[0].files" :split=false :locale="locale">
                    <a-list-item slot="renderItem" slot-scope="file, index">
                      <a @click="showFile(file.id)">{{index+1}}、{{file.fileName}}</a>
                    </a-list-item>
                  </a-list>
                </div>
              </td>
              <td class="td_normal_title">
                {{item[1].label}}
              </td>
              <td class="td_normal_content">
                <span v-if="item[1].value">{{item[1].value}}</span>
                <div v-else class="small">
                  <a-list item-layout="horizontal" :data-source="item[1].files" :split=false :locale="locale">
                    <a-list-item slot="renderItem" slot-scope="file, index">
                      <a @click="showFile(file.id)">{{index+1}}、{{file.fileName}}</a>
                    </a-list-item>
                  </a-list>
                </div>
              </td>
            </tr>
            <tr v-if="mdl.length%2 === 1">
              <td class="td_normal_title">
                {{mdl[mdl.length-1].label}}
              </td>
              <td class="td_normal_content">
                <span v-if="mdl[mdl.length-1].value">{{mdl[mdl.length-1].value}}</span>
                <div v-else class="small">
                  <a-list item-layout="horizontal" :data-source="mdl[mdl.length-1].files" :split=false :locale="locale">
                    <a-list-item slot="renderItem" slot-scope="file, index">
                      <a @click="showFile(file.id)">{{index+1}}、{{file.fileName}}</a>
                    </a-list-item>
                  </a-list>
                </div>
              </td>
              <td class="td_normal_title">
              </td>
              <td class="td_normal_content">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 数据变更 -->
      <div class="hist" v-if="change.length > 0">
        <div class="change-label">数据变更:</div>
        <div class="content">
          <table class="tb_normal">
            <thead>
              <tr>
                <td>变更内容</td>
                <td>变更前</td>
                <td>变更后</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in change" :key="i">
                <td class="td_change_content">
                  {{item.label}}
                </td>
                <td class="td_change_content">
                  <div v-if="item.hasOwnProperty('type') && item.type === 'FILE'" class="small">
                    <a-list item-layout="horizontal" :data-source="item.before" :split=false :locale="locale">
                      <a-list-item slot="renderItem" slot-scope="file, index">
                        <a @click="showFile(file.id)">{{index+1}}、{{file.fileName}}</a>
                      </a-list-item>
                    </a-list>
                  </div>
                  <span v-else>{{item.before}}</span>
                </td>
                <td class="td_change_content">
                  <div v-if="item.hasOwnProperty('type') && item.type === 'FILE'" class="small">
                    <a-list item-layout="horizontal" :data-source="item.after" :split=false :locale="locale">
                      <a-list-item slot="renderItem" slot-scope="file, index">
                        <a @click="showFile(file.id)">{{index+1}}、{{file.fileName}}</a>
                      </a-list-item>
                    </a-list>
                  </div>
                  <span v-else>{{item.after}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 审批历史 -->
      <div class="hist" v-if="hist.length > 0">
        <div class="hist-label">审批历史:</div>
        <div class="content">
          <table class="tb_normal">
            <thead>
              <tr>
                <td>审批人</td>
                <td>审批结果</td>
                <td>审批意见</td>
                <td>审批时间</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in hist" :key="i">
                <td class="td_hist_content">
                  {{item.auditor}}
                </td>
                <td class="td_hist_content">
                  {{item.result | resultFilter}}
                </td>
                <td class="td_hist_content">
                  {{item.comment}}
                </td>
                <td class="td_hist_content">
                  {{item.endTime}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <template v-if="audit">
        <div style="background:#e9e4e4;;height:2px"> </div>
        <a-row type="flex" justify="start">
          <a-col :span="24">
            <div style="text-align:left;margin: 10px 0px;color: #e67171">审批意见：</div>
            <a-textarea placeholder="请输入审批意见" defaultValue='同意' :autosize="{ minRows: 2, maxRows: 6 }" v-model="formData.comment" />
          </a-col>
        </a-row>
        <a-row type="flex" justify="center">
          <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center" v-show="audit">
            <a-button type="primary" :loading="confirmLoading" @click="handleSubmit(2)">同意</a-button>
            <a-button style="margin-left: 8px" @click="handleSubmit(3)">驳回</a-button>
          </a-form-item>
        </a-row>
      </template>
    </a-form>
  </a-modal>
</template>
<script>
import store from '@/store'
import { getApproveByBusiness, auditTask, getTaskFlow } from '@/api/activiti'
const resultMap = {
  '1': '处理中',
  '2': '通过',
  '3': '驳回',
  '4': '撤销'
}
export default {
  name: 'ApproveModal',
  props: {
    audit: {
      type: Boolean,
      default: true
    }
  },
  components: {
  },
  data () {
    return {
      title: '',
      visible: false,
      labelCol: {
        sm: { span: 10 }
      },
      wrapperCol: {
        sm: { span: 14 }
      },
      locale: { emptyText: ' ' },
      confirmLoading: false,
      mdl: [],
      rea: [],
      change: [],
      dateFormat: 'YYYY-MM-DD HH:mm',
      formData: {},
      hist: [],
      form: this.$form.createForm(this),
      downloadUrl: process.env.VUE_APP_API_BASE_URL + '/system/file/ftp/download'
    }
  },
  computed: {
  },
  filters: {
    resultFilter (type) {
      return type ? resultMap[type] : '待审批'
    }
  },
  created () {
  },
  methods: {
    show (record) {
      // record 是任务 如果只是查看可以只传入一个businessKey
      if (this.audit) {
        if (record.processName) {
          this.title = record.processName + '-审批'
        }
        this.formData = Object.assign(
          {
            taskId: record.id,
            procInstId: record.procInstId,
            procName: record.processDefName,
            businessKey: record.businessKey,
            procDefKey: record.processDefKey,
            applyer: record.applyer
          }
        )
      } else {
        if (record.title) {
          this.title = record.title + '-审批'
        }
      }
      getApproveByBusiness(record.businessKey).then(res => {
        if (res.code === 0) {
          this.renderAproveFrame(res.data.record)
          this.hist = []
          if (this.formData.procInstId) {
            getTaskFlow({ procInstId: this.formData.procInstId }).then(res => {
              if (res.code === 0) {
                this.hist = res.rows.filter(d => {
                  return d.auditor !== null
                })
              }
            })
          }
        }
      })
    },
    handleSubmit (result) {
      this.confirmLoading = true
      const formData = this.formData
      formData.result = result
      if (!formData.comment) {
        formData.comment = (result === 2 ? '同意' : '驳回')
      }
      auditTask(formData).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.$emit('ok')
          this.visible = false
        } else {
          this.$message.success(res.msg)
        }
      }).catch(() => {
        this.$message.error('系统错误，请稍后再试')
      }).finally(() => {
        this.confirmLoading = false
        store.dispatch('GetTasks')
      })
    },
    showFile (fileId) {
      const link = this.$router.resolve({ name: 'preview', query: { fileId: fileId } })
      window.open(link.href, '_blank')
    },
    // 初始化审批内容
    renderAproveFrame (record) {
      this.change = []
      const data = Object.assign(JSON.parse(record))
      let temd = []
      if (typeof data.length === 'number') {
        temd = data
      } else {
        temd = data.base
        this.change = data.change
      }
      // 首次是数组形式 二次为对象
      this.mdl = []
      this.rea = []
      let arr = []
      let cnt = 0
      temd.forEach((d) => {
        console.info(d)
        if (d && d.hasOwnProperty('label')) {
          this.mdl.push(d)
          arr.push(d)
          if (cnt % 2 > 0) {
            this.rea.push(arr)
            arr = []
          }
          cnt++
        }
      })
      this.visible = true
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-input-disabled {
  color: #000;
  background-color: #fff;
}
/deep/ .ant-select-disabled {
  color: #000;
}
/deep/ .ant-select-selection {
  background-color: #fff;
}
/deep/ .ant-list-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 6px 0;
}
.content {
  margin-bottom: 20px;
}
.tb_normal {
  width: 100%;
  display: table;
  background-color: #ffffff;
  border-collapse: collapse;
  border: 1px #d2d2d2 solid;
  // padding: 8px !important;
  text-align: left;
  margin: 0 auto;
}
.tb_normal > thead > tr > td {
  vertical-align: middle;
  padding: 6px;
  word-break: break-word;
  border: 1px solid #d2d2d2;
}
.tb_normal > tbody > tr {
  border-bottom: 1px solid #d2d2d2;
  border-top: 1px solid #d2d2d2;
}
.tb_normal > tbody > tr > td {
  vertical-align: middle;
  padding: 6px;
  word-break: break-word;
  border: 1px solid #d2d2d2;
}
.td_normal_title {
  width: 20%;
  text-align: right;
  background-color: #f6f6f6;
}
.td_normal_content {
  width: 30%;
  text-align: left;
}
.td_hist_content {
  width: 25%;
  text-align: left;
}
.hist-label {
  margin-bottom: 12px;
}
.td_change_content {
  width: 33%;
  text-align: left;
}
.change-label {
  margin-bottom: 12px;
}
</style>
