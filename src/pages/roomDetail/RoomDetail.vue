<template>
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
    {{ data.user.userName }}
  </div>
</template>

<script>
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
    },
  },
  created() {
    this.fetchData();
  },
  watch: {},
  components: {},
};
</script>

<style>
.image-container {
  margin-top: 80px;
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
</style>
