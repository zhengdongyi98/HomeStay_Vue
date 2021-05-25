import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null, //对token进行监管,
    user: {},
    fileList:new FormData(),
    fileLists: { 'List1':[],'List2':[],'List3':[],'List4':[],'List5':[]},
    roomInfo: {
      'uId':-1,
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
      'houseRules': "",
      'timeList':"",
      'blockTime':[],
      "basePrice":""
    },
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
    set_user(state, user) {
      console.log(state.user);
      state.user = user; //设置store参数
      console.log(state.user['uId']);
      console.log(user);
      // sessionStorage.token = token; //设置系统参数
      localStorage.user = JSON.stringify(user);
    },
    del_user(state) {
      state.user = {};
      // sessionStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
