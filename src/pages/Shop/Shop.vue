<template>
  <div>
    <ShopHeader/>
    <router-link to="/shop/goods">
      <span>商品</span>
    </router-link>
    <router-link to="/shop/ratings">
      <span>评价</span>
    </router-link>
    <router-link to="/shop/info">
      <span>商家</span>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import ShopHeader from "../../components/ShopHeader/ShopHeader"
  export default {
    name: "Shop",
    mounted() {
      this.$store.dispatch('getGoods')
      //this.$store.dispatch('getRatings')
      //this.$store.dispatch('getInfo')
    },
    components:{
      ShopHeader
    }
  }
</script>

<style scoped>

</style>
