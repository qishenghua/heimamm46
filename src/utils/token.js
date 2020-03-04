// 工具函数的抽取
// 设置token
// 定义一下key值
const  TOKENKEY = "heimamm"
export function setToken (token){
    window.localStorage.setItem(TOKENKEY,token)
}
// 获取token
export function getToken (){
  return  window.localStorage.getItem(TOKENKEY)
}
// 移除token
export function removeToken (){
    window.localStorage.removeItem(TOKENKEY)
}