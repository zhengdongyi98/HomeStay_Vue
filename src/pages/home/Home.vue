<template>
  <div>
    <el-container>
      <el-header style="height: 530px">
        <NavMenu></NavMenu>
        <div style="display: flex; justify-content: center;">
          <div class="search-area"></div>
        </div>
      </el-header>
      <el-main style="display: flex; justify-content: center">
        <div style="width: 85%">
          <div style="margin: 15px 0px 30px 0px;font-weight: bolder;">
            <h2>春季特惠房源</h2>
            <div>品质房源，低至 5 折</div>
          </div>
          <el-scrollbar class="SideBar-scrollbar">
            <CitySelect :setSelectCity="setSelectCity" />
          </el-scrollbar>
          <div class="main-card-container">
            <el-row :gutter="20">
              <el-col :span="8" v-for="(item, i) in roomList" :key="i">
                <Rooms :cardData="item"></Rooms>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "../../components/TopNav/NavMenu";
import Rooms from "./components/Rooms";
import CitySelect from "./components/CitySelect";
import { getAllRooms } from "../../service/home";
export default {
  name: "Home",
  data() {
    return {
      roomList: [
        {
          rId: 40,
          uId: 3,
          category: "酒店式公寓",
          type: "整个房源",
          capacity: 2,
          roomName: "小恬家近火车站、城市生活广场，蓝色小兔120寸大投影屋",
          basePrice: 216,
          location: "江苏省苏州市相城区",
          roomImages: [
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614022342.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614023665.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614023755.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614027893.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614028263.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614030331.jpg",
          ],
        },
        {
          rId: 40,
          uId: 3,
          category: "酒店式公寓",
          type: "整个房源",
          capacity: 2,
          roomName: "小恬家近火车站、城市生活广场，蓝色小兔120寸大投影屋",
          basePrice: 216,
          location: "江苏省苏州市相城区",
          roomImages: [
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614022342.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614023665.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614023755.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614027893.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614028263.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614030331.jpg",
          ],
        },
        {
          rId: 40,
          uId: 3,
          category: "酒店式公寓",
          type: "整个房源",
          capacity: 2,
          roomName: "小恬家近火车站、城市生活广场，蓝色小兔120寸大投影屋",
          basePrice: 216,
          location: "江苏省苏州市相城区",
          roomImages: [
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614022342.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614023665.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614023755.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614027893.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614028263.jpg",
            "http://home-stay.oss-cn-hangzhou.aliyuncs.com/roomImages/1593614030331.jpg",
          ],
        },
      ],
      selectCity: "", // 当前选中的城市
    };
  },
  methods: {
    async getData() {
      // 这里请求
      const res = await getAllRooms();
      this.roomList = res.data
    },
    setSelectCity(city) {
      this.selectCity = city;
    },
  },
  created() {
    this.getData();
  },
  watch: {
    selectCity: function (newVal, oldVal) {
      console.log(newVal); // 这里监听到选择城市的变化，发请求渲染当前选择的城市数据
    },
  },
  components: {
    NavMenu,
    Rooms,
    CitySelect,
  },
};
</script>

<style>
.el-header {
  background-image: url("../../assets/image/封面.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.search-area {
  background-color: white;
  width: 80%;
  height: 72px;

}
</style>
