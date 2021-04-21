import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home/Home.vue'
import store from '../store/store'

Vue.use(Router)

//避免重复跳转
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//界面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
