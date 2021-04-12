import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/theme/element-#128488/index.css'
import qs from 'qs'      //引入qs

Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
