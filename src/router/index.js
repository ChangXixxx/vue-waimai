import Vue from "vue"
import VueRouter from 'vue-router'
const Home = () => import('../pages/Home/Home')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')
const Search = () => import('../pages/Search/Search')
const Login = () => import('../pages/Login/Login')
const Shop = () => import('../pages/Shop/Shop')
const ShopGoods = () => import('../pages/ShopGoods/ShopGoods')
const ShopRatings = () => import('../pages/ShopRatings/ShopRatings')
const ShopInfo = () => import('../pages/ShopInfo/ShopInfo')

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/order',
    component:Order
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/search',
    component:Search
  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/shop',
    component:Shop,
    children:[
      {
        path: '/',
        component:ShopGoods
      },
      {
        path:'/shop/goods',
        component:ShopGoods
      },
      {
        path:'/shop/ratings',
        component:ShopRatings
      },
      {
        path: '/shop/info',
        component:ShopInfo
      }
    ]
  }
]

export default new VueRouter({
  routes
})
