<template>
  <a-modal title="修改密码" style="top: 20px;" :width="400" centered v-model="visible" :confirmLoading="confirmLoading" @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['userId']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="账号">
        <a-input placeholder="账号" disabled v-decorator="['loginName', {rules: [{ required: true, message: '请输入用户名' }]}]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="原密码">
        <a-input type="password" placeholder="原密码" v-decorator="['passwordBefore', {rules: [{ required: true,min:6,max:16, message: '请输入6到16位密码' }]}]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="新密码">
        <a-input type="password" placeholder="新密码" v-decorator="['passwordAfter', {rules: [{ required: true,min:6,max:16, message: '请输入6到16位密码' }]}]" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="新密码">
        <a-input type="password" placeholder="新密码" v-decorator="['passwordAfterAgain', {rules: [{ required: true,min:6,max:16, message: '请输入6到16位密码' }]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { modifyPwd } from '@/api/system'
import pick from 'lodash.pick'
export default {
  name: 'UserPwdSelfModal',
  components: {
  },
  data () {
    return {
      description: '',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      confirmLoading: false,
      mdl: {},
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    edit (record) {
      this.form.resetFields()
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'userId', 'loginName'))
        // this.form.setFieldsValue({ ...record })
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // 验证两次新密码输入是否一致
          if (!values.passwordAfter === values.passwordAfterAgain) {
            this.$message.error('两次输入新密码不一致，请重新输入')
            return
          }
          if (values.passwordBefore === values.passwordAfter) {
            this.$message.error('原密码与新密码相同，请勿重复修改')
            return
          }
          this.confirmLoading = true
          modifyPwd(values).then(res => {
            if (res.code === 0) {
              this.$message.success(`${values.loginName}` + '修改密码成功')
              // this.$emit('ok')
              this.visible = false
            } else {
              this.$message.success(res.msg)
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
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
