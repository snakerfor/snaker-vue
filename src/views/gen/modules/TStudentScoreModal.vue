<template>
  <a-modal :width="800" :maskClosable="false" v-model="visible" :confirmLoading="confirmLoading" @ok="handleSubmit">
    <div slot="title">{{ title }}</div>
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['id']" />
      </a-form-item>
      <div class="content">
        <table class="tb_normal">
          <tbody>
            <tr>
              <td class="td_normal_title">
                学号:
              </td>
              <td class="td_normal_content">
                <a-form-item>
                  <a-input placeholder="请输入学号" v-decorator="['studentNo',studentNoRules]" :disabled="!isAdd" />
                </a-form-item>
              </td>
              <td class="td_normal_title">
                姓名:
              </td>
              <td class="td_normal_content">
                <a-form-item>
                  <a-input placeholder="请输入姓名" v-decorator="['studentName',studentNameRules]" />
                </a-form-item>
              </td>
            </tr>
            <tr>
              <td class="td_normal_title">
                成绩:
              </td>
              <td class="td_normal_content">
                <a-form-item>
                  <a-input-number placeholder="请输入成绩" v-decorator="['score',scoreRules]" />
                </a-form-item>
              </td>
              <td class="td_normal_title">
                科目代码:
              </td>
              <td class="td_normal_content">
                <a-form-item>
                  <a-select placeholder="请选择科目代码" v-decorator="['subjectCode',subjectCodeRules]" :disabled="!isAdd">
                    <a-select-option v-for="(item,index) in shareData['subject_code_array']" :key="index" :value="item.dictValue">
                      {{ item.dictLabel }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </td>
            </tr>
            <tr>
              <td class="td_normal_title">
                考试日期:
              </td>
              <td class="td_normal_content">
                <a-form-item>
                  <a-date-picker format="YYYY-MM-DD" :showTime="false" v-decorator="['examDate',examDateRules]" />
                </a-form-item>
              </td>
              <td class="td_normal_title">
                是否有效:
              </td>
              <td class="td_normal_content">
                <a-form-item>
                  <a-select placeholder="请选择是否有效" v-decorator="['delFlag',delFlagRules]">
                    <a-select-option v-for="(item,index) in shareData['del_flag_array']" :key="index" :value="item.dictValue">
                      {{ item.dictLabel }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </td>
              <!--<a-col :span="10"></a-col>-->
            </tr>
          </tbody>
        </table>
      </div>
    </a-form>
    <div v-show="loadingmask" class="loading-mask">
      <a-spin size="large" />
    </div>
    <!--自定义页底-->
    <template slot="footer">
      <div>
        <a-popconfirm placement="top" @confirm="handleSubmit">
          <template slot="title">
            <p>确定保存已填入内容吗？</p>
          </template>
          <a-button key="submit" type="primary">
            保存
          </a-button>
        </a-popconfirm>
        <a-button key="concel" @click="()=>{this.visible = false}">
          取消
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
import { saveTStudentScore } from '@/api/frame/tStudentScore'
import pick from 'lodash.pick'
export default {
  name: 'TStudentScoreModal',
  props: {
    shareData: { type: Object, default: () => { } }
  },
  components: {
  },
  data () {
    return {
      title: '添加/修改学生成绩',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      loadingmask: false,
      confirmLoading: false,
      mdl: {},
      studentNoRules: { rules: [{ required: true, message: '学号为必填项' }, { max: 10, message: '请输入小于10字的内容' }] },
      studentNameRules: { rules: [{ max: 20, message: '请输入小于20字的内容' }] },
      scoreRules: { rules: [] },
      subjectCodeRules: { rules: [{ required: true, message: '科目代码为必填项' }] },
      examDateRules: { rules: [] },
      form: this.$form.createForm(this),
      isAdd: false
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    add () {
      this.form.resetFields()
      this.edit({ id: '0' })
    },
    edit (record) {
      this.isAdd = record.id === '0'
      this.mdl = Object.assign(record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'studentNo', 'studentName', 'score', 'subjectCode', 'examDate', 'delFlag'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // 编辑状态下
          // 以列表原有全部字段数据为基础，补充追加表单中的字段数据，
          // 表单中存在的字段按照表单中的值，不存在的字段，保持列表中的值
          // 解决表单数据无法置空非空字段的BUG
          if (!this.isAdd) {
            Object.keys(values).forEach(key => {
              this.mdl[key] = values[key]
            })
          } else {
            this.mdl = values
          }
          this.confirmLoading = true
          saveTStudentScore(this.mdl).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  }
}
</script>
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
// 数值输入框 宽度调整为100%
.ant-advanced-search-form {
  /deep/ .ant-input-number {
    width: 100%;
  }
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
  .ant-form-item {
    margin-bottom: 0px;
  }
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
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 5px;
  border-bottom: 1px solid #dcd3d3;
}
.button-wrapper {
  margin: 10px 0px;
  .message {
    font-size: 12px;
    color: red;
    margin-left: 4px;
  }
}
.question {
  color: red;
  p {
    margin-bottom: 0px;
  }
}
</style>
