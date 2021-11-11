<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form class="ant-advanced-search-form">
        <a-row type="flex" justify="space-between" :gutter="16" align="middle">
          <a-col :md="6" :sm="15">
            <a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请输入学号" v-model="queryParam.studentNo" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="15">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请输入姓名" v-model="queryParam.studentName" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="15">
            <a-form-item label="成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请输入成绩" v-model="queryParam.score" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="15">
            <a-form-item label="科目代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select placeholder="请选择科目代码" v-model="queryParam.subjectCode">
                <a-select-option value="">全部</a-select-option>
                <a-select-option v-for="(d, index) in subjectCodeArray" :key="index" :value="d.dictValue">
                  {{ d.dictLabel }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="tablefresh">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-row type="flex" justify="space-between" align="middle">
      <a-col>
        <div class="table-operator">
          <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">添加学生成绩</a-button>
          <a-button v-if="importEnable" type="primary" icon="import" @click="batchImport">批量导入</a-button>
          <a-button v-if="exportEnable" type="primary" icon="export" @click="exportExcel()">批量导出</a-button>
          <a-dropdown v-if="removeEnable&&selectedRowKeys.length > 0">
            <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">批量删除</a-button>
          </a-dropdown>
        </div>
      </a-col>
      <a-col>
        <column-setting :hiddenColumn="hiddenColumn" :columns="columns" @ok="handleColmunSetting"></column-setting>
      </a-col>
    </a-row>
    <div style="height:500px">
      <s-table size="small" :locale="locale" ref="table" rowKey="id" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :data="loadData" :defaultSort="sortField" :scroll="{ x: 200,y:500 }" :bordered="true" :showPagination="showPagination" :pagination="pagination" :customRow="rowClick">
      </s-table>
    </div>
    <tStudentScore-modal ref="modal" :shareData="shareData" @ok="handleOk" />
    <import-excel-modal ref="importModal" @ok="handleOk" :businessUploadUrl="importUrl" :businessDownloadPath="templatePath" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getTStudentScoreList, delTStudentScore, tStudentScoreExport, tStudentScoreImport } from '@/api/frame/tStudentScore'
import TStudentScoreModal from './modules/TStudentScoreModal.vue'
// import ImportExcelByDirModal from '@/views/common/ImportExcelByDirModal.vue'
import ImportExcelModal from '@/views/common/ImportExcelModal.vue'
import { checkPermission } from '@/utils/permissions'
import { exportExcel } from '@/utils/download'
import ColumnSetting from '@/views/common/ColumnSetting.vue'
import { getDictArray } from '@/utils/dict'
export default {
  name: 'TableList',
  components: {
    STable,
    TStudentScoreModal,
    ColumnSetting,
    ImportExcelModal
  },
  data () {
    return {
      loadingmask: false,
      locale: {
        emptyText: '暂无数据'
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
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
          title: '学号',
          dataIndex: 'studentNo',
          align: 'left'
        },
        {
          title: '姓名',
          dataIndex: 'studentName',
          align: 'left'
        },
        {
          title: '成绩',
          dataIndex: 'score',
          align: 'left'
        },
        {
          title: '科目代码',
          dataIndex: 'subjectCode',
          customRender: (text) => this.dictRender(text, 'subject_code'),
          align: 'left'
        },
        {
          title: '考试日期',
          dataIndex: 'examDate',
          sorter: true,
          align: 'left'
        },
        {
          title: '是否有效',
          dataIndex: 'delFlag',
          align: 'left',
          customRender: (text) => this.dictRender(text, 'del_flag')
        },
        {
          title: '创建人',
          dataIndex: 'createBy',
          align: 'left'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true,
          align: 'left'
        },
        {
          title: '修改人',
          dataIndex: 'updateBy',
          align: 'left'
        },
        {
          title: '修改时间',
          dataIndex: 'updateTime',
          sorter: true,
          align: 'left'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        var p = new Promise(function (resolve, reject) {
          resolve({ pageNum: 1, rows: [], tatol: 0 })
        })
        return p
      },
      // 是否首次加载表格
      first: true,
      showPagination: true,
      pagination: {
        hideOnSinglePage: false,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: total => `共有 ${total} 条数据`
      },
      // 路径
      downloadUrl: process.env.VUE_APP_API_BASE_URL + '/system/file/ftp/download',
      // templatePath: 'rdds-test/template/学生成绩导入模板.xlsx',
      templatePath: 'template/学生成绩表导入模板.xlsx',
      importUrl: tStudentScoreImport,
      // 隐藏列
      hiddenColumn: [],
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: checkPermission('frame:tStudentScore:add'),
      editEnable: checkPermission('frame:tStudentScore:edit'),
      removeEnable: checkPermission('frame:tStudentScore:remove'),
      exportEnable: checkPermission('frame:tStudentScore:export'),
      importEnable: checkPermission('frame:tStudentScore:import'),
      subjectCodeArray: [],
      subjectCodeMap: {},
      delFlagArray: [
        { dictValue: '0', dictLabel: '有效' }, { dictValue: '1', dictLabel: '无效' }],
      delFlagMap: {},
      // 共享数据
      shareData: {}
    }
  },
  filters: {
  },
  async created () {
    this.subjectCodeArray = await getDictArray('exam_subject')
    this.subjectCodeArray.forEach(e => {
      this.subjectCodeMap[e.dictValue] = e.dictLabel
    })
    this.shareData['subject_code_array'] = this.subjectCodeArray
    this.shareData['subject_code_map'] = this.subjectCodeMap
    this.delFlagArray.forEach(e => {
      this.delFlagMap[e.dictValue] = e.dictLabel
    })
    this.shareData['del_flag_array'] = this.delFlagArray
    this.shareData['del_flag_map'] = this.delFlagMap
  },
  mounted () {
    const that = this
    document.onkeydown = function (e) {
      const key = window.event.keyCode
      if (key === 13) {
        that.$refs.table.refresh(false)
      }
    }
  },
  methods: {
    dictRender (text, type) {
      return this.shareData[type + '_map'][text]
    },
    rowClick (record, index) {
      return {
        on: {
          dblclick: () => {
            if (this.editEnable) {
              this.handleEdit(record)
            } else {
              this.handleView(record)
            }
          }
        }
      }
    },
    tablefresh () {
      if (this.first) {
        this.loadData = parameter => {
          return getTStudentScoreList(Object.assign(parameter, this.queryParam))
        }
        this.$nextTick(() => {
          this.$refs.table.refresh(false)
          this.first = false
        })
      } else {
        this.$refs.table.refresh(true)
      }
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleAdd () {
      this.$refs.modal.add()
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    delByIds (ids) {
      delTStudentScore({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        this.selectedRowKeys = []
      })
    },
    // 处理栏位配置
    handleColmunSetting (cols) {
      this.columns = cols
    },
    exportExcel () {
      exportExcel(tStudentScoreExport, this.queryParam)
    },
    // 批量导入
    batchImport () {
      this.$refs.importModal.show()
    }
  }
}
</script>
