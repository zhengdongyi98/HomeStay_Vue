<template>
  <div>
      <NavMenu></NavMenu>
      <div class="searchCondition">
        <el-row>
          <el-popover
                  placement="bottom"
                  width="200"
                  open-delay="300"
                  trigger="hover">
            <el-date-picker
                    style="height: 60px;"
                    :picker-options="pickerOptions1"
                    @change="getTimeList"
                    value-format="yyyy-MM-dd"
                    v-model="query.timeAbled"
                    type="daterange"
                    clearable
                    start-placeholder="入住日期"
                    end-placeholder="退房日期"
            >
            </el-date-picker>
            <el-button :type="(query.timeAbled!==null&&query.timeAbled.length!==0)?'primary':''" slot="reference" v-text="(query.timeAbled!==null&&query.timeAbled.length!==0)?(query.timeAbled[0]+'至'+query.timeAbled[1]):'日期'">日期</el-button>

          </el-popover>
          <el-popover
                  placement="bottom"
                  width="200"
                  @hide="getCapacity"
                  trigger="click">
            <div style="display: flex">
              <el-input-number v-model="capacity" :min="0" size="small"></el-input-number>
              <el-button type="primary" size="small" @click="cancelCapacity">取消</el-button>
            </div>

            <el-button :type="capacity!==0?'primary':''" slot="reference" v-text="capacity!==0?(capacity+`人`):'人数'"></el-button>
          </el-popover>
          <el-popover
                  placement="bottom"
                  width="375"
                  @hide="getType"
                  trigger="click">
            <el-radio-group v-model="query.type" >
              <div>
                <el-radio border :label="`整个房源`">整个房源<span>（独享所有空间，无需与他人共用）</span></el-radio>
              </div>
              <div>
                <el-radio border :label="`独立房间`">独立房间<span>（单独卧室，与他人共享其它空间）</span></el-radio>
              </div>
              <div>
                <el-radio border :label="`合住房间`">合住房间<span>（与他人共享卧室以及其他的空间）</span></el-radio>
              </div>
            </el-radio-group>
            <div style="float: right;margin-top: 5px;"><el-button type="primary" size="small" @click="cancelType">取消</el-button></div>

            <el-button :type="query.type!==''?'primary':''" slot="reference" v-text="query.type!==''?query.type:'房源类型'"></el-button>
          </el-popover>
          <el-popover
                  placement="bottom"
                  width="250"
                  @hide="getPrice"
                  trigger="click">
            <div style="display: flex">
              <el-input v-model="lowPrice" placeholder="最低价格"  size="small"></el-input>
              <div style="margin-top: 5px;">&nbsp;至&nbsp;</div>
              <el-input v-model="highPrice" placeholder="最高价格"  size="small"></el-input>
            </div>
            <div style="float: right;margin-top: 5px;"><el-button type="primary" size="small"  @click="cancelPrice">重置</el-button></div>

            <el-button :type="(lowPrice!==''||highPrice!=='')?'primary':''" slot="reference" v-text="(lowPrice!==''||highPrice!=='')?`价格：`+(lowPrice===''?0:lowPrice)+`-`+(highPrice===''?`∞`:highPrice):'价格'">价格</el-button>
          </el-popover>

        </el-row>
      </div>
    <el-container style="height: 100%;margin-top: 165px!important;margin-bottom: 40px!important;" v-loading="fullscreenLoading">
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
                  :current-page="this.query.pageNum"
                  :total="total"
                  :hide-on-single-page="true"
                  :page-count="totalPage"
                  @size-change="sizeChange"
                  @current-change="currentChange"
                  @next-click="nextPage"
                  @prev-click="prevPage"
                  layout="prev, pager, next"
                  >
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
  import {getRoomPages,searchRooms} from "../../service/room";
  import { Loading } from 'element-ui';
  import moment from "moment";
  export default {
    name: "RoomSearch",
    data() {
      return {
        roomList: [],
        pageNum:1,//第几页
        pageSize:12,//页数
        total:0,
        totalPage:0,
        query:{
          pageNum:1,
          pageSize:12,
          location:"",
          type:"",
          capacity:999,
          lowPrice:-1,
          highPrice:-1,
          timeAbled:[],
        },
        lowPrice:"",
        highPrice:"",
        capacity:0,
        pickerOptions1: this.pickerOptions11(),
        fullscreenLoading: false
      }
    },
    components: {
      NavMenu,Rooms
    },
    methods:{
      // async getData() {
      //   // 这里请求
      //   const res = await getAllRooms();
      //   this.roomList = res.data;
      // },
      async initRoomPages() {
        // 这里请求
        this.fullscreenLoading = true;
        setTimeout(async () => {
          const res = await searchRooms(this.query);
          this.roomList = res.data.list;
          this.total=res.data.total;
          this.totalPage=res.data.totalPage;
          this.fullscreenLoading = false;
        }, 3000);


      },
      jumpToRoomDetail(rId) {
        if (localStorage.getItem("token") === "null") {
          this.$message.error("请先登录");
        } else {
          console.log(rId);
          window.open("http://localhost:8080/#/roomDetail?id="+rId)
          // this.$router.push(`/roomDetail?id=${rId}`);
        }
      },
      sizeChange(){

      },
      async currentChange(num){
        console.log(num);
        this.query.pageNum = num;
        console.log("进入第" + this.query.pageNum + "页");
        const res = await searchRooms(this.query);
        this.roomList = res.data.list;
      },
      nextPage(){
        this.query.pageNum++;
      },
      prevPage(){
        this.query.pageNum--;
      },

      pickerOptions11() {
        return {
          disabledDate(time) {
            return moment(time.getTime()).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD");
          }
        }
      },
      getTimeList(){
        console.log(this.query.timeAbled);
        if (this.query.timeAbled!==null) {
          if(this.query.timeAbled[0]===this.query.timeAbled[1]){
            this.$message.error("不能一样")
            this.query.timeAbled = []
          }else {
            console.log(this.query);
            this.initRoomPages()
          }
        }else {//在删清空后，list变为null，所以重置list
          this.query.timeAbled = []
          this.initRoomPages()
        }
      },
      getCapacity(){
        if (this.capacity!==0){
          this.query.capacity = this.capacity
          console.log(this.query);
          this.initRoomPages()
        }else {
          this.query.capacity=999
          this.initRoomPages()
        }
      },
      getType(){
        console.log(this.query);
        this.initRoomPages()
      },
      getPrice(){
        if (this.highPrice<=this.lowPrice&&(this.highPrice!==""&&this.lowPrice!=="")){
          this.$message.error("价格有误，请重新输入")
          this.highPrice = ""
          this.lowPrice = ""
        } else {
          if (this.highPrice!=='0'&&this.highPrice!==""&&this.highPrice!=="∞"&&this.highPrice!==null){
            this.query.highPrice = Number(this.highPrice)
          }else {
            this.query.highPrice =  -1
          }
          if (this.lowPrice!==''&&this.lowPrice!=='0'){
            this.query.lowPrice = Number(this.lowPrice)
          }else {
            this.query.lowPrice =  -1
          }
        }
        this.initRoomPages()
      },
      cancelType(){
          this.query.type=""
        console.log(this.query);
      },
      cancelPrice(){
        this.highPrice = ""
        this.lowPrice = ""
        this.query.lowPrice = -1
        this.query.highPrice = -1
        console.log(this.query);
      },
      cancelCapacity(){
        this.capacity = 0;
        this.query.capacity = 999
        console.log(this.query);
      },
      createQuery(){
        //初始化query
        if (typeof(this.condition.location)!=='undefined') {this.query.location = this.condition.location;}
        // if (typeof(this.condition.type)!=='undefined') {this.query.type = this.condition.type;}
        // if (typeof(this.condition.capacity)!=='undefined') {this.query.capacity = this.condition.capacity;}
        // if (typeof(this.condition.lowPrice)!=='undefined') {this.query.lowPrice = this.condition.lowPrice;}
        // if (typeof(this.condition.highPrice)!=='undefined') {this.query.highPrice = this.condition.highPrice;}
        if (typeof(this.condition.timeList)!=='undefined') {this.query.timeAbled = this.condition.timeList;}
        console.log(this.condition.timeList);
        console.log(this.query.timeAbled);
        this.query.pageNum=1;//初始化页码
        this.query.pageSize=12;
        console.log(this.query);
        this.initRoomPages()

      }
    },
    created() {
      // this.getData();
      //这里对其他页面传来的查询条件进行解析，然后封装到query中
      this.createQuery()
    },
    computed:{
      condition(){//外部传进来的
        return this.$route.query;
      }
    },
    watch:{
      condition(val,oldval){
        console.log(this);
        this.createQuery()
      },
    }
  }
</script>

<style scoped>

  .el-button{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-left: 30px!important;
  }
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
