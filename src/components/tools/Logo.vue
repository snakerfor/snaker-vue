<template>
  <div class="logo">
    <router-link :to="{name:'dp'}">
      <!-- <LogoSvg alt="logo" /> -->
      <!-- <img src="~@/assets/sfd-logo.jpeg" alt="logo"> -->
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  // components: {
  //   LogoSvg
  // },
  props: {
    title: {
      type: String,
      default: '青龙管理系统',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style>
.logo img {
  width: 55px;
  height: 24px;
}
</style>
