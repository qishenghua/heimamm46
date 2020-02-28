import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 导入router
import router from './router/index.js'
new Vue({
  // 挂载到顶级实例上
  router,
  render: h => h(App),
}).$mount('#app')
