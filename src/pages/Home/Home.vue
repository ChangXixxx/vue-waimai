<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" v-if="!userInfo._id" to="/login">
        <span class="header_login_text">登录|注册</span>
      </router-link>
      <router-link class="header_login" slot="right" v-else to="/userinfo">
        <i class="iconfont icon-icon-copy"></i>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length > 0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in categorysArr">
            <a href="javascript:" class="link_to_food" v-for="c in item">
              <div class="food_container">
                <img :src="url+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination">hhh</div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/swiper-bundle.min.css'
  import {mapState} from 'vuex'

  import HeaderTop from "../../components/HeaderTop/HeaderTop"
  import ShopList from "../../components/ShopList/ShopList"
  export default {
    name: "Home",
    //得用函数写
    data(){
      return {
        url:'https://fuss10.elemecdn.com'
      }
    },
    computed:{
      //得到vuex中的state并提取其中的属性
      ...mapState(['address','foodsCate','userInfo']),
      categorysArr () {
        const max = 8
        const arr = []
        const {foodsCate} = this
        let smallArr = []
        foodsCate.forEach((c, index) => {
          if(smallArr.length===0) {
            arr.push(smallArr)
          }
          smallArr.push(c)
          if(smallArr.length===max) {
            smallArr = []
          }
        })
        return arr
      }
    },
    watch:{
      foodsCate(){//监视foodsCate的变化，一旦foodsCate发生变化，执行函数体
        this.$nextTick(() => {//页面加载完成后执行
          new Swiper('.swiper-container',{
            loop:true,//循环播放
            pagination:{
              el:'.swiper-pagination'
            }
          })
        })
      }
    },
    async mounted() {//页面加载完成后执行
      //得到食品分类列表
      this.$store.dispatch('getFoodsCate')
      //得到附近商家列表
      this.$store.dispatch('getShops')
    },
    components:{
      HeaderTop,
      ShopList
    }
  }
</script>


<style lang="stylus" rel="stylesheet">
  @import "../../assets/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
