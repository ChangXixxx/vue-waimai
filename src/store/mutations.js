//间接修改state属性的模块
import {RECIEVE_ADDRESS,
  RECIEVE_FOOTSCATE,
  RECIEVE_SHOPS,
  RECIEVE_USERINFO,
  RESET_USERINFO,
  RECIEVE_GOODS,
  RECIEVE_RATINGS,
  RECIEVE_INFO} from './mutation-types'

export default {
  [RECIEVE_ADDRESS] (state,{address}){
    state.address = address
  },
  [RECIEVE_FOOTSCATE] (state,{foodsCate}){
    state.foodsCate = foodsCate
  },
  [RECIEVE_SHOPS] (state,{shops}) {
    state.shops = shops
  },
  [RECIEVE_USERINFO] (state,{userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USERINFO] (state){
    state.userInfo = {}
  },
  [RECIEVE_GOODS] (state,{goods}){
    state.goods = goods
  },
  [RECIEVE_RATINGS] (state,{ratings}){
    state.ratings = ratings
  },
  [RECIEVE_INFO] (state,{info}){
    state.info = info
  }
}
