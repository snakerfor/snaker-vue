<template>
  <a-modal title="操作" style="top: 20px;" :width="800" v-model="visible" :confirmLoading="confirmLoading" @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['id']" />
      </a-form-item>

      <a-form-item :labelCol="
        labelCol" :wrapperCol="wrapperCol" label="上级分类">
        <a-tree-select v-decorator="['parentId', {initialValue:'0',rules: [{ required: true, message: '请选择上级分类' }]}]" :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }" :treeData="fileCategorys" placeholder="上级分类">
        </a-tree-select>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="分类名称">
        <a-input v-decorator="['name',{rules: [{ required: true, message: '请输入分类名称' }]}]" placeholder="起一个分类名称" />
      </a-form-item>
      <a-form-item label="是否为目录" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group v-decorator="['catalogFlag',{initialValue:0}]">
          <a-radio :value="0">是</a-radio>
          <a-radio :value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="是否需要上传源文件" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group v-decorator="['uploadSourceFileFlag',{initialValue:1}]">
          <a-radio :value="0">是</a-radio>
          <a-radio :value="1">否</a-radio>
        </a-radio-group>
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script>
import { getFileCategoryList, saveFileCategory } from '@/api/system'
import pick from 'lodash.pick'
export default {
  name: 'FileCategoryModal',
  components: {
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      fileCategorys: [],
      mdl: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {
    getFileCategoryList().then(res => {
      this.buildtree(res.rows, this.fileCategorys, '0')
    })
  },
  methods: {
    add (parentId) {
      this.form.resetFields()
      this.edit({ parentId: parentId })
    },
    edit (record) {
      this.visible = true
      getFileCategoryList().then(res => {
        this.fileCategorys = []
        this.buildtree(res.rows, this.fileCategorys, '0')
        this.mdl = Object.assign({}, record)
        this.$nextTick(() => {
          this.mdl.parentId += ''
          this.form.setFieldsValue(pick(this.mdl, 'id', 'parentId', 'name', 'catalogFlag', 'uploadSourceFileFlag'))
        })
      })
    },
    buildtree (list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          var child = {
            key: item.id,
            value: item.id + '',
            title: item.name,
            children: []
          }
          this.buildtree(list, child.children, item.id)
          arr.push(child)
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('ok')
          this.visible = false
          this.confirmLoading = true
          saveFileCategory(values).then(res => {
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
