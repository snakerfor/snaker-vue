<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="5" :sm="15">
            <a-form-item label="进程Id">
              <a-input placeholder="请输入" v-model="queryParam.id" />
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="12">
            <a-form-item label="进程类型">
              <a-select placeholder="请选择" v-model="queryParam.processType" default-value="0">
                <a-select-option :value="''">全部进程</a-select-option>
                <a-select-option v-for="(b, index) in sysProcessTypes" :key="index" :value="b.code">{{ b.desc }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="进程数据">
              <a-input placeholder="请输入" v-model="queryParam.processData" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="12">
            <a-form-item label="进程状态">
              <a-select placeholder="请选择" v-model="queryParam.processStatus" default-value="">
                <a-select-option :value="''">全部</a-select-option>
                <a-select-option :value="'INIT'">初始化</a-select-option>
                <a-select-option :value="'DOING'">处理中</a-select-option>
                <a-select-option :value="'SUCCESS'">成功</a-select-option>
                <a-select-option :value="'FAIL'">失败</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="6" :sm="18">
            <a-form-item label="开始时间">
              <a-range-picker v-model="range" />
            </a-form-item>
          </a-col> -->
          <a-col :md="6" :sm="18">
            <a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-range-picker v-model="range" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="queryParamReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">

    </div>
    <s-table size="default" ref="table" rowKey="id" :columns="columns" :data="loadData" :rangPicker="range" defaultSort="createTime" v-if="operTypeMap">
      <span slot="action" slot-scope="text, record">
        <a @click="handleDetail(record)">详细</a>
      </span>
    </s-table>
    <sys-process-modal ref="modal" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getSysProcessListApi, sysProcessTypesApi } from '@/api/system'
import SysProcessModal from './modules/SysProcessModal.vue'
import { getDictArray } from '@/utils/dict'
const operTypeMap = {}
export default {
  name: 'TableList',
  components: {
    STable,
    SysProcessModal
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
      form: this.$form.createForm(this),
      mdl: {},
      permissions: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '进程Id',
          align: 'left',
          dataIndex: 'id'
        },

        {
          title: '进程类型',
          dataIndex: 'processType',
          align: 'left',
          width: 200,
          customRender: (text) => {
            return text.desc
          }
        },
        {
          title: '进程状态',
          dataIndex: 'processStatus',
          align: 'left',
          width: 80,
          customRender: (text) => {
            if (text === 'INIT') {
              return '初始化'
            } else if (text === 'DOING') {
              return '处理中'
            } else if (text === 'SUCCESS') {
              return '成功'
            } else if (text === 'FAIL') {
              return '失败'
            }
            return text
          }
        },
        {
          title: '进程数据',
          align: 'left',
          width: 200,
          dataIndex: 'processData'
        },
        {
          title: '开始时间',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '结束时间',
          dataIndex: 'updateTime'
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      range: undefined,
      loadData: parameter => {
        return getSysProcessListApi(Object.assign(parameter, this.queryParam))
      },
      operTypeMap,
      businessTypes: [],
      sysProcessTypes: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    operTypeFilter (type) {
      return operTypeMap[type].text
    }
  },
  beforeCreate () {

  },
  async created () {
    this.businessTypes = await getDictArray('sys_oper_type')
    this.businessTypes.map(d => {
      operTypeMap[d.dictValue] = { text: d.dictLabel }
    })
    this.sysProcessTypes = await sysProcessTypesApi()
  },
  methods: {
    handleDetail (record) {
      this.$refs.modal.detail(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
    },
    queryParamReset () {
      this.queryParam = {}
      this.range = undefined
    }
  },
  watch: {

  }
}
</script>
