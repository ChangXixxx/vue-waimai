<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isShow}" @click="isShow = true">短信登录</a>
          <a href="javascript:;" :class="{on:!isShow}" @click="isShow = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="submit">
          <div :class="{on:isShow}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone"/>
              <button :disabled="!rulePhone" class="get_verification"
                      :class="{text_right:rulePhone}" @click.prevent="getCode">
                {{text}}</button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isShow}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="switchShow ? 'password' : null" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button off" :class="{on:switchShow,off:!switchShow}" @click="switchShow = !switchShow">
                  <div class="switch_circle"></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" @closeTip="closeTip" v-if="alert"/>
  </section>
</template>

<script>
  import AlertTip from "../../components/AlertTip/AlertTip"
  import {reqSendCode,reqLoginPhone,reqLoginPwd} from '../../api/index'
  export default {
    name: "Login",
    components: {AlertTip},
    data(){
      return {
        isShow:true,
        switchShow:false,
        flag:true,
        phone:'',
        code:'',
        captcha:'',//图片验证码
        name:'',
        time:30,
        text:'获取验证码',
        pwd:'',
        alertText:'',
        alert:false
      }
    },
    methods:{
      async getCode(){
        if (this.flag){
          this.flag = false
          this.time = 30
          const interval = setInterval(() => {
            this.time --
            if(this.time < 0){
              this.flag = true;
              clearInterval(interval)
              this.text = '获取验证码'
              return
            }
            this.text = '已发送('+this.time+'s)'
          },1000)
          const result = await reqSendCode(this.phone)
          if(result.code === 1){
            this.showAlert('短信验证码发送失败')
            //停止计时
            if(!this.flag){
              this.time = 30
              this.flag = true;
              clearInterval(interval)
            }
          }
        }
      },
      closeTip(){
        this.alert = false
      },
      async submit(){
        let result
        if(this.isShow){//手机号登录
          const {code} = this
          if(!this.rulePhone || !/^\d{6}$/.test(code))
            this.showAlert('手机号或验证码格式不正确')
          else{
            result = await reqLoginPhone(this.phone,this.code)
          }
        }else{//用户名密码登录
          const {name,pwd,captcha} = this
          if(!name || !pwd || !captcha)
            this.showAlert('用户名、密码或验证码格式不正确')
          else
            result = await reqLoginPwd(name,pwd,captcha)
        }
        if(result.code === 1){
          this.showAlert(result.msg)
          //刷新图片验证码
          this.getCaptcha()
          this.captcha = ''
        }
        else {
          //将数据保存在vuex中
          this.$store.dispatch('getUserInfo',result.data)
          //跳转到个人中心界面
          this.$router.replace('/profile')
        }
      },
      showAlert(text){
        this.alert = true
        this.alertText = text
      },
      getCaptcha(){
        //每次点击图片验证码后重新发送请求
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
      }
    },
    computed:{
      rulePhone(){
        const reg = /^1[345678]\d{9}$/
        return reg.test(this.phone)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.text_right
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 20px
        left 10px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
