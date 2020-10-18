import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import {Button} from 'mint-ui'
//加载mockServer.js即可执行该文件 无需暴露
import './mock/mockServer'

Vue.config.productionTip = false
Vue.component(Button.name,Button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
