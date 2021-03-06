<template>
  <a-card :bordered="false">
    <mask-layer :loadingMask="loadingmask" />
    <a-row :gutter="8">
      <a-col :span="5">
        <search-tree :treeData="deptTree" :dataList="dataList" :expandedKeys="expandedKeys" :holderText="holderText" @select="handleSelect">
        </search-tree>
      </a-col>
      <a-col :span="19">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="5" d:sm="15">
                <a-form-item label="账号">
                  <a-input placeholder="请输入" v-model="queryParam.loginName" />
                </a-form-item>
              </a-col>
              <a-col :md="5" d:sm="15">
                <a-form-item label="用户名">
                  <a-input placeholder="请输入" v-model="queryParam.userName" />
                </a-form-item>
              </a-col>
              <a-col :md="5" d:sm="15">
                <a-form-item label="状态">
                  <a-select placeholder="请选择" v-model="queryParam.status">
                    <a-select-option :value="''">全部</a-select-option>
                    <a-select-option :value="'0'">正常</a-select-option>
                    <a-select-option :value="'1'">禁用</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="5" d:sm="15">
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="table-operator">
          <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">新建</a-button>
          <a-button v-if="addEnable" type="primary" icon="import" @click="batchImportOpen">批量导入</a-button>
          <a-dropdown v-if="removeEnable&& selectedRowKeys.length > 0">
            <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">删除</a-button>
          </a-dropdown>
        </div>
        <s-table size="default" ref="table" rowKey="userId" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :data="loadData" defaultSort="createTime">
          <span slot="status" slot-scope="text,record">
            <a-switch :checked="record.status=='0'" @change="onChangeStatus(record)" />
          </span>
          <span slot="action" slot-scope="text, record">
            <a v-if="editEnabel" @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a v-if="removeEnable" @click="delByIds([record.userId])">删除</a>
            <a-divider type="vertical" />
            <a v-if="resetPwdEnabel" @click="resetPwd(record)">重置密码</a>
          </span>
        </s-table>
      </a-col>
    </a-row>
    <user-modal ref="modal" @ok="handleOk" :deptTree="deptTree" />
    <user-pwd-modal ref="pwdmodal" />
    <import-excel-modal ref="import" :businessUploadUrl="importExcelUrl" :businessDownloadPath="templatePath" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable, SearchTree, MaskLayer } from '@/components'
import ImportExcelModal from '@/views/common/ImportExcelModal.vue'
import { getUserList, getDeptListEnable, delUser, changUserStatus, importUserList, getSysProcessApi } from '@/api/system'
import UserModal from './modules/UserModal'
import UserPwdModal from './modules/UserPwdModal'
import pick from 'lodash.pick'
import { checkPermission } from '@/utils/permissions'
import { sleep } from '@/utils/util'
export default {
  name: 'UserList',
  components: {
    SearchTree,
    STable,
    MaskLayer,
    ImportExcelModal,
    UserModal,
    UserPwdModal
  },
  data () {
    return {
      loadingmask: false,
      description: '',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '账号',
          dataIndex: 'loginName'
        },
        {
          title: '用户名',
          dataIndex: 'userName'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        }, {
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserList(Object.assign(parameter, this.queryParam))
      },
      deptTree: [],
      expandedKeys: [],
      dataList: [],
      holderText: '搜索部门',
      selectedRowKeys: [],
      selectedRows: [],
      // 批量导入上传地址
      importExcelUrl: importUserList,
      // 导入模块下载路径
      // templatePath: 'template/用户批量导入模板.xlsx',
      templatePath: 'template/用户批量导入模板.xlsx',
      addEnable: checkPermission('system:user:add'),
      editEnabel: checkPermission('system:user:edit'),
      resetPwdEnabel: checkPermission('system:user:resetPwd'),
      removeEnable: checkPermission('system:user:remove')
    }
  },
  created () {
    this.reloadAndBuildDept()
  },
  methods: {
    reloadAndBuildDept () {
      this.deptTree = []
      this.expandedKeys = []
      this.dataList = []
      getDeptListEnable().then(res => {
        const data = res.rows
        if (data.length > 0) {
          const min = Math.min(...data.map(m => m.parentId))
          this.buildtree(data, this.deptTree, min)
          this.expandedKeys = data.map(m => m.parentId)
          this.dataList = data.map(m => {
            return { key: m.deptId, title: m.deptName }
          })
        }
      })
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    resetPwd (record) {
      this.$refs.pwdmodal.edit(record)
    },
    batchImportOpen () {
      this.$refs.import.show()
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk () {
      this.selectedRowKeys = []
      this.selectedRows = []
      this.$refs.table.refresh()
    },
    delByIds (ids) {
      this.loadingmask = true
      delUser({ ids: ids.join(',') }).then(res => {
        sleep(3000)
        this.loadingmask = false
        if (res.code === 0) {
          this.$message.success(`删除成功`)
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        // const difference = new Set(this.selectedRowKeys.filter(x => !new Set(ids).has(x)))
        // this.selectedRowKeys = Array.from(difference)
        this.selectedRowKeys = []
      })
    },
    onChangeStatus (record) {
      record.status = record.status === '0' ? '1' : '0'
      changUserStatus(pick(record, 'userId', 'status')).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.msg)
        }
      })
      // 发送状态到服务器
    },
    buildtree (list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          var child = {
            key: item.deptId,
            value: item.deptId, // value是给modal的select用的，2者属性不一样
            title: item.deptName,
            scopedSlots: { title: 'title' },
            children: []
          }
          this.buildtree(list, child.children, item.deptId)
          if (child.children.length === 0) { delete child.children }
          arr.push(child)
        }
      })
    },
    // 下面是树相关方法
    handleSelect (selectedKeys, info) {
      this.queryParam = {
        deptId: selectedKeys[0]
      }
      this.$refs.table.refresh(true)
    },
    getSysProcess (sysProcessId) {
      console.log('开始休眠')
      sleep(3000)
      getSysProcessApi(sysProcessId).then(res => {
        if (res.code === 0) {
          // this.$message.success()
          console.log(JSON.stringify(res))

          var processStatus = res.data.processStatus
          if (processStatus === 'SUCCESS') {
            this.loadingmask = false
            this.$message.success('刷新成功')
            this.reloadAllPage()
          } else if (processStatus === 'FAIL') {
            this.loadingmask = false
            this.$message.error('刷新失败')
          } else {
            this.getSysProcess(res.data.id)
          }
        } else {
          this.loadingmask = false
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.loadingmask = false
        console.log(JSON.stringify(err))
        this.$message.error(err.msg)
      })
    },
    reloadAllPage () {
      console.log('开始全部刷新了')
      this.reloadAndBuildDept()
      this.$refs.table.refresh(true)
    }
  }
}
</script>
