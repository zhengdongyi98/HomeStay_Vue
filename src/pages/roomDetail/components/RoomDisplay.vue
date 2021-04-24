<template>
  <el-container>
    <el-main>
      <div class="category">
        <span>{{RoomDetailData.baseRoom.category}}·{{RoomDetailData.baseRoom.type}}</span>
      </div>
      <div class="roomName">
        <span>{{RoomDetailData.baseRoom.roomName}}</span>
      </div>
      <div class="bedRooms">
        <span>{{RoomDetailData.bedRooms.bedNumber}}··{{RoomDetailData.roomDetail.toilet}}·{{RoomDetailData.bedRooms.bedNumber}}</span>
      </div>
    </el-main>
    <el-aside></el-aside>
  </el-container>

</template>
<script>
  import RoomDetail from "../RoomDetail";

  export default {
    data() {
      return {
        activeName: 'RoomDisplay',
      };
    },
    methods: {
      beds(){
        console.log(this.RoomDetailData.bedRooms.bedType);
        return this.RoomDetailData.bedRooms.bedType+" 111";
      }
    },
    props: {
      RoomDetailData: {
        type: Object,
      },
    },
    computed: {

    }
  };
</script>

<style scoped>
.el-container{
  margin-left: 10%;
  margin-right: 10%;
  height: 1000px;
  /*width: 100%;*/
}
  .el-main{
    padding: 10px;
    width: 66.66%!important;
    border: black solid 1px;
  }
  .el-aside{
    width: 33.33% !important;
    border: red solid 1px;
  }
  .category>span{
    color: rgb(88, 76, 62);
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑, "Microsoft YaHei", "Heiti SC", sans-serif !important;
    font-size: 12px !important;
    font-weight: 800 !important;
    line-height: 1.33333em !important;
  }
  .roomName{
    margin-top: 5px !important;
    overflow-wrap: break-word !important;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑, "Microsoft YaHei", "Heiti SC", sans-serif !important;
    font-size: 32px !important;
    font-weight: 800 !important;
    line-height: 1.125em !important;
    color: rgb(72, 72, 72) !important;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }
</style>
