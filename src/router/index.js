//导入Vue 
import Vue from 'vue'
// 导入Vue-Router
import VueRouter  from 'vue-router'
// 注册一下 use
Vue.use(VueRouter)
// 导入组件login
import login  from  '../views/login/login.vue'
// 导入组件index
import index  from  '../views/index/index.vue'
// 导入组件  数据概览  chart
import  chart  from  '../views/index/chart/chart.vue'
// 导入组件  用户列表  user
import  user  from  '../views/index/user/user.vue'
// 导入组件  题库列表  question
import  question  from  '../views/index/question/question.vue'
// 导入组件  企业列表  enterprise
import enterprise  from  '../views/index/enterprise/enterprise.vue' 
// 导入组件  学科列表  subject
import  subject  from  '../views/index/subject/subject.vue'
// 创建路由对象
const  router = new VueRouter({
    // 路由规则
    routes:[
        // 登录
       {
        path:'/login',
        component:login 
       },
    //    首页
       {
        path:'/index',
        component:index ,
        children:[
            // 配置组件 chart
            {
                path:'chart',
                component:chart
            },
            // 配置组件 user
            {
                path:'user',
                component:user
            },
            // 配置组件 question
            {
                path:'question',
                component:question
            },
            // 配置组件 enterprise
            {
                path:'enterprise',
                component:enterprise
            },
            // 配置组件 subject
            {
                path:'subject',
                component:subject
            },
        ]
       },
    ]
})
// 导入进度条组件
import NProgress  from 'nprogress'
// 导入进度条样式
import 'nprogress/nprogress.css'
// 前置导航守卫
router.beforeEach((to, from, next) => {
    // 开启精度条
    NProgress.start();
    // 必须往后执行
    next()
  })
//  后置导航守卫
router.afterEach(() => {
    // 关闭精度条
    NProgress.done();
  })
// 暴露出去
export default router