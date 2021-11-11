<template>
  <a-popover v-model="visible" trigger="click" placement="bottomRight" overlayClassName="header-notice-wrapper" :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true" :arrowPointAtCenter="true" :overlayStyle="{ width: '300px', top: '50px' }">
    <template slot="content">
      <a-spin :spinning="loading">
        <a-tabs>
          <!-- <a-tab-pane tab="通告" key="1">
            <a-list>
              <a-list-item>
                <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane> -->
          <!-- <a-tab-pane tab="消息" key="2">
            123
          </a-tab-pane> -->
          <a-tab-pane tab="待办" key="3">
            <a-list item-layout="horizontal" :data-source="taskList">
              <a-list-item slot="renderItem" slot-scope="task">
                <a @click="openApprove()">{{ task.processName }}</a>
              </a-list-item>
            </a-list>
            <div style="margin-top: 9px;padding-top: 8px;border-top: 1px solid #d4c2c2;">
              <a @click="openApprove()">查看更多</a>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-badge :count="tasks.total">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
    <!-- <approve-modal ref="approveNotice" :audit="true" @ok="handleOk" /> -->
  </a-popover>
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
      this.visible = !this.visible
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
