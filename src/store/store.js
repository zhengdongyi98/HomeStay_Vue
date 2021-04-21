import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token:null//对token进行监管
  },
  mutations:{
    set_token(state, token) {
      state.token = token//设置store参数
      sessionStorage.token = token//设置系统参数
    },
    del_token(state) {
      state.token = ''
      sessionStorage.removeItem('token')
    }
  }
})
