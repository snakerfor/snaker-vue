<template>
  <div class="right-btns">
    <a-popover placement="leftBottom" trigger="click" v-model="visible">
      <template slot="content">
        <!-- 弹出框 -->
        <div class="tableSelect">
          <a-checkbox-group :value="checkValues" :options="checkboxOptions" @change="checkChange" />
          <div style="text-align: right;margin-top: 10px;">
            <a-button size="small" type="primary" @click="favorSave">保存</a-button>
          </div>
        </div>
      </template>
      <a-button class="table">
        <a-icon type="table" />
      </a-button>
    </a-popover>
  </div>
</template>
<script>
import { getUserFavor, saveSysUserFavor } from '@/api/system'
import { isEqualArray } from '@/utils/util.js'
export default {
  name: 'ColumnSetting',
  props: {
    columns: { type: Array, default: () => { return [] } },
    hiddenColumn: { type: Array, default: () => { return [] } }
  },
  components: {
  },
  data () {
    return {
      visible: false,
      type: 'column_setting',
      columnsAll: Object.assign(this.columns),
      hideColumn: Object.assign(this.hiddenColumn) || [],
      pre: '',
      checkValues: []
    }
  },
  computed: {
    checkboxOptions: function () {
      const re = []
      this.columnsAll.forEach(col => {
        if (!this.hideColumn.includes(col.dataIndex)) {
          re.push({ label: col.title, value: col.dataIndex })
        }
      })
      return re
    },
    checkSelectedAll: function () {
      return this.checkboxOptions.map(op => {
        return op.value
      })
    },
    reCol: function () {
      return this.columnsAll.filter(col => {
        if (this.hideColumn.includes(col.dataIndex)) {
          return false
        }
        if (this.checkValues.includes(col.dataIndex)) {
          return true
        }
      })
    }
  },
  created () {
    this.intiSetting()
  },
  methods: {
    checkChange (val) {
      this.checkValues = val
      this.$emit('ok', this.reCol)
    },
    // 初始化已设定的列
    intiSetting () {
      // 未配置 默认选中全部
      getUserFavor({ type: this.type, routerPath: this.$router.currentRoute.name }).then(res => {
        if (res.code === 0) {
          console.info(res.data)
          if (res.data) {
            this.checkValues = res.data.split(',')
            this.pre = res.data.split(',')
            this.$emit('ok', this.reCol)
          } else {
            // 未配置 默认选中全部
            this.checkValues = this.checkSelectedAll
            this.pre = this.checkSelectedAll
          }
        }
      }).catch(() => {
        this.$message.error('系统错误，请稍后再试')
      })
    },
    // 保存设定值
    favorSave () {
      if (isEqualArray(this.pre, this.checkValues)) {
        this.$message.warning('配置项未发生变化')
        return
      }
      console.info(this.checkValues)
      saveSysUserFavor({ 'type': this.type, 'routerPath': this.$router.currentRoute.name, 'record': this.checkValues.join(',') }).then(res => {
        if (res.code === 0) {
          this.visible = false
          this.$message.success('保存成功')
        }
      }).catch(() => {
        this.$message.error('系统错误，请稍后再试')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tableSelect {
  background: #fff;
  display: inline-block;
  width: 180px;
}
</style>
