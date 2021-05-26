<template>
  <div>
    <NavMenu></NavMenu>
    <div style="margin-top: 130px;width:70%;margin-left: 15%;">
      <div style="margin-top: 35px;">
        <span style="font-size: 32px !important;font-weight: 800 !important;">房源订单中心</span>
      </div>
      <div style="margin-top: 30px;border-bottom: 1px solid rgba(118, 118, 118,0.2)">
        <div>
          <el-button size="small" @click="selectOrderList(1)" round>全部订单</el-button>
          <el-button size="small" @click="selectOrderList(2)" round>有效订单</el-button>
          <el-button size="small" @click="selectOrderList(3)" round>待支付订单</el-button>
          <el-button size="small" @click="selectOrderList(4)" round>超时订单</el-button>
        </div>
      </div>
      <div style="margin-top: 30px;">
        <div>
          <div>
            <el-row :gutter="20" >
              <el-col
                      style="margin-top: 10px;"
                      :span="8"
                      v-for="(item, i) in selectedList"
                      :key="i"
              >
                <div @click="jumpToRoomDetail(item)">
                  <OrderRoom :cardData="item"></OrderRoom>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import NavMenu from "../../components/TopNav/NavMenu";
  import {getOrderByCondition} from "../../service/order";
  import Rooms from "../home/components/Rooms";
  import OrderRoom from "./components/OrderRoom";
  import {Message} from "element-ui";
  export default {
    name: "OrderCenter",
    data() {
      return {
        allList: [],
        usefulList: [],
        unPayList: [],
        timeOutList: [],
        viewFlag: 1,
        selectedList:[]
      }
    },
    methods: {
      async initOrderCenter() {
        let data = await getOrderByCondition({'uId': this.$store.state.user['uId']});
        console.log(data.data);
        this.allList = data.data;
        this.usefulList = data.data.filter((item) => item.orderStatus === 0 || item.orderStatus === 3 || item.orderStatus === 4)
        this.unPayList = data.data.filter((item) => item.orderStatus === 2)
        this.timeOutList = data.data.filter((item) => item.orderStatus === 1)
        this.selectedList = data.data
      },
      selectOrderList(index) {
        switch (index) {
          case 1: this.selectedList = this.allList;break;
          case 2: this.selectedList = this.usefulList;break;
          case 3: this.selectedList = this.unPayList;break;
          case 4: this.selectedList = this.timeOutList;break;
          default: this.selectedList = this.allList;break;
        }
      },
      jumpToRoomDetail(item) {
        if (localStorage.getItem("token") === "null") {
          this.$message.error("请先登录");
        } else {
          //判断是否为超时订单，是则跳转到房源界面
          if (item.orderStatus===1){
            window.open("http://localhost:8080/#/roomDetail?id="+item.room.baseRoom.rId)
          } else if (item.orderStatus===0||item.orderStatus===3||item.orderStatus===4){//判断是否为已完成/已支付未完成/已完成未评论，是则跳转到订单详情界面
            this.$router.push({
              path: "/orderDetail",
                query:{
                  'orderDetailData': JSON.stringify(item)
                }
            });
          }else {
            //判断是否为待支付订单，是则新窗口打开，支付
            this.$confirm("是否继续支付", '提示', {
              confirmButtonText: '支付',
              cancelButtonText: '取消',
              showCancelButton:"true",
              type: "warning"
            }).then(() => {
              this.$message({
                message: '成功!',
                onClose: this.continuePay(item),
                type:"success"
              });
            }).catch(() => {
              this.$message({
                message: '已取消',
                type: 'info',
              });
            });
          }
          // this.$router.push(`/roomDetail?id=${rId}`);
        }
      },
      continuePay(item){//继续支付
        window.open("http://localhost:8080/#/continuePay?orderNo="+item.orderNo)
      }
    },
    components: {
      OrderRoom,
      NavMenu,
    },
    created() {
      this.initOrderCenter();
    }
  }
</script>

<style scoped>

  .el-button {
    border: 0px !important;
  }


  .navRoot {
    border-bottom: 1px solid rgba(168, 168, 168, 0.4);
    position: fixed !important;
    top: 0;
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
</style>
