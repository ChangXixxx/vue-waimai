//mockjs 可以随机生成json数据 拦截ajax请求
import Mock from 'mockjs'
import data from './data.json'

//Mock.mock(url,templete) 根据uri地址以模板的结构返回json数据
//获取goods数据
Mock.mock('/goods',{code:0,data:data.goods})
//获取ratings数据
Mock.mock('/ratings',{code:0,data:data.ratings})
//获取info数据
Mock.mock('/info',{code:0,data:data.info})
