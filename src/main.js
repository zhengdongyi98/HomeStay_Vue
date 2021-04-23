import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/theme/element-#128488/index.css";
import qs from "qs"; //引入qs
import Axios from "axios";
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Axios.defaults.headers.common["Authentication-Token"] = null; //为头部设置新参数

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
