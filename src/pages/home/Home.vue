<template>
  <div>
    <el-container>
      <el-header style="height: 530px">
        <NavMenu></NavMenu>
        <div style="display: flex; justify-content: center">
          <!-- <div class="search-area">NavSearch</div> -->
          <div style="position: relative; top: 350px"><NavSearch/></div>
        </div>
      </el-header>
      <el-main style="display: flex; justify-content: center">
        <div style="width: 85%">
          <div style="margin: 15px 0px 30px 0px; font-weight: bolder">
            <h2>夏季特惠房源</h2>
            <div>品质房源，低至 5 折</div>
          </div>
          <el-scrollbar class="SideBar-scrollbar">
            <CitySelect :setSelectCity="setSelectCity" />
          </el-scrollbar>
          <div class="main-card-container">
            <el-row :gutter="20">
              <el-col
                :span="8"
                v-for="(item, i) in roomList.slice(0, 6)"
                :key="i"
              >
                <div @click="jumpToRoomDetail(item.rId)">
                  <Rooms :cardData="item"></Rooms>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="moreRoom">
            <router-link :to="{path: '/roomSearch',query: {location: selectCity}}"  tag="a"
                         style="color: rgb(0, 132, 137) !important;">查看更多{{selectCity}}房源 ></router-link>
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
import NavSearch from "../../components/TopNav/NavSearch";
import { getAllRooms ,getHomeRooms} from "../../service/home";
export default {
  name: "Home",
  data() {
    return {
      roomList: [],
      selectCity: "重庆", // 当前选中的城市
    };
  },
  methods: {
    async getData() {
      // 这里请求
      const res = await getHomeRooms({'location':this.selectCity});
      this.roomList = res.data.list;
    },
    setSelectCity(city) {
      this.selectCity = city;
    },
    jumpToRoomDetail(rId) {
      if (localStorage.getItem("token") === "null") {
        this.$message.error("请先登录");
      } else {
        console.log(rId);
        // window.open("http://localhost:8080/#/roomDetail?id="+rId)
        this.$router.push(`/roomDetail?id=${rId}`);
      }
    },
  },
  created() {
    this.getData();
    console.log("111111");
    console.log(this.$store.state);
  },
  watch: {
    selectCity: function (newVal, oldVal) {
      console.log(newVal); // 这里监听到选择城市的变化，发请求渲染当前选择的城市数据
      this.getData()
    },
  },
  components: {
    NavMenu,
    Rooms,
    CitySelect,
    NavSearch,
  },
};
</script>

<style scoped>
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
  .moreRoom{
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
  }
</style>
