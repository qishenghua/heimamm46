// 导入axios
import axios from 'axios'
// 用户登录接口的抽取
// 为了更加方便的设置每个模块的请求，一般会通过create创建新的请求对象
const indexRequest = axios.create({
    // 基地址
    baseURL:process.env.VUE_APP_URL,
    withCredentials:true  //是否携带跨域cookie  默认为false
})
// 获取token
import  {getToken}  from '../../src/utils/token'
// 用户信息接口抽取
export function info(){
    return   indexRequest({
        url:'/info',
        method:'get',
       headers:{
           token:getToken()
       }
      
      })
}
// 退出登录接口抽取
export function logout(){
    return   indexRequest({
        url:'/logout',
        method:'get',
       headers:{
           token:getToken()
       }
      
      })
}