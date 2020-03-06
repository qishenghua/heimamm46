// 导入Vue
import Vue  from   'vue'
// 导入Vuex
import Vuex  from   'vuex'
// use一下
Vue.use(Vuex)
// 实例化  创建创库对象
const store = new Vuex.Store({
    state:
        {
            // 用户头像
        userIcon:'',
        // 用户昵称
        username:''
        },
        
       mutations:{
        //    修改头像
           changeIcon(state,newIcon){
               state.userIcon=newIcon
           },
        //    修改昵称
           changeName(state,newName){
               state.username=newName
           }
       }
        
        
    
})
// 暴露出去
export default store