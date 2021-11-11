<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="5" :sm="15">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="this.fetch">查询</a-button>
            </span>
          </a-col>
          <a-col :md="5" :sm="15">
          </a-col>
          <a-col :md="8" :sm="24">
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table ref="table" rowKey="deptId" :pagination="pagination" :loading="loading" :columns="columns" :dataSource="data">
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" :disabled="record.id==='aaaaaaaaaaaaaaaaaa'" @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a v-if="addEnable" :disabled="!(record.catalogFlag===0)" @click="handleAdd(record.id+'')">新增</a>
        <a-divider type="vertical" />
        <a v-if="removeEnable" :disabled="record.id==='aaaaaaaaaaaaaaaaaa'" @click="delById(record.id)">删除</a>
      </span>
    </a-table>

    <dept-modal ref="modal" @ok="handleOk" />
    <file-category-modal ref="fileCategoryModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { Table as T } from 'ant-design-vue'
import { getFileCategoryList, delFileCategory } from '@/api/system'
import DeptModal from './modules/DeptModal.vue'
import { treeData2 } from '@/utils/treeutil'
import { checkPermission } from '@/utils/permissions'
import FileCategoryModal from './modules/FileCategoryModal.vue'
export default {
  name: 'TableList',
  components: {
    T,
    DeptModal,
    FileCategoryModal
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
      form: null,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '类型名称',
          dataIndex: 'name'
        },
        {
          title: '是否是目录',
          dataIndex: 'catalogFlag',
          customRender: (text) => {
            return text === 0 ? '是' : '否'
          }
        },
        {
          title: '是否需要上传源文件',
          dataIndex: 'uploadSourceFileFlag',
          customRender: (text) => {
            return text === 0 ? '是' : '否'
          }
        },
        {
          title: '创建人',
          dataIndex: 'createByUserName'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '修改人',
          dataIndex: 'updateByUserName'
        },
        {
          title: '修改时间',
          dataIndex: 'updateTime'
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      pagination: false,
      loading: false,
      addEnable: checkPermission('system:fileCategory:add'),
      editEnabel: checkPermission('system:fileCategory:update'),
      removeEnable: checkPermission('system:fileCategory:del')
    }
  },
  filters: {
  },
  created () {
    this.fetch()
  },
  methods: {
    handleAdd (parentId) {
      this.$refs.fileCategoryModal.add(parentId)
    },
    handleEdit (record) {
      this.$refs.fileCategoryModal.edit(record)
    },
    handleOk () {
      this.fetch()
    },
    delById (id) {
      delFileCategory(id).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    fetch () {
      this.loading = true
      getFileCategoryList(Object.assign(this.queryParam)).then(res => {
        this.data = treeData2(res.rows, 'id')
        this.loading = false
        console.log('----' + JSON.stringify(this.data))
      })
    }
  },
  watch: {
  }
}
</script>
