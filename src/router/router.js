import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/home/Home.vue";
import RoomDetail from "../pages/roomDetail/RoomDetail.vue";
import CitySearch from "../pages/roomSearch/RoomSearch.vue"
import NewRoom from "../pages/newRooms/NewRoom.vue"
import AddBaseRoom from "../pages/newRooms/components/AddBaseRoom"
import AddDetail from "../pages/newRooms/components/AddDetail"
import AddImages from "../pages/newRooms/components/AddImages"
import AddPrice from "../pages/newRooms/components/AddPrice"
import store from "../store/store";
import PersonInfo from "../pages/personInfo/PersonInfo";
import Account from "../pages/personInfo/Account";
import RoomSearch from "../pages/roomSearch/RoomSearch";

Vue.use(Router);

//避免重复跳转
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

//界面刷新时，重新赋值token
if (window.sessionStorage.getItem("token")) {
  store.commit("set_token", sessionStorage.getItem("token"));
}



export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "民宿预订平台",
      component: Home,
    },
    {
      path: "/roomDetail",
      name: "房源详情",
      component: RoomDetail,
    },
    {
      path: "/roomSearch",
      name: "roomSearch",
      component: RoomSearch,
    },
    {
      path: "/personInfo",
      name: "个人资料",
      component: PersonInfo,
    },
    {
      path: "/account",
      name: "账号",
      component: Account,
    },
    {
      path: "/newRoom",
      name: "成为房东",
      component: NewRoom,
      children: [
        {
          path: "/addBaseRoom",
          name: "基本信息",
          component: AddBaseRoom,
        },
        {
          path: "/addDetail",
          name: "详细信息",
          component: AddDetail,
        },
        {
          path: "/addImages",
          name: "图片信息",
          component: AddImages,
        },
        {
          path: "/addPrice",
          name: "价格信息",
          component: AddPrice,
        }
      ]
    },

  ],
});

