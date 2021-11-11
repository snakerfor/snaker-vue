<template>
  <a-modal :bordered="false" :footer="null" :width="1000" v-model="visible">
    <a-layout>
      <a-layout-content>
        <a-layout style="background: #fff">
          <a-layout-sider width="260" style="background: #FAFAFA">
            <div style="padding: 5px ; ">
              <a-tree :tree-data="treeData" @expand="onExpand" :auto-expand-parent="autoExpandParent" :selectedKeys="defaultSelectedKeys" :expandedKeys="defaultExpandedKeys"
                @select="selectNode" />
            </div>
          </a-layout-sider>
          <a-layout>
            <a-layout-content :style="{ background: '#fff', padding: '7px', margin: 0, minHeight: '280px' }">
              <div>
                <a-list size="small">
                  <a-list-item :key="index" v-for="(item, index) in data1">
                    <a-list-item-meta :description="index+1+'、' + item.fileName">

                    </a-list-item-meta>
                    <div slot="actions">
                      <a @click="delSelectedFile(index)">删除</a>
                    </div>
                  </a-list-item>
                  <div slot="header">
                    <a-form layout="inline">
                      <a-row :gutter="48">
                        <a-col :md="10" :sm="15">

                        </a-col>
                        <a-col :md="8" :sm="15">
                          <a-button type="primary" @click="handleSubmit">保存</a-button>
                        </a-col>
                        <a-col :md="4" :sm="15">

                        </a-col>
                      </a-row>
                    </a-form>
                  </div>
                  <div slot="footer"></div>
                </a-list>
              </div>
              <div class="table-page-search-wrapper">
                <a-form layout="inline">
                  <a-input hidden v-model="queryParam.fileCategoryId" />
                  <a-row :gutter="48">
                    <a-col :md="12" :sm="15">
                      <a-upload :multiple="true" :showUploadList="false" name="file" :disabled="!editEnabel" :headers="headers" @change="handleChange" :remove="removeHandle"
                        :before-upload="beforeUpload">
                        <a-button type="primary">
                          <a-icon type="upload" />上传附件
                        </a-button>
                      </a-upload><br />
                      <span v-if="fileList.length > 0 ">
                        {{ uploading ? '正在上传...' : '' }}
                      </span>
                    </a-col>
                    <a-col :md="8" :sm="15">
                      <a-form-item label="">
                        <a-input style="width:200px" placeholder="请输入文件名称" v-model="queryParam.fileName" />
                      </a-form-item>
                    </a-col>
                    <a-col :md="4" :sm="15">
                      <span class="table-page-search-submitButtons">
                        <a-button type="primary" @click="doSearch">查询</a-button>
                      </span>
                    </a-col>
                  </a-row>
                </a-form>
              </div>
              <s-table size="default" ref="table1" rowKey="id" :rowSelection="{type:'radio',selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns"
                :data="loadData">
              </s-table>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </a-layout-content>
    </a-layout>
  </a-modal>
</template>

<script>
import { STable } from '@/components'
import { delFile, listFileCategoryTreeApi, batchGetDfsFileByIds, getCategoryFileList } from '@/api/rdds'
// import { checkPermission } from '@/utils/permissions'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'
export default {
  name: 'SelectSysFile',
  components: {
    STable
  },
  props: {
    // fileIds: { type: String, default: '' },
    // fileCategoryId: { type: String, default: '' },
    // parentFileCategoryId: { type: String, default: '' }
  },
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
      form: this.$form.createForm(this),
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '文件名称',
          dataIndex: 'fileName'
        },
        {
          title: '文件后缀',
          dataIndex: 'fileSuffix'
        }
      ],
      loadData: () => {
        var p = new Promise(function (resolve, reject) {
          resolve({ pageNum: 1, rows: [], tatol: 0 })
        })
        return p
      },
      selectedRowKeys: [],
      selectedRows: [],
      selectedItem: {},
      // addEnable: checkPermission('rdds:dfsFile:add'),
      // editEnabel: checkPermission('rdds:dfsFile:edit'),
      // removeEnable: checkPermission('rdds:dfsFile:remove'),
      addEnable: true,
      editEnabel: true,
      removeEnable: true,
      id: '',
      autoExpandParent: true,
      treeData: [],
      uploadUrl: '/system/file/batchSaveFile',
      headers: {
        token: Vue.ls.get(ACCESS_TOKEN)
      },
      defaultSelectedKeys: [],
      defaultExpandedKeys: ['aaaaaaaaaaaaaaaaaa'],
      data1: [],
      fileList: [],
      uploading: false
    }
  },
  filters: {
  },
  created () {
    // 加载文档类型树
    listFileCategoryTreeApi({}).then(res => {
      if (res.code === 0) {
        this.treeData = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    delSelectedFile (index) {
      const row = this.data1[index]
      this.selectedRows.forEach((item, index1) => {
        if (item.id === row.id) {
          this.selectedRows.splice(index1, 1)
          this.selectedRowKeys.splice(index1, 1)
        }
      })
      this.data1.splice(index, 1)
    },
    // 检验标准附件
    handleChange (info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 文件上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败`)
      }
    },
    removeHandle (file) {
      console.info(file.response.data.id)
      delFile({ ids: file.response.data.id }).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    beforeUpload (file, fl) {
      if (file === fl[fl.length - 1]) {
        this.fileList = fl
        this.handleUploadFileList()
      }
      return false
    },
    handleUploadFileList () {
      console.log(this.queryParam.fileCategoryId)
      if (!this.queryParam.fileCategoryId) {
        this.$message.info('请选择要保存的文件类别')
        return
      }
      if (this.fileList.length > 5) {
        this.$message.info('一次只能批量上传5个文件')
        return
      }
      const formData = new FormData()
      var index = 0
      this.fileList.forEach(file => {
        formData.append('file' + (index++), file)
      })
      this.uploading = true
      console.log(formData)
      axios({
        url: this.uploadUrl + '/' + this.queryParam.fileCategoryId,
        method: 'post',
        data: formData
      }).then(res => {
        if (res.code === 0) {
          this.$message.success('已成功上传' + this.fileList.length + '个文件')
          const list = res.data
          list.forEach(item => {
            this.data1.push({
              id: item.id,
              fileName: item.fileName
            })
          })
          return
        }
        if (res.code > 0) {
          this.$message.error(`文件上传失败`)
        }
        this.fileList = []
      }).catch(err => {
        this.$message.error(err.msg)
      }).finally(() => {
        this.uploading = false
      }
      )
    },
    doSearch () {
      this.selectedRowKeys = []
      this.selectedRows = []
      this.loadData = parameter => {
        return getCategoryFileList(Object.assign(parameter, this.queryParam))
      }
      this.$refs.table1.refresh(false)
    },
    selectNode (nodes, info) {
      console.log(info)
      Vue.set(this.queryParam, 'fileCategoryId', info.node.value)
      this.defaultSelectedKeys = [info.node.value]
      this.doSearch()
    },
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      this.defaultExpandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    reset () {
      this.queryParam = {}
      this.selectedRowKeys = []
      this.selectedRows = []
      this.selectedItem = {}
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      if (this.selectedRows.length > 0) {
        this.selectedRows.forEach(item => {
          const d = {
            id: item.id,
            fileName: item.fileName
          }
          if (JSON.stringify(this.data1).indexOf(JSON.stringify(d)) > -1) {
          } else {
            this.data1.push(d)
          }
        })
      }
    },
    show (fileIds, parentFileCategoryId, fileCategoryId) {
      this.fileIds = fileIds
      this.data1 = []
      if (this.fileIds) {
        batchGetDfsFileByIds(this.fileIds.split(',')).then(res => {
          if (res) {
            const d = res.data
            if (d && d.length > 0) {
              d.forEach(item => {
                this.data1.push({
                  id: item.id,
                  fileName: item.fileName
                })
              })
            }
          }
        })
      }
      this.defaultSelectedKeys = [fileCategoryId]
      this.defaultExpandedKeys = ['aaaaaaaaaaaaaaaaaa']
      this.defaultExpandedKeys.push(parentFileCategoryId)
      Vue.set(this.queryParam, 'fileCategoryId', fileCategoryId)
      this.visible = true
      this.doSearch()
    },
    handleSubmit () {
      this.$emit('ok', this.data1)
      this.visible = false
    }
  },
  watch: {
  }
}
</script>
