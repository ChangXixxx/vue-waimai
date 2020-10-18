//直接修改state属性的模块
import {
  reqAddress,
  reqFoodsCateList,
  reqShopList,
  reqUserInfo,
  reqGoods,
  reqRatings,
  reqInfo
} from '../api/index'
import {
  RECIEVE_ADDRESS,
  RECIEVE_FOOTSCATE,
  RECIEVE_SHOPS,
  RECIEVE_USERINFO,
  RECIEVE_GOODS,
  RECIEVE_RATINGS,
  RECIEVE_INFO
} from './mutation-types'

export default {
  //包含许多的异步actions
  //异步获取地址，第一个参数类似react中的dispatch，用于把服务器返回的数据保存在同步action中
  async getAddress({commit,state}){
    const geohash = state.latitude+','+state.longitude
    const result = await reqAddress(geohash)
    if(result.code === 0)
      commit(RECIEVE_ADDRESS,{address:result.data})
  },
  //异步获取食品分类列表
  async getFoodsCate({commit}){
    const result = await reqFoodsCateList()
    if(result.code === 0)
      commit(RECIEVE_FOOTSCATE,{foodsCate:result.data})
  },
  //异步获取附近商家列表
  async getShops({commit,state}){
    const {latitude,longitude} = state
    const result = await reqShopList({latitude,longitude})
    if(result.code === 0)
      commit(RECIEVE_SHOPS,{shops:result.data})
  },
  //得到用户信息
  getUserInfo({commit},userInfo){
    commit(RECIEVE_USERINFO,{userInfo})
  },
  //实现自动登录的功能
  async getUser({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      commit(RECIEVE_USERINFO,{userInfo:result.data})
    }
  },
  async getGoods({commit}){
    const result = await reqGoods()
    if(result.code === 0){
      commit(RECIEVE_GOODS,{goods:result.data})
    }
  },
  async getRatings({commit}){
    const result = await reqRatings()
    if(result.code === 0){
      commit(RECIEVE_RATINGS,{ratings:result.data})
    }
  },
  async getInfo({commit}){
    const result = await reqInfo()
    if(result.code === 0){
      commit(RECIEVE_INFO,{info:result.data})
    }
  }
}
