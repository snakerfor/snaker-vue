<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item) in breadList" :key="item.name">
      <!-- <router-link v-if="item.name != name && index != 1" :to="{ path: item.path === '' ? '/' : item.path }">{{ item.meta.title }}</router-link> -->
      <span>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      breadList: []
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadList = []
      // this.breadList.push({name: 'index', path: '/dashboard/', meta: {title: '首页'}})

      this.name = this.$route.name
      this.$route.matched.forEach(item => {
        // item.name !== 'index' && this.breadList.push(item)
        if (item.name !== 'index') {
          this.breadList.push(item)
        }
      })
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style scoped>
</style>
