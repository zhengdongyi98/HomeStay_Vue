<template>
  <el-container>
    <el-main>
      <div class="category" id="detail">
        <span
        >{{ RoomDetailData.baseRoom.category }}·{{
            RoomDetailData.baseRoom.type
          }}</span
        >
      </div>
      <div class="roomName">
        <span>{{ RoomDetailData.baseRoom.roomName }}</span>
      </div>
      <div class="bedRooms">
        <span class="el-icon-s-home"> {{ bedRooms() }}间卧室 </span>
        <span class="el-icon-moon"> {{ beds() }}张床 </span>
        <span class="el-icon-toilet-paper">
          {{ RoomDetailData.roomDetail.toilet }}个卫生间
        </span>
        <span class="el-icon-user-solid">
          可住{{ RoomDetailData.baseRoom.capacity }}人
        </span>
      </div>
      <el-divider></el-divider>
      <div class="hostUser">
        <el-row class="demo-avatar demo-basic">
          <el-col :span="3">
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar
                        :size="60"
                        style="margin-left: 10px"
                        :src="icon()"
                ></el-avatar>
              </div>
            </div>
          </el-col>
          <el-col :span="12" style="height: 70px" class="userInfo">
            <el-row
                    :span="12"
                    style="padding-left: 8px; padding-top: 7px; height: 40%"
            ><span style="padding-right: 20px"
            >房东：{{ RoomDetailData.user.userName }}</span
            ><a href="">联系房东</a></el-row
            >
            <el-row :span="12" style="padding-left: 8px; padding-top: 10px"
            ><span style="font-size: 14px !important"
            ><el-tag type="success" style="margin-right: 5px"
            >{{519}} 条评价</el-tag
            ><el-tag type="warning" style="margin-right: 5px"
            >已验证身份</el-tag
            ><el-tag style="margin-right: 5px">超赞房东</el-tag></span
            >
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="demo-shadow" id="description">
        <div style="margin: 25px 20px 0px 20px">
          <span>{{ RoomDetailData.roomDetail.description }}</span>
        </div>
        <div style="margin: 20px 0px 20px 20px"><a href="">查看更多</a></div>
      </div>
      <el-divider></el-divider>
      <div class="bedType">
        <el-row :gutter="5">
          <el-col :span="5" v-for="(item, i) in getBedType()" :key="i">
            <div class="bedRoomCard">
              <span>卧室{{ i + 1 }}</span>
              <div style="margin-top: 10px; margin-bottom: 10px">
                <Icon :type="`床`"/>
              </div>
              <div v-for="(bed, index) in item" :key="index">
                <span>{{ bed }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div class="protect">
        <a href=""
        ><span hr class="el-icon-s-promotion" style="font-size: 20px"></span
        ><span style="font-size: 16px; font-weight: bolder"> 旅行保障 | </span
        ><span> 全方位保障 · 出行无忧</span>
        </a>
      </div>
      <el-divider></el-divider>
      <div class="typeInfo">
        <div>
          <span>{{ RoomDetailData.baseRoom.type }}</span
          ><span>{{ typeInfo() }}</span>
        </div>
        <div>
          <span>超赞房东</span
          ><span
        >超赞房东经验丰富、评分很高，致力于为房客提供优质的住宿体验。</span
        >
        </div>
        <div>
          <span>入住/退房</span
          ><span>入住时间 下午2:00后、退房时间 中午12:00</span>
        </div>
        <div><span>自助入住</span><span>通过智能门锁自助入住</span></div>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-col
                :span="
            amenities().length <= 5 ? Math.floor(24 / amenities().length) : 4
          "
                v-for="(amenitiesItem, index) in amenities().splice(0, 5)"
                :key="index"
        >
          <div style="text-align: center">
            <Icon :type="amenitiesItem"/>
            <div style="font-size: 14px; margin-top: 5px">
              {{ amenitiesItem }}
            </div>
          </div>
        </el-col>
        <el-col :span="4" v-if="amenities().length > 5">
          <div style="text-align: center; color: #008489">
            <div style="height: 26px; cursor: pointer">
              {{ amenities().length }}+
            </div>
            <div style="font-size: 14px; cursor: pointer; margin-top: 5px">
              更多设施
            </div>
          </div>
        </el-col
        >
      </el-row>
      <el-divider></el-divider>
      <div id="comments"><h1>房客评价</h1>
        <div>
          <el-rate class="bigRate"
                  v-model="avgValue"
                  disabled
                  show-score
                  score-template="{value}">
          </el-rate>
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        <div v-for="(item,index) in this.RoomDetailData.comments">
          <div style="display: flex;">
            <div @click="goUserInfo(item.uId)">
              <el-avatar :size="45" :src="item.icon" ></el-avatar>
            </div>
            <div style="margin-left: 20px;">
              <div>
                <span style="font-size: 18px;font-weight: bolder;">{{item.userName}}</span>
              </div>
              <div>{{getOrderedTime(item.orderedTime)}}</div>
            </div>
          </div>
          <div style="margin-top: 10px;">
            <div><span style="font-size: 18px">{{item.content}}</span></div>
            <div style="margin-top: 5px;">
              <el-rate
                    v-model="item.score"
                    disabled
                    score-template="{value}">
            </el-rate>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>

      <div id="location">
        <h1>房源位置</h1>
        <div style="font-weight: 800">
          {{ RoomDetailData.baseRoom.location }}
        </div>
        <div style="font-weight: 800; margin-top: 20px">出行信息</div>
        <div style="margin-top: 10px; margin-bottom: 10px">
          {{ RoomDetailData.roomDetail.recommendation }}
        </div>
        <div id="container"></div>
      </div>
      <el-divider></el-divider>
      <div id="notice">
        <h1>须知</h1>
        <el-row style="margin-top: 10px"
        >
          <el-col :span="8" style="font-weight: 800">房屋守则
          </el-col
          >
          <el-col :span="16"
          ><p>适合儿童(2-12岁)</p>
            <p>不允许举办派对和活动</p>
            <p>适合婴幼儿(2岁以下)</p>
            <p>不允许携带宠物</p>
            <p>禁止吸烟</p>
            <p>
              鉴于房源所在地相关法律法规及房东收到的监管要求，该房源暂时只接待持有中国大陆居民身份证或护照的房客。请使用中国大陆居民身份证或护照入住该房源，对您造成的不便我们深表歉意。
            </p>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px"
        >
          <el-col :span="8" style="font-weight: 800">取消政策
          </el-col
          >
          <el-col :span="16"
          >4月26日下午3点前取消，扣除首晚房费后，退还剩余房费的50%和全部清洁费
            查看完整详情
          </el-col
          >
        </el-row
        >
        <el-row style="margin-top: 10px"
        >
          <el-col :span="8" style="font-weight: 800">安全须知
          </el-col
          >
          <el-col :span="16"
          ><p>
            在新冠肺炎疫情期间，我们要求所有房东和房客查看并遵守爱彼迎的社交距离准则和其他新冠肺炎疫情相关准则。
          </p>
            <p>未报告装有一氧化碳报警器。</p>
            <p>未报告装有烟雾报警器。</p></el-col
          >
        </el-row
        >
        <el-row style="margin-top: 10px"
        >
          <el-col :span="8" style="font-weight: 800">安全预订
          </el-col
          >
          <el-col :span="16"
          >为了保护您的账号隐私及付款安全，请勿妄信第三方预订代理提供的折扣或礼金券，也不要在爱彼迎网站或App之外汇款或沟通。
          </el-col
          >
        </el-row
        >
        <el-row style="margin-top: 10px"
        >
          <el-col :span="8" style="font-weight: 800">发票须知
          </el-col
          >
          <el-col :span="16"
          >爱彼迎可为此房源的订单提供发票。开具发票，请在下单前选择「需要发票」并填写发票信息，退房后平台将自动为您开具电子普通发票，或纸质专用发票。
          </el-col
          >
        </el-row
        >
      </div>
      <el-divider></el-divider>
      <div id="host">
        <h1>房东</h1>
        <el-row>
          <el-col :span="8"
          >
            <div style="font-size: 10px; font-weight: 800">
              {{ RoomDetailData.user.userName }}
            </div>
            <div style="font-size: 10px">注册时间：2021年4月</div>
            <div style="display: flex; margin-top: 10px">
              <span style="font-size: 10px"><Icon :type="`nice`"/></span
              ><span style="font-size: 10px; margin-left: 5px">超赞房东</span>
              <img
                      class="_9ofhsl"
                      aria-hidden="true"
                      alt="已验证"
                      src="https://z1.muscache.cn/airbnb/static/packages/verified_badge.07c2f2a6.png"
                      data-original-uri="https://z1.muscache.cn/airbnb/static/packages/verified_badge.07c2f2a6.png"
                      style="
                  object-fit: cover;
                  vertical-align: bottom;
                  width: 20px;
                  height: 20px;
                  margin-left: 5px;
                "
              />
              <span style="font-size: 10px; margin-left: 5px">已验证</span>
            </div>
          </el-col
          >
          <el-col :span="16"
          >
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar
                        :size="60"
                        style="margin-left: 10px"
                        :src="icon()"
                ></el-avatar>
              </div>
            </div
            >
          </el-col>
        </el-row>
        <div style="margin-top: 20px; font-size: 12px">
          <p style="font-weight: 800">自我介绍</p>
          <p>哇~您看到我啦!</p>
          <p>
            一个很有待客之道的房东小姐姐,喜欢交朋友喜欢旅游,看书看电影,拍摄游泳~
          </p>
          <p style="font-weight: 800">与房客的互动</p>
          <p>
            我不会出现在房源里，但我非常愿意与房客沟通，工作时间遇到什么解决不了问题，还有线下管家可以去帮您
          </p>
        </div>
      </div>
    </el-main>
    <el-aside>
      <a-affix :offset-top="top" style="margin-top: 15px"
               v-if="RoomDetailData.baseRoom['uId']!==this.$store.state.user['uId']">
        <BookingPanel
                :price="RoomDetailData.roomPrices"
                :basePrice="RoomDetailData.baseRoom.basePrice"
                :RoomDetailData="RoomDetailData"
                :baseRoomData="RoomDetailData.baseRoom"
        />
      </a-affix>
    </el-aside>
  </el-container>
</template>
<script>
  import BookingPanel from "./BookingPanel";
  import Icon from "./IconRender";

  export default {
    data() {
      return {
        activeName: "RoomDisplay",
        top: 50,
        map: "",
      };
    },
    components: {
      Icon,
      BookingPanel,
    },
    methods: {
      icon() {
        return this.RoomDetailData.user.icon;
      },
      bedRooms() {
        //获取卧室个数
        return this.RoomDetailData.bedRooms.length;
      },
      beds() {
        //获取床数
        let bedNumber = 0;
        let bedRooms = this.RoomDetailData.bedRooms;
        for (let i = 0; i < bedRooms.length; i++) {
          bedNumber += bedRooms[i].bedNumber;
        }
        return bedNumber;
      },
      getBedType() {
        let bedType = [];
        let bedRooms = this.RoomDetailData.bedRooms;
        for (let i = 0; i < bedRooms.length; i++) {
          let beds = bedRooms[i].bedType.split(" "); //获取床铺类型
          let bedArr = [];
          for (let j = 0; j < beds.length; j++) {
            if (beds[j] !== "") {
              bedArr.push(beds[j]);
            }
          }
          bedType.push(bedArr);
        }
        return bedType;
      },
      typeInfo() {
        let type = this.RoomDetailData.baseRoom.type;
        if (type === "整个房源") {
          return "独享所有空间，无需与他人共用";
        }
        if (type === "独立房间") {
          return "有自己的单独卧室，与他人共享其它空间";
        }
      },
      amenities() {
        let amenitiesList = [];
        let {amenities} = this.RoomDetailData.roomDetail;
        amenities.split(/[、 ]/).map((item) => {
          if (item) {
            amenitiesList.push(item);
          }
        });
        return amenitiesList;
      },
      getOrderedTime(item){
        let time = item.split(" ");
        let orderTime = time[time.length-1];
        let orderMonth = orderTime.split("-");
        return orderMonth[0]+"年"+orderMonth[1]+"月"
      },
      goUserInfo(uId){
        console.log(uId);
      }
    },
    created() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    mounted() {
      const location = this.RoomDetailData.roomDetail.locationDetail.split(",");
      this.map = new AMap.Map("container", {
        zoom: 14, //级别
        center: location, //中心点坐标
        viewMode: "3D", //使用3D视图
      });
      var marker = new AMap.Marker({
        position: new AMap.LngLat(location[0], location[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      });
      this.map.add(marker);
    },
    props: {
      RoomDetailData: {
        type: Object,
      },
    },
    computed: {
      avgValue() {
        let comments = this.RoomDetailData.comments;
        if (comments.length!==0) {
          let sum = 0;
          comments.forEach((item, index) => {
            sum += item.score;
          })
          return sum / (comments.length)
        }else {
          return 0;
        }
      }
    },
  };
</script>

<style scoped>
  #container {
    width: 100%;
    height: 300px;
  }

  >>>.el-rate__icon{
    font-size: 15px;
  }
  .bigRate>>>.el-rate__icon{
    font-size: 25px;
  }
  div {
    display: block;
  }

  .category {
    margin-top: 15px;
  }

  .el-container {
    margin-left: 6%;
    margin-right: 10%;
    height: 100%;
    /*width: 100%;*/
  }

  .el-main {
    padding: 10px;
    width: 66.66% !important;
  }

  .el-aside {
    width: 33.33% !important;
  }

  .category > span {
    color: rgb(88, 76, 62);
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC", sans-serif !important;
    font-size: 12px !important;
    font-weight: 800 !important;
    line-height: 1.33333em !important;
  }

  .roomName {
    margin-top: 5px !important;
    overflow-wrap: break-word !important;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC", sans-serif !important;
    font-size: 32px !important;
    font-weight: 800 !important;
    line-height: 1.125em !important;
    color: rgb(72, 72, 72) !important;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }

  .bedRooms {
    margin-top: 10px;
  }

  .bedRooms > span {
    padding-right: 20px;
    margin: 0px !important;
    overflow-wrap: break-word !important;
    /*font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑, "Microsoft YaHei", "Heiti SC", sans-serif !important;*/
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 1.375em !important;
    color: rgb(72, 72, 72) !important;
  }

  .el-row > span {
    margin: 0px !important;
    overflow-wrap: break-word !important;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC", sans-serif !important;
    font-size: 16px !important;
    font-weight: 800 !important;
    line-height: 1.375em !important;
    color: rgb(72, 72, 72) !important;
  }

  .el-row > a {
    color: var(--color-text-link, #008489) !important;
    font-family: var(
            --font-font_family,
            Circular,
            -apple-system,
            BlinkMacSystemFont,
            Roboto,
            "Helvetica Neue",
            "PingFang-SC",
            "Hiragino Sans GB",
            "微软雅黑",
            "Microsoft YaHei",
            "Heiti SC",
            sans-serif
    ) !important;
    text-decoration: var(--font-link-text-decoration, none) !important;
  }

  #description {
    margin-top: 16px;
    margin-bottom: 32px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background: rgb(230, 230, 230) !important;
    display: inline-block !important;
  }

  #description > div > span {
    margin: 0px !important;
    overflow-wrap: break-word !important;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC", sans-serif !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 1.375em !important;
    color: rgb(72, 72, 72) !important;
  }

  #description > div > a {
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    font-style: inherit !important;
    font-variant: inherit !important;
    line-height: inherit !important;
    appearance: none !important;
    background: transparent !important;
    border: 0px !important;
    cursor: pointer !important;
    margin: 0px !important;
    padding: 0px !important;
    user-select: auto !important;
    color: rgb(0, 132, 137) !important;
    text-decoration: none !important;
  }

  .bedType >>> .demo-shadow {
    border-radius: 4px;
    border: lavenderblush 1px solid;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    height: 90px;
    width: 126px;
  }

  .bedType >>> span {
    overflow-wrap: break-word !important;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑,
    "Microsoft YaHei", "Heiti SC", sans-serif !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 1.28571em !important;
    color: rgb(72, 72, 72) !important;
  }

  .typeInfo > div {
    padding-top: 20px;
  }

  .typeInfo > div > :first-child {
    font-size: 16px !important;
    font-weight: 600 !important;
    line-height: 1.375em !important;
    color: rgb(72, 72, 72) !important;
    padding-right: 80px !important;
  }

  .amenities {
    display: flex;
  }

  .bedRoomCard {
    height: 150px;
    border: 1px solid rgb(235, 235, 235) !important;
    border-radius: 4px !important;
    padding: 12px !important;
  }
</style>
