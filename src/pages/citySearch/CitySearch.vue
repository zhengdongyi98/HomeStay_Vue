<template>
  <div>
      <NavMenu></NavMenu>
      <div class="searchCondition">
        <el-row>
          <el-button type="primary" plain size="small">日期</el-button>
          <el-button type="primary" plain size="small">人数</el-button>
          <el-button type="primary" plain size="small">房源类型</el-button>
          <el-button type="primary" plain size="small">价格</el-button>
          <el-button type="primary" plain size="small">位置</el-button>
          <el-button type="primary" plain size="small">更多筛选条件</el-button>
        </el-row>
      </div>
    <el-container style="height: 100%;margin-top: 165px!important;margin-bottom: 40px!important;">
      <el-header>
        <div>
          <span style="color: #000;font-weight: 600 !important;margin-bottom: 0px !important;font-size: 22px !important;line-height: 26px !important;">
            300多处住宿
          </span>
        </div>
      </el-header>
      <el-main>
        <div class="main-card-container">
          <el-row :gutter="20">
            <el-col
                    style="width: 25%"
                    :span="8"
                    v-for="(item, i) in roomList.slice(0, 12)"
                    :key="i"
            >
              <div @click="jumpToRoomDetail(item.rId)">
                <Rooms :cardData="item" ></Rooms>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-footer>
        <div>
          <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="100">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>

  </div>


</template>

<script>
  import NavMenu from "../../components/TopNav/NavMenu";
  import Rooms from "../home/components/Rooms";
  import { getAllRooms } from "../../service/home";
  export default {
    name: "CitySearch",
    data() {
      return {
        roomList: [],
      }
    },
    components: {
      NavMenu,Rooms
    },
    methods:{
      async getData() {
        // 这里请求
        const res = await getAllRooms();
        this.roomList = res.data;
      },
      jumpToRoomDetail(rId) {
        if (localStorage.getItem("token") === "null") {
          this.$message.error("请先登录");
        } else {
          console.log(rId);
          this.$router.push(`/roomDetail?id=${rId}`);
        }
      },
    },
    created() {
      this.getData();
    },
    watch:{

    }
  }
</script>

<style scoped>

  .navRoot {
    border-bottom: 1px solid rgba(168, 168, 168, 0.4);
    position: fixed!important;
    top: 0;
    z-index: 999;
    background-color: white;
  }
  .searchCondition{
    width: 100%;
    position: fixed!important;
    top: 80px;
    z-index: 999;
    background-color: white;
  }

  .navRoot >>> .el-menu-item,
  .el-submenu {
    color: black !important;
  }

  .navRoot >>> .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    color: black !important;
  }

  .navRoot >>> #rightDiv > .el-menu-item:hover {
    border-bottom-color: black !important;
  }

  .navRoot >>> .el-button {
    color: black;
  }

  .navRoot >>> .el-submenu > .el-submenu__title {
    color: black;
    background-color: white;
    font-size: 18px;
  }

  .searchCondition {
    margin-top: 1px;
    padding-top: 10px;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(168, 168, 168, 0.4);
  }

  .searchCondition > .el-row > .el-button {
    margin-left: 15px;
    font-size: 14px;
  }
  .el-main{
    margin-bottom: 20px;
  }
  .el-pagination{
    text-align: center;
  }

</style>
