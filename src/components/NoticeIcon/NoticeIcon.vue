<template>
  <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="">
    <a-badge :count="tasks.total">
      <a-icon style="font-size: 16px; padding: 4px" type="bell" />
    </a-badge>
  </span>
</template>

<script>
// import ApproveModal from '@/views/activiti/modules/ApproveModal.vue'
export default {
  name: 'HeaderNotice',
  components: {
    // ApproveModal
  },
  props: {
    tasks: { type: Object, default: () => { return {} } }
  },
  data () {
    return {
      loading: false,
      visible: false,
      count: 0
    }
  },
  computed: {
    taskList () {
      return this.tasks.rows.length > 4 ? this.tasks.rows.slice(0, 4) : this.tasks.rows
    }
  },
  methods: {
    fetchNotice () {
      // this.visible = !this.visible
      this.openApprove()
    },
    openApprove (record) {
      console.info(record)
      if (record) {
        this.$refs.approveNotice.show(record)
      } else {
        this.$router.push({ name: 'tasking' })
        this.visible = !this.visible
      }
    }
  }
}
</script>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>
<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
</style>
