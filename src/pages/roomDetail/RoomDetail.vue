<template>
  <div>
    <NavMenu></NavMenu>
  <div>
    <div class="image-container" :style="`height:${windowHeight * 0.6}px`">
      <div style="width: 50%; height: 100%; float: left">
        <div
          style="
            overflow: hidden;
            height: 100%;
            width: 100%;
            border: 2px black solid;
          "
        >
          <el-image
            class="room-image"
            :src="data.baseRoom.roomImages[0]"
            fit="cover"
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
      <div style="width: 50%; height: 50%; float: right; display: flex">
        <div
          style="
            overflow: hidden;
            width: 100%;
            height: 100%;
            border-top: 2px black solid;
            border-bottom: 2px black solid;
            border-right: 2px black solid;
          "
        >
          <el-image
            class="room-image"
            style="width: 100%; height: 100%"
            :src="data.baseRoom.roomImages[1]"
            fit="cover"
          />
        </div>
        <div
          style="
            overflow: hidden;
            height: 100%;
            width: 100%;
            border-top: 2px black solid;
            border-bottom: 2px black solid;
            border-right: 2px black solid;
          "
        >
          <el-image
            class="room-image"
            style="width: 100%; height: 100%"
            :src="data.baseRoom.roomImages[2]"
            fit="cover"
          />
        </div>
      </div>
      <div style="width: 50%; height: 50%; display: flex">
        <div
          style="
            overflow: hidden;
            height: 100%;
            width: 100%;
            border-bottom: 2px black solid;
            border-right: 2px black solid;
          "
        >
          <el-image
            class="room-image"
            style="width: 100%; height: 100%"
            :src="data.baseRoom.roomImages[3]"
            fit="cover"
          />
        </div>
        <div
          style="
            overflow: hidden;
            height: 100%;
            width: 100%;
            border-bottom: 2px black solid;
            border-right: 2px black solid;
          "
        >
          <el-image
            class="room-image"
            style="width: 100%; height: 100%"
            :src="data.baseRoom.roomImages[4]"
            fit="cover"
          />
        </div>
      </div>
    </div>
    <el-tabs  @tab-click="handleClick">
      <el-tab-pane label="详情" name="detail">详情</el-tab-pane>
      <el-tab-pane label="评价" name="comments">评价</el-tab-pane>
      <el-tab-pane label="可订日期" name="orderAble">可订日期</el-tab-pane>
      <el-tab-pane label="位置" name="location">位置</el-tab-pane>
      <el-tab-pane label="须知" name="notice">须知</el-tab-pane>
      <el-tab-pane label="房东" name="host">房东</el-tab-pane>
    </el-tabs>
    <RoomDisplay :RoomDetailData="data"></RoomDisplay>

  </div>
  </div>
</template>

<script>
  import NavMenu from "../../components/TopNav/NavMenu"
  import RoomDisplay from "../roomDetail/components/RoomDisplay"
import { getRoomById } from "../../service/room";
import { data } from "./data";
export default {
  name: "RoomDetail",
  data() {
    return {
      data: data,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    };
  },
  methods: {
    async fetchData() {
      const data = await getRoomById(this.$route.query.id);
      console.log(data); //这里请求获得房间详细数据
      this.data = data.data
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {
    this.fetchData();
  },
  computed: {

  },
  watch: {},
  components: {NavMenu,RoomDisplay},
};
</script>

<style scoped>
.navRoot >>> .el-menu-item,.el-submenu{
  color: black!important;
}
.navRoot >>> .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  color: black!important;
}
.navRoot >>> #rightDiv > .el-menu-item:hover {
  border-bottom-color: black !important;
}
.navRoot >>> .el-button {
  color: black
}
.image-container {
  background-color: black;
  width: 100%;
}
.room-image {
  cursor: pointer;
  transition: all 0.3s ease-in-out 0s;
}
.room-image:hover {
  transform: scale(1.05);
}
.el-tabs{
  margin-left: 6%;
  margin-right: 10%;
}
</style>
