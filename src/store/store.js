import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null, //对token进行监管
    roomInfo: {
      'category': "",
      'type': "",
      'location': "",
      'locationDetail': "",
      'capacity': 0,
      'bedRoomNumber': 0,
      'toilet': 0,
      'bedObjList':[],
      'amenities': "",
      'spaces': "",
      'roomName': "",
      'description': "",
      'recommendation': "",
      'rules': "",
      'timeList':"",
      'blockTime':"",
      "basePrice":"",
    },
    fileList: {},
  },
  mutations: {
    set_file(state,fileList){
      state.fileList = fileList;
    },

    set_token(state, token) {
      state.token = token; //设置store参数
      // sessionStorage.token = token; //设置系统参数
      localStorage.token = token;
    },
    del_token(state) {
      state.token = "";
      // sessionStorage.removeItem("token");
      localStorage.removeItem("token");
    },
  },
});
