// 导入axios
import axios from 'axios'
export function sendsms(data){
    return   axios({
        url:process.env.VUE_APP_URL+'/sendsms',
        method:'post',
        data,
       withCredentials:true  //是否携带跨域cookie  默认为false
      })
}
export function  register(data){
    return   axios({
        url:process.env.VUE_APP_URL+'/register',
        method:'post',
        data,
       withCredentials:true  //是否携带跨域cookie  默认为false
      })
}