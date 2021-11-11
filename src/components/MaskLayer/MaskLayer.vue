<template>
  <div v-show="loadingMask" class="loading-mask">
    <a-spin size="large" style="position:absolute;top:100px" />
  </div>
</template>
<script>
export default {
  name: 'MaskLayer',
  props: {
    loadingMask: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.loading-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #ffffff96;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
