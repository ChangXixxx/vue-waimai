<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="isShow"/>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
export default {
  name: 'App',
  created() {
    //调用异步action，得到用户的地址信息
    this.$store.dispatch('getAddress')
    //实现自动登录的功能
    this.$store.dispatch('getUser')
  },
  components: {
    FooterGuide
  },
  computed:{
    isShow() {
      const arr = ['/home','/search','/order','/profile']
      const temp = arr.find(value => this.$route.path === value)
      if(temp)
        return true
      else
        return false
    }
  }
}
</script>

<style>
</style>
