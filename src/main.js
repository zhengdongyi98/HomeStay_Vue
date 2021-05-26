import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import ElementUI from "element-ui";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/theme/element-#128488/index.css";
import qs from "qs"; //引入qs
import Axios from "axios";
import JSEncrypt from 'jsencrypt';
Vue.prototype.$getRsaCode = function(str){ // 注册方法
  let pubKey = `-----BEGIN PUBLIC KEY-----
 MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb8sSIr7fCpfEwPTGK8IZK2IGi5T7O8bUIjdNKt28KeBs53pHC7KN2RbjUDrxNmgx0nhm0cJ9bOg62GxG1qMPYictMuSWZbShryjSQDL53g9LG7uE0GsRGBIyQM5//1RVGbw6Cm4WzgGX96j7IoJvQML4x7Ndg3+vbtILrRDPEiwIDAQAB
  -----END PUBLIC KEY-----`;// ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  let  data = encryptStr.encrypt(str.toString());  // 进行加密
  return data;
}


Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Antd);
Axios.defaults.headers.common["Authentication-Token"] = null; //为头部设置新参数

import {Message,MessageBox} from 'element-ui'

Vue.prototype.$message=Message;
Vue.prototype.$confirm=MessageBox.confirm;


router.beforeEach((to,from,next)=>{
  console.log(to);
  document.title = to.name
  next()
})

//跳转后始终在顶部
router.afterEach(()=>{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  console.log("----");
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
