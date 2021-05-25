<template>

  <div style="display: flex;margin-bottom: 90px!important;">
    <div class="main-info-outside">
      <div class="main-info-inside">
        <div>
          <div id="categoryDiv">
          <div style="margin-bottom: 20px" >
            <span style="font-size: 24px;font-weight: bolder">您打算出租的是什么样的房子？</span>
          </div>
          <div>
            <span style="font-size: 18px;font-weight: bolder">房源类型</span>
            <div style="display: flex">
              <el-radio-group class="categorySelect" v-model="category" @change="getCategory">
                <el-row>
                  <el-radio :label="'出租单元'" border>出租单元</el-radio>
                  <el-radio :label="'住宅'" border>住宅</el-radio>
                  <el-radio :label="'别墅'" border>别墅</el-radio>
                  <el-radio :label="'Loft'" border>Loft</el-radio>
                </el-row>
                <el-row>
                  <el-radio :label="'酒店'" border>酒店</el-radio>
                  <el-radio :label="'酒店式公寓'" border>酒店式公寓</el-radio>
                  <el-radio :label="'精品酒店'" border>精品酒店</el-radio>
                  <el-radio :label="'旅舍'" border>旅舍</el-radio>
                </el-row>
                <el-row>
                  <el-radio :label="'农家乐'" border>农家乐</el-radio>
                  <el-radio :label="'度假村'" border>度假村</el-radio>
                  <el-radio :label="'乡间小屋'" border>乡间小屋</el-radio>
                  <el-radio :label="'客栈'" border>客栈</el-radio>
                </el-row>

              </el-radio-group>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <span style="font-size: 18px;font-weight: bolder;">出租类型</span>

            <div style="height: 160px!important;width: 100%!important;">

              <el-radio-group class="typeSelect" v-model="type" @change="getType"
                              style="height: 100%!important;width: 100%!important;">

                <div v-if="category==='酒店'||category==='酒店式公寓'||category==='精品酒店'">
                  <el-radio :label="'酒店客房'" border>
                    <div style="height: 20%!important;">
                      <Icon :type="'酒店客房'"/>
                    </div>
                    <div style="height: 20%!important;text-align: left"><span style="font-size: 16px;font-weight: bold">
                      酒店客房</span></div>
                    <div style="height: 60%!important;width: 100%!important;">
                      <span>房客有自己的独立卧室， 其他区域则可能需与他人合用</span>
                    </div>
                  </el-radio>
                </div>

                <div v-else-if="category==='旅舍'">
                  <el-radio :label="item" border v-for="(item,index) in ['青旅单间','青旅床位']" :key="item">
                    <div style="height: 20%!important;">
                      <Icon :type="item"/>
                    </div>
                    <div style="height: 20%!important;text-align: left"><span style="font-size: 16px;font-weight: bold">
                      {{item}}</span></div>
                    <div style="height: 60%!important;width: 100%!important;">
                      <span v-if="item==='青旅单间'">房客有自己的独立卧室， 其他区域则可能需与他人合用</span>
                      <span v-if="item==='青旅床位'">房客睡在可能需与他人合用的卧室或公共区域</span>
                    </div>
                  </el-radio>
                </div>
                <div v-else-if="category==='客栈'">
                  <el-radio :label="item" border v-for="(item,index) in ['客栈单间','客栈床位']" :key="item">
                    <div style="height: 20%!important;">
                      <Icon :type="item"/>
                    </div>
                    <div style="height: 20%!important;text-align: left"><span style="font-size: 16px;font-weight: bold">
                      {{item}}</span></div>
                    <div style="height: 60%!important;width: 100%!important;">
                      <span v-if="item==='客栈单间'">房客有自己的独立卧室， 其他区域则可能需与他人合用</span>
                      <span v-if="item==='客栈床位'">房客睡在可能需与他人合用的卧室或公共区域</span>
                    </div>
                  </el-radio>
                </div>

                <div v-else-if="category==='度假村'">
                  <el-radio :label="'度假村客房'" border>
                    <div style="height: 20%!important;">
                      <Icon :type="'度假村客房'"/>
                    </div>
                    <div style="height: 20%!important;text-align: left"><span style="font-size: 16px;font-weight: bold">
                      度假村客房</span></div>
                    <div style="height: 60%!important;width: 100%!important;">
                      <span>房客独享整个空间，无需与他人共住</span>
                    </div>
                  </el-radio>
                </div>

                <div v-else style="height: 85%;width:100%;">
                  <el-radio v-for="(item,index) in typeList" :key="item" :label="item" border>
                    <div style="height: 20%!important;">
                      <Icon :type="item"/>
                    </div>
                    <div style="height: 20%!important;text-align: left"><span style="font-size: 16px;font-weight: bold">
                      {{item}}</span></div>
                    <div style="height: 60%!important;width: 100%!important;">
                      <span v-if="item==='整个房源'">房客独享整个房源，无需与您或他人共住</span>
                      <span v-if="item==='独立房间'">房客有自己的独立房间，与他人共享客厅等空间</span>
                      <span v-if="item==='合住房间'">房客住在与他人合用的卧室或公共区域</span>
                    </div>
                  </el-radio>
                </div>
              </el-radio-group>
            </div>
          </div>
          </div>
          <el-divider></el-divider>
          <div id="locationDiv">
          <div class="roomLocation" style="margin-top: 30px;">
            <div id="s2">
              <span style="font-size: 24px !important;font-weight: 800 !important;">您的房源位于什么地方？</span>
            </div>
            <div>
              <span style="font-size: 16px !important;font-weight: 400 !important;">房客只有在确认预订后才会获知确切的房源地址。</span>
            </div>
          </div>
          <div style="margin-top: 20px;">
            <div>
              <span style="font-size: 16px !important;font-weight: bolder">省市区</span>
            </div>
            <div>
              <CityPicker ref="citypicker"></CityPicker>
            </div>
            <div style="margin-top: 20px;">
              <span style="font-size: 16px !important;font-weight: bolder">详细地址</span>
            </div>
            <div style="width: 400px!important;margin-top: 20px;margin-bottom: 20px;">
              <el-input id="detailAddress" v-model="detailAddress" placeholder="请输入详细地址" @focus="getCityPicker"></el-input>
            </div>
            <div>
              <div id="roomContainer"></div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <tips :divName="divName"></tips>
  </div>

</template>

<script>
  import Icon from "../../roomDetail/components/IconRender"
  import CityPicker from "../../../components/cityPicker/CityPicker";
  import tips from "./tips";

  export default {
    name: "addBaseRoom",
    data() {
      return {
        category: '',//记录房源类型
        type: '',//记录出租类型类型
        typeList: ['整个房源', '独立房间', '合住房间'],
        map: "",
        detailAddress: "",//记录省市区--->组件内
        divName:"",
        locationLA:""//记录经纬度
      }
    },
    methods: {
      getCategory() {
        this.$store.state.roomInfo['category']=this.category;//存入store
        console.log(this.category);
      },
      getType() {
        this.$store.state.roomInfo['type']=this.type;//存入store
        console.log(this.type);
      },
      getCityPicker(){
        if (this.detailAddress==="") {
          this.detailAddress += this.$refs.citypicker.fullAddress;//获取子组件的数据
        }
      },
      scrollFun(){
        let s1 = document.getElementById("categoryDiv");
        let s2 = document.getElementById("locationDiv");
        let boxArr = [s1,s2];
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight ;
        for(let i=0 ; i<=boxArr.length-1 ; i++){
          //  boxArr[i].offsetTop  标签距离页面顶部的距离
          let oTop = boxArr[i].offsetTop;
          let bH = boxArr[i].offsetHeight ;
          // if( (oTop-scrollTop >= 0  && scrollTop+winHeight-oTop > 100 ) || ( (oTop+bH-scrollTop)/ winHeight>0.6 && oTop-scrollTop <= 0  ) ){
          if((oTop+bH-scrollTop)>=110 &&(oTop+bH-winHeight-scrollTop)<=0){
            // console.info( boxArr[i].id  );  // 如果进入到窗口，输出 id
            this.divName = boxArr[i].id                                // 在实际项目中可以执行动画
          }
        }
      }
    },
    mounted(){
      var windowsArr = [];
      var marker = [];
      var map = new AMap.Map("roomContainer", {
        resizeEnable: true,
        center: [116.397428, 39.90923],//地图中心点
        zoom: 14,//地图显示的缩放级别
        keyboardEnable: false,
      });

      let that = this;
      var auto = AMap.plugin(['AMap.Autocomplete'],()=>{
        var autoOptions = {
          // 城市，默认全国
          city: "全国",
          // 使用联想输入的input的id
          input: "detailAddress"
        }
        var autocomplete= new AMap.Autocomplete(autoOptions);
        // var placeSearch = new AMap.PlaceSearch({
        //   city:'全国',
        //   map: map,
        //   type: '商务住宅|地名地址信息|商务住宅|住宿服务|风景名胜'
        // });
        AMap.event.addListener(autocomplete, 'select', function(e){
          //TODO 针对选中的poi实现自己的功能
          // placeSearch.search(e.poi.name);
          // placeSearch.setCity(e.poi.adcode);
          // placeSearch.setPageSize(5);
          // placeSearch.search(e.poi.name);
          this.map = map;

          console.log(e.poi.location.lng);//经度
          console.log(e.poi.location.lat);//纬度
          that.locationLA = +e.poi.location.lng+","+e.poi.location.lat;

          var marker = new AMap.Marker({
            position: new AMap.LngLat(e.poi.location.lng,e.poi.location.lat)
          });
          map.add(marker);
          map.setCenter([e.poi.location.lng,e.poi.location.lat]);
        })
      });
    },
    components: {
       CityPicker,tips,Icon
    },
    created() {
      window.addEventListener("scroll",this.scrollFun);
    },
    watch:{
      locationLA:{
        handler:function(val, oldVal) {
          this.$store.state.roomInfo['locationDetail'] = val;//存入store
        },
        deep:true,
        immediate:true
      }
    }
  }
</script>

<style scoped>
  @import "../addInfo.css";

  .el-radio-group {
    font-size: unset !important;
  }

  .el-radio {
    background-color: rgb(242, 242, 242) !important;
    width: 105px !important;
    height: 35px !important;
    margin-top: 15px;
    margin-right: 10px !important;
  }

  .el-radio.is-checked {
    background-color: rgb(178, 218, 219) !important;
  }

  .el-radio.is-bordered {
    border: 1px solid rgba(242, 242, 242, 0.1) !important;;
    text-align: center !important;
    padding-top: 10px !important;
  }

  .el-radio >>> .el-radio__label {
    padding-top: 0px !important;
    margin-top: 0px !important;
    font-size: 14px !important;
    padding-left: 5px !important;
  }

  .el-radio >>> .el-radio__input.is-checked + .el-radio__label {
    color: #606266 !important;
  }

  .el-radio >>> .el-radio__input {
    /*//不要圆点*/
    display: none !important;
  }

  .typeSelect >>> .el-radio {
    height: 100% !important;
    width: 122px !important;
    float: left;
  }

  .typeSelect > div {
    height: 90% !important;
    width: 100% !important;
  }

  .typeSelect >>> .el-radio.is-bordered {
    padding-left: 10px !important;
    padding-top: 0 !important;

  }

  .typeSelect >>> .el-radio, .el-radio__input {
    white-space: normal;
  }

  .typeSelect >>> .el-radio.is-bordered {
    text-align: left !important;
  }

  #roomContainer {width:85%; height: 300px; }
</style>
