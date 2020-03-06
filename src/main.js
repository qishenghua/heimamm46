import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 导入router
import router from './router/index.js'
// 导入饿了么样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入公共样式
import '../src/style/base.css'
//导入仓库
import store  from './store/index'

new Vue({
  // 挂载到顶级实例上
  router,
  store,
  render: h => h(App),
}).$mount('#app')
