<template>
  <a-modal title="操作" style="top: 20px;" :width="950" :footer="null" v-model="visible">
    <a-card :bordered="false">
      <detail-list size="small" :col="2">
        <detail-list-item term="进程类型">{{ mdl.processType.desc }}</detail-list-item>
        <detail-list-item term="进程状态">{{ mdl.processStatus==='INIT'?'初始化':(mdl.processStatus==='DOING'?'处理中':(mdl.processStatus==='SUCCESS'?'成功':(mdl.processStatus==='FAIL'?'失败':mdl.processStatus))) }}</detail-list-item>
      </detail-list>
      <detail-list size="small" :col="2">
        <detail-list-item term="开始时间">{{ mdl.createTime }}</detail-list-item>
        <detail-list-item term="结束时间">{{ mdl.updateTime }}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <detail-list title="进程数据" size="small">
        <a-textarea :rows="3" v-model="mdl.processData" disabled style="color:#000" />
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
      <detail-list title="运行日志" size="small">
        <a-textarea :rows="15" v-model="mdl.processLog" disabled style="color:#000" />
      </detail-list>
      <a-divider style="margin-bottom: 32px" />
    </a-card>
  </a-modal>
</template>

<script>
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item

export default {
  name: 'OperLogModal',
  components: {
    DetailList,
    DetailListItem
  },
  props: {
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      mdl: {}
    }
  },
  created () {
  },
  methods: {
    detail (record) {
      this.mdl = Object.assign({}, record)
      if (this.mdl.processLog === null) {
        this.mdl.processLog = '无'
      }
      this.visible = true
    }
  }
}
</script>

<style scoped>
</style>
