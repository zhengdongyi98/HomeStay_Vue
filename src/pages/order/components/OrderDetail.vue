<template>
  <div >
    <NavMenu></NavMenu>
    <div style="margin-top: 120px;width: 70%;margin-left: 15%;">
      <div>
        <div style="margin-top: 30px; display: flex">
          <div>
            <span style="font-size: 20px;font-weight: bolder;">订单状态：{{getOrderStatus}}</span>
          </div>
          <div style="margin-left: 100px;">
            <div v-if="orderDetail.orderStatus===0">
              <el-button type="primary"  :size="small" @click="overOrder">完成行程</el-button>
            </div>
          </div>


        </div>
        <div v-if="orderDetail.orderStatus===0">
          <div style="margin-top: 10px;text-align: center">
            <span style="font-size: 32px;font-weight: bolder">您即将入住{{orderDetail.host.userName}}的房源</span>
          </div>
          <div style="margin-top: 10px;text-align: center">
            <span style="font-size: 16px;rgb(113, 113, 113) !important;">{{orderDetail.room.baseRoom.location}}·{{getOrderedTime}}</span>
          </div>
        </div>
        <div v-if="orderDetail.orderStatus===3||orderDetail.orderStatus===4">
          <div style="margin-top: 10px;text-align: center">
            <span style="font-size: 32px;font-weight: bolder">您入住了{{orderDetail.host.userName}}的房源</span>
          </div>
          <div style="margin-top: 10px;text-align: center">
            <span style="font-size: 16px;rgb(113, 113, 113) !important;">{{orderDetail.room.baseRoom.location}}·{{getOrderedTime}}</span>
          </div>
        </div>
        <div style="height: 450px;width: 70%;margin-left: 15%;margin-top: 10px;"
             @click="jumpToRoomDetail(orderDetail.room.rId)">
          <el-carousel height="350px">
            <el-carousel-item v-for="item in orderDetail.room.baseRoom.roomImages" :key="item">
              <img
                      style="border-radius: 4px; cursor: pointer"
                      :src="item"
                      class="image"
                      width="100%"
                      height="100%"
              />
            </el-carousel-item>
          </el-carousel>
          <div>
            <span style="font-size: 22px;font-weight: bolder">{{orderDetail.room.baseRoom.roomName}}</span>
          </div>
        </div>

        <div style="height: 450px;width: 70%;margin-left: 15%;margin-top: 10px;">
          <el-divider></el-divider>
          <div style="display: flex">
            <div>
              <div><span>概览</span></div>
              <div><span>房东：<el-button type="text">{{orderDetail.host.userName}}</el-button></span></div>
              <div><span>{{orderDetail.room.baseRoom.category}}·{{orderDetail.room.baseRoom.type}}·{{orderDetail.room.baseRoom.capacity}}人</span>
              </div>
              <div><span>总费用：￥{{orderDetail.totalPrice}}</span></div>
            </div>
            <div>
              <div>
                <div class="demo-basic--circle">
                  <div class="block"><el-avatar :size="50" :src="orderDetail.host.icon"></el-avatar></div>
                </div>
              </div>
            </div>
          </div>

          <div id="container" style="margin-top: 20px;"></div>
          <el-divider></el-divider>
          <div style="margin-top: 30px;" v-if="orderDetail.orderStatus===3">
            <div><span style="font-size: 18px;font-weight: bolder">评论</span></div>
            <div style="margin-top: 10px;">
              <el-input placeholder="请输入内容" v-model="commentObj.content">
              </el-input>
            </div>
            <div style="margin-top: 10px;">
              <span style="font-size: 18px;font-weight: bolder">满意程度：</span><el-rate v-model="commentObj.score" style="margin-top: 10px;"></el-rate>
            </div>
            <div style="display: flex;margin-top: 10px;">
              <div style="float: right;">
                <el-button type="primary" @click="commentRoom">评论</el-button>
              </div>
            </div>
          </div>
          <div style="margin-top: 30px;" v-if="orderDetail.orderStatus===4">
            <div><span style="font-size: 18px;font-weight: bolder">评论</span></div>
            <div style="margin-top: 10px;">
              {{this.orderDetail.content}}
            </div>
            <div style="margin-top: 10px;">
              <span style="font-size: 18px;font-weight: bolder">满意程度：</span><el-rate  disabled v-model="orderDetail.score" style="margin-top: 10px;"></el-rate>
            </div>
          </div>
          <div style="margin-top: 30px;height: 100px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavMenu from "../../../components/TopNav/NavMenu";
  import {createComment, overOrder} from "../../../service/order";

  export default {
    name: "OrderDetail",
    data() {
      return {
        orderDetail: {},
        commentObj:{
          'uId':"",
          'rId':"",
          'hId':"",
          'content':"",
          'score':"",
          'orderNo':""
        }
      }
    },
    methods: {
      initOrderDetail() {
        this.orderDetail = JSON.parse(this.$route.query.orderDetailData);
        this.commentObj.uId=this.$store.state.user['uId'];
        this.commentObj.rId = this.orderDetail.room.baseRoom.rId;
        this.commentObj.hId = this.orderDetail.room.baseRoom.uId;
        this.commentObj.orderNo = this.orderDetail.orderNo;
      },
      jumpToRoomDetail(rId) {
        if (localStorage.getItem("token") === "null") {
          this.$message.error("请先登录");
        } else {
          window.open("http://localhost:8080/#/roomDetail?id=" + rId)
        }
      },
      async commentRoom(){
        console.log(this.commentObj);
        const data = await createComment(this.commentObj);
        if (data.data==='1'){
          this.orderDetail.orderStatus=4
          this.orderDetail.content = this.commentObj.content;
          this.orderDetail.score = this.commentObj.score;
          this.$message.success("评论成功，感谢您的反馈！")
        }
      },
      async overOrder(){
        const data = await overOrder(this.orderDetail.orderNo);
        this.orderDetail.orderStatus=3;
      }
    },
    components: {
      NavMenu
    },
    computed: {
      getOrderedTime() {
        let timeList = this.orderDetail.orderedTime.split(" ");
        let begin = timeList[0];
        let end = timeList[1];
        let num = timeList.length;
        if (num === 1) {
          return begin + "·  共" + num + "天" + num + "晚";
        } else {
          return begin + "/" + end + "   " + "·  共" + num + "天" + num + "晚";
        }
      },
      getOrderStatus(){
        switch (this.orderDetail.orderStatus) {
          case 0:
            return "已支付，未完成"
          case 2:
            return "待支付"
          case 3:
            return "已完成，待评价"
          case 4:
            return "已完成"
        }
      }
    },
    mounted(){
      const location =this.orderDetail.room.roomDetail.locationDetail.split(",");
      this.map = new AMap.Map("container", {
        zoom: 17, //级别
        center: location, //中心点坐标
        viewMode: "3D", //使用3D视图
      });
      var marker = new AMap.Marker({
        position: new AMap.LngLat(location[0], location[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      });
      this.map.add(marker);
    },
    created() {
      this.initOrderDetail()
    }
  }
</script>

<style scoped>

  #container {
    width: 100%;
    height: 300px;
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
