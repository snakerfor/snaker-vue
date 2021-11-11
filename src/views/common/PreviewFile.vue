<template>
  <div style="display:none">
    <viewer :options="options" :images="images" class="viewer" ref="viewer" @inited="inited">
      <img v-for="src in images" :src="src" :key="src" class="image">
    </viewer>
    <show-pdf-modal2 ref="showPdfModal2" />
  </div>
</template>
<script>
import Vue from 'vue'
import Viewer from 'v-viewer'
import { getFileById } from '@/api/rdds'
import 'viewerjs/dist/viewer.css'
import warterMark from '@/utils/warterMark'
import ShowPdfModal2 from '@/views/rdds/modules/ShowPdfModal2.vue'
import store from '@/store'
Vue.use(Viewer)
export default {
  name: 'PreviewFile',
  components: {
    ShowPdfModal2
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
      images: [],
      treeData: []
    }
  },
  filters: {
  },
  created () {
    this.fileId = this.$route.query.fileId
    this.showFile(this.fileId)
  },
  methods: {
    inited (viewer) {
      this.$viewer = viewer
    },
    showFile (fileId) {
      getFileById(fileId).then(res => {
        if (res) {
          if (res.fileTypeEnum === 'IMAGE') {
            this.previewImage = this.downloadUrl + '/' + fileId
            this.images = [this.previewImage]
            this.$viewer.show()
          } else if (res.fileTypeEnum === 'PDF' || res.fileTypeEnum === 'WORD' || res.fileTypeEnum === 'EXCEL' || res.fileTypeEnum === 'PPT') {
            this.$refs.showPdfModal2.edit(fileId)
          } else {
            window.location.href = this.downloadUrl + '/' + fileId
          }
        }
      })
    }
  },
  watch: {
  }
}
</script>
