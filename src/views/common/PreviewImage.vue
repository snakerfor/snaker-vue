<template>
  <div style="display:none">
    <viewer :options="options" class="viewer" ref="viewer" @inited="inited">
      <img v-for="item in fileList" :src="item.src" :key="item.index" :alt="item.fileName" class="image">
    </viewer>
  </div>
</template>
<script>
import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import warterMark from '@/utils/warterMark'
import store from '@/store'
Vue.use(Viewer)
export default {
  name: 'PreviewFile',
  components: {
  },
  data () {
    return {
      options: {
        'hide': () => {
          warterMark.set('')
        },
        'show': () => {
          warterMark.set(store.getters.userInfo.loginName + '(' + store.getters.nickname + ')')
        }
      },
      downloadUrl: process.env.VUE_APP_API_BASE_URL + '/system/file/ftp/download',
      routeParam: {},
      currentIndex: '',
      fileList: []
    }
  },
  filters: {
  },
  created () {
    const current = this.$route.query.fileId
    const fileIds = this.$route.query.fileIds.split(',')
    const fileNames = this.$route.query.fileNames.split(',')
    fileIds.forEach((id, index) => {
      this.fileList.push({ index: index, fileId: id, fileName: fileNames[index], src: this.downloadUrl + '/' + id })
      if (current === id) {
        this.currentIndex = index
      }
    })
    this.$nextTick(() => {
      this.$viewer.view(this.currentIndex)
    })
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    }
  },
  watch: {
  }
}
</script>
