<template>
  <a-modal title="提示" :width="600" v-model="visible" :confirmLoading="confirmLoading" :footer="null">
    <a-result :status="resultStatus" :title="resultTitle" :sub-title="resultSubTitle">
      <template #extra>
        <a-button key="console" type="primary" @click="noShow">
          我知道了!
        </a-button>
      </template>
    </a-result>
  </a-modal>
</template>
<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  name: 'ResultModal',
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
      confirmLoading: false,
      mdl: {},
      headers: {
        token: Vue.ls.get(ACCESS_TOKEN)
      },
      // success  warning
      resultStatus: null,
      resultTitle: null,
      resultSubTitle: null
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    show (resultStatus, resultTitle, resultSubTitle) {
      this.visible = true
      this.resultStatus = resultStatus
      this.resultTitle = resultTitle
      this.resultSubTitle = resultSubTitle
    },
    noShow () {
      this.$emit('ok')
      this.visible = false
    }
  }
}
</script>
