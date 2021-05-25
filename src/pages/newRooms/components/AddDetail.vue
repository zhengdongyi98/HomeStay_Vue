<template>
  <div style="display: flex;margin-bottom: 90px!important;">
    <div class="main-info-outside">
      <div class="main-info-inside">
        <div id="roomNameDiv">
        <div style="margin-top: 30px;">
          <div>
            <span style="font-size: 24px !important;font-weight: 800 !important;">为您的房源起个名字</span>
          </div>
          <div>
            <span style="font-size: 16px !important;font-weight: 500 !important;">为房源起一个能突出其独特之处的标题，吸引更多房客。</span>
          </div>
          <div style="margin-top: 30px;">
            <el-input
                    @blur="getRoomName"
                    style="width: 95%!important;font-size: 18px;"
                    type="textarea"
                    placeholder="房源名称"
                    v-model="roomName"
                    minlength="6"
                    maxlength="50"
                    show-word-limit
            ></el-input>
            <el-alert
                    v-if="roomName.length<6 && roomName.length!==0"
                    style="width: 95%!important"
                    :closable="false"
                    title="房源名称不得少于6个字"
                    type="error">
            </el-alert>
          </div>
          <div style="margin-top: 20px;"><span style="font-size: 16px !important">好的房源标题可以增加房客的点击率，房屋名称可包含地标、位置、附近交通、房屋特色等信息。</span>
          </div>
        </div>
        </div>
        <el-divider></el-divider>
        <div id="descriptionDiv">
        <div style="margin-top: 30px;">
          <div><span style="font-size: 24px !important;font-weight: 800 !important;">描述下您的房源</span></div>
          <div><span style="font-size: 16px !important;font-weight: 400 !important;">描述房源特色，列出房内配备的特殊便利设施，比如极速无线网络、停车场等。同时，告诉大家房源所在街区有何魅力。</span>
          </div>
          <div style="margin-top: 20px;">
            <el-input
                    style="font-size: 16px;"
                    type="textarea"
                    @blur="getDescription"
                    placeholder="描述一下房源内部的空间和设施、周边的环境和交通路线等等……"
                    v-model="description"
                    maxlength="500"
                    show-word-limit
                    autosize
            >
            </el-input>
            <el-alert
                    v-if="description.length<30 && description.length!==0"
                    style="width: 95%!important"
                    :closable="false"
                    title="房源描述信息不得少于30个字"
                    type="error">
            </el-alert>
          </div>
          <div style="margin-top: 20px;">
            <div>
              <span style="font-size: 16px !important;font-weight: 800 !important;">周边推荐</span>
            </div>
            <div>
              <span style="font-size: 14px !important;font-weight: 400 !important;">向房客介绍房源周边的特色地点，比如受欢迎的咖啡馆、公园或独特的地标。</span>
            </div>
            <div style="margin-top: 20px;">
              <el-input
                      style="font-size: 16px;"
                      type="textarea"
                      @blur="getRecommendation"
                      placeholder="描述一下周边有什么特色地点、人文景观等等......"
                      v-model="recommendation"
                      maxlength="500"
                      show-word-limit
                      autosize
              >
              </el-input>
              <el-alert
                      v-if="recommendation.length<30 && recommendation.length!==0"
                      style="width: 95%!important"
                      :closable="false"
                      title="周边推荐信息不得少于30个字"
                      type="error">
              </el-alert>
            </div>
          </div>

        </div>
        </div>
        <div id="bedDiv">
        <el-divider></el-divider>
        <div style="margin-top: 30px;border-bottom: 0px !important;padding-top: 32px !important;padding-bottom: 24px !important;">
          <span style="font-size: 24px !important;font-weight: 800 !important;">您的房源可以住几位房客？</span>
        </div>
        <div style="font-size: 16px !important;font-weight: 400 !important;">
          <span style="font-size: 16px !important;font-weight: 400 !important;">请确保您准备了足够的床位，让所有房客都能舒适入住。</span></div>
        <div style="margin-top: 30px;">
          <span style="font-size: 16px !important;font-weight: 600 !important;margin-right: 50px">最多容纳房客人数</span>
          <el-input-number v-model="capacityNum" @change="getCapacity" :min="1" label="capacityNum"></el-input-number>
        </div>
        <div class="bedRoomAndNumber">
          <div>
            <span style="font-size: 19px;margin-right: 60px">有几间卧室？</span>
            <el-select v-model="bedRoomNumber" @change="getBedRoomNumber">
              <el-option
                      v-for="item in (1,10)"
                      :key="item"
                      :label="item"
                      :value="item">
                {{item}}间卧室
              </el-option>
            </el-select>
          </div>


          <div style="margin-top: 50px;">
            <span style="font-size: 24px;">床型信息</span>
            <div>
              <span style="font-size: 16px;">告知房客每个房间的床铺类型，有助于他们了解床型信息。</span>
              <el-divider></el-divider>
            </div>

            <div  v-for="(item,index) in bedObjList"
                 style="width:100%!important;">
              <div style="width:100%!important;display: flex;height: 100px!important;">
                <div style="width: 75%!important;height: 75px;margin-top:15px;margin-right: 50px">
                  <div><span style="font-size: 19px;">卧室{{index+1}}</span></div>
                  <div ><span style="font-size: 19px;">{{bedObjList[index].totalBeds}}张床</span></div>
                </div>
                <div style="width: 100px;!important;height: 50px!important;float: right;margin-top:25px;">
                  <el-button type="primary" @click="addBeds(index)" v-if="!bedObjList[index].buttonFlag">添加床铺</el-button>
                  <el-button type="primary" @click="addBeds(index)" v-if="bedObjList[index].buttonFlag">完成</el-button>
                </div>
              </div>
              <div style="height: 200px" v-if="bedObjList[index].buttonFlag">
                <div><span>1.4 米宽双人床</span><el-input-number v-model="bedObjList[index].type1" @change="culTotalBed(index)" :min="0" :max="5"></el-input-number></div>
                <div><span>1.5 米宽双人床</span><el-input-number v-model="bedObjList[index].type2" @change="culTotalBed(index)" :min="0" :max="5" ></el-input-number></div>
                <div><span>1 米宽单人床</span><el-input-number v-model="bedObjList[index].type3" @change="culTotalBed(index)" :min="0" :max="5"></el-input-number></div>
                <div><span>沙发床</span><el-input-number v-model="bedObjList[index].type4" @change="culTotalBed(index)" :min="0" :max="5"></el-input-number></div>
              </div>
              <el-divider></el-divider>
            </div>

          </div>
          <div style="margin-top:50px">
            <span style="font-size: 24px;font-weight: bolder">有几个卫生间？</span>
            <div>
              <span style="font-size: 16px;">没有淋浴区或浴缸的卫生间算半个卫生间。</span>
            </div>
            <div style="margin-top: 30px;">
              <span style="font-size: 16px;font-weight: bolder;margin-right: 120px;">卫生间</span>
              <el-input-number v-model="toiletNum" :precision="1" :step="0.5" :min="0.5" label="0" @change="getToilet"
                               step-strictly></el-input-number>
            </div>
          </div>
        </div>
        </div>
        <div id="sheShiDiv">
        <el-divider></el-divider>
        <div style="margin-top: 30px;">
          <div>
            <span style="font-size: 24px !important;font-weight: 800 !important;">您提供的便利设施有哪些？</span>
          </div>
          <div>
            <span style="font-size: 16px !important;font-weight: 400 !important;">请选择至少 1 项便利设施，发布房源后可添加更多。</span>
          </div>
          <div>
            <el-checkbox-group v-model="amenitiesList" @change="getAmenitiesList">
              <div>
                <el-checkbox label="生活必需品">生活必需品</el-checkbox>
                <div style="margin-left: 25px">
                  <span>毛巾、床单、洗浴用品、卫生纸和枕头</span>
                </div>
              </div>
              <div>
              <el-checkbox label="基本厨具">基本厨具</el-checkbox>
                <div style="margin-left: 25px">
                  <span>炊事用具、油、盐和胡椒粉</span>
                </div>
              </div>
              <el-checkbox label="书桌/工作区">书桌/工作区</el-checkbox>
              <el-checkbox label="熨斗">熨斗</el-checkbox>
              <el-checkbox label="吹风机">吹风机</el-checkbox>
              <el-checkbox label="洗发水">洗发水</el-checkbox>
              <el-checkbox label="电视">电视</el-checkbox>
              <el-checkbox label="暖气">暖气</el-checkbox>
              <el-checkbox label="无线网络">无线网络</el-checkbox>
              <el-checkbox label="早餐、咖啡、茶">早餐、咖啡、茶</el-checkbox>
              <el-checkbox label="空调">空调</el-checkbox>
              <el-checkbox label="壁炉">壁炉</el-checkbox>
              <el-checkbox label="独立入口">独立入口</el-checkbox>
              <el-checkbox label="衣架">衣架</el-checkbox>
            </el-checkbox-group>
          </div>

        </div>
        </div>
        <el-divider></el-divider>
        <div style="margin-top: 30px;">
          <div>
            <span style="font-size: 24px !important;font-weight: 800 !important;">房客可以使用哪些区域或设施？</span>
          </div>
          <div>
            <span style="font-size: 16px !important;font-weight: 400 !important;">将公共区域涵盖其中，但不要添加您房源范围之外的空间。</span>
          </div>
          <div>
            <el-checkbox-group v-model="spacesList" @change="getSpacesList">
              <el-checkbox label="厨房">厨房</el-checkbox>
              <el-checkbox label="洗衣机">洗衣机</el-checkbox>
              <el-checkbox label="干衣机">干衣机</el-checkbox>
              <el-checkbox label="停车位">停车位</el-checkbox>
              <el-checkbox label="健身房">健身房</el-checkbox>
              <el-checkbox label="游泳池">游泳池</el-checkbox>
              <el-checkbox label="按摩浴缸">按摩浴缸</el-checkbox>
              <el-checkbox label="电梯">电梯</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <el-divider></el-divider>
        <div id="ruleDiv">
        <div style="margin-top: 30px;">
          <div>
            <span style="font-size: 24px !important;font-weight: 800 !important;">
              为房客制定房屋守则
            </span>
          </div>
          <div>
            <span style="font-size: 16px !important;font-weight: 400 !important;">房客必须同意您的《房屋守则》才能预订住宿。</span>
          </div>
          <div style="margin-top: 20px;">
            <div style="margin-top: 30px;">
              <span style="font-size: 16px !important;font-weight: 400 !important;">适合儿童（2-12岁）</span>
              <el-radio-group @change="getHouseRules" v-model="fitChild" style="float: right">
                <el-radio-button :label=true><i class="el-icon-check"></i></el-radio-button>
                <el-radio-button :label=false><i class="el-icon-close"></i></el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 30px;">
              <span style="font-size: 16px !important;font-weight: 400 !important;">适合婴幼儿（2岁以下）</span>
              <el-radio-group @change="getHouseRules" v-model="kids" style="float: right">
                <el-radio-button :label=true><i class="el-icon-check"></i></el-radio-button>
                <el-radio-button :label=false><i class="el-icon-close"></i></el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 30px;">
              <span style="font-size: 16px !important;font-weight: 400 !important;">适合携带宠物入住</span>
              <el-radio-group @change="getHouseRules" v-model="pets" style="float: right">
                <el-radio-button :label=true><i class="el-icon-check"></i></el-radio-button>
                <el-radio-button :label=false><i class="el-icon-close"></i></el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 30px;">
              <span style="font-size: 16px !important;font-weight: 400 !important;">允许吸烟</span>
              <el-radio-group @change="getHouseRules" v-model="smoke" style="float: right">
                <el-radio-button :label=true><i class="el-icon-check"></i></el-radio-button>
                <el-radio-button :label=false><i class="el-icon-close"></i></el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-top: 30px;">
              <span style="font-size: 16px !important;font-weight: 400 !important;">允许举办活动</span>
              <el-radio-group @change="getHouseRules" v-model="party" style="float: right">
                <el-radio-button :label=true><i class="el-icon-check"></i></el-radio-button>
                <el-radio-button :label=false><i class="el-icon-close"></i></el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <div style="margin-top: 50px;">
            <span style="font-size: 16px !important;font-weight: 800 !important;">其他守则</span>

            <div style="margin-top: 30px;" v-model="otherRules" v-show="otherRules!==null" v-for="(item,index) in otherRules" :key="item">
                <span style="font-size: 16px !important;font-weight: 400 !important;">{{item}}</span>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteRule(index)" style="float: right;" size="small"></el-button>
            </div>

            <div style="margin-top: 30px;">
              <el-input placeholder="某些时间需保持安静？室内不能穿鞋？" v-model="otherRule">
                <template slot="append"><el-button @click="addRule">添加</el-button></template>
              </el-input>
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
  import tips from "./tips";
  export default {
    name: "addDetail",
    data() {
      return {
        capacityNum: 1,//可住人数
        bedRoomNumber: 1,
        bedObjList:[{'id':0, 'totalBeds': 0, 'type1':0, 'type2':0, 'type3':0, 'type4':0, 'buttonFlag':false}],
        toiletNum: 0,
        amenitiesList: [],
        spacesList: [],
        roomName: "",
        description: "",
        recommendation: "",
        rules: ['适合儿童（2-12岁）', '适合婴幼儿（2岁以下）', '适合携带宠物入住', "允许吸烟", "允许举办活动"],
        fitChild: true,
        kids: true,
        smoke: true,
        pets: true,
        party: true,
        otherRule:"",
        otherRules:[],
        divName:"",
      }
    },
    components:{
      tips
    },
    methods: {
      getRoomName(){
        console.log(this.roomName);
        if (this.roomName.length>=6){
            this.$store.state.roomInfo['roomName']=this.roomName;
        }
      },
      getDescription(){
        console.log(this.description);
        if (this.description.length>=30){
          this.$store.state.roomInfo['description']=this.description;
        }
      },
      getRecommendation(){
        console.log(this.recommendation);
        if (this.recommendation.length>=30){
          this.$store.state.roomInfo['recommendation']=this.recommendation;
        }
      },
      getCapacity(){
        console.log(this.capacityNum);
        this.$store.state.roomInfo['capacity']=this.capacityNum;
      },
      getBedRoomNumber(bedRoomNumber) {
        this.bedObjList=[];
        for (let i=0 ;i<bedRoomNumber; i++){
          this.bedObjList.push({
            id:i,
            totalBeds: 0,
            type1:0,
            type2:0,
            type3:0,
            type4:0,
            buttonFlag:false
          })
        }
        console.log(bedRoomNumber);
        this.$store.state.roomInfo['bedRoomNumber'] = this.bedRoomNumber;//卧室数
      },
      addBeds(index){//在这里面更改roomInfo数据
        this.$store.state.roomInfo['bedObjList']=this.bedObjList;
        console.log(this.bedObjList);
        console.log(this.bedObjList[index].buttonFlag);
        if (this.bedObjList[index].buttonFlag){
          this.bedObjList[index].buttonFlag = false;
        } else {
          this.bedObjList[index].buttonFlag = true;
        }
      },
      getToilet(){
        console.log(this.toiletNum);
          this.$store.state.roomInfo['toilet']=this.toiletNum;

      },
      getAmenitiesList(){
        console.log(this.amenitiesList);
        this.$store.state.roomInfo['amenities']=this.amenitiesList;
      },
      getSpacesList(){
        console.log(this.spacesList);
        this.$store.state.roomInfo['spaces']=this.spacesList;
      },
      getHouseRules(){
        let str = "";
        if(this.fitChild){
            str+='适合儿童（2-12岁）'
        }
        if(this.kids){
          str+='适合婴幼儿（2岁以下）'
        }
        if(this.pets){
          str+='适合携带宠物入住 '
        }
        if(this.smoke){
          str+='允许吸烟 '
        }
        if(this.party){
          str+='允许举办活动 '
        }
        str = str.trimEnd();
        console.log(str);
        this.$store.state.roomInfo['houseRules'] = str;
      },
      scrollFun(){
        let s1 = document.getElementById("roomNameDiv");
        let s2 = document.getElementById("descriptionDiv");
        let s3 = document.getElementById("bedDiv");
        let s4 = document.getElementById("sheShiDiv");
        let s5 = document.getElementById("ruleDiv");

        let boxArr = [s1,s2,s3,s4,s5];
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight ;
        for(let i=0 ; i<=boxArr.length-1 ; i++){
          //  boxArr[i].offsetTop  标签距离页面顶部的距离
          let oTop = boxArr[i].offsetTop;
          let bH = boxArr[i].offsetHeight ;
          // if( (oTop-scrollTop >= 0  && scrollTop+winHeight-oTop > 100 ) || ( (oTop+bH-scrollTop)/ winHeight>0.6 && oTop-scrollTop <= 0  ) ){
          if((oTop+bH-scrollTop)>=100 &&(oTop+bH-winHeight-scrollTop)<=0){
            // console.info( boxArr[i].id  );  // 如果进入到窗口，输出 id
            this.divName = boxArr[i].id                                // 在实际项目中可以执行动画
          }
        }
      },
      culTotalBed(index){
          this.bedObjList[index].totalBeds=this.bedObjList[index].type1+this.bedObjList[index].type2+this.bedObjList[index].type3+this.bedObjList[index].type4;
      },
      addRule(){
        if (this.otherRule !== "" && this.otherRule!==null && this.otherRule.length!==0 && this.otherRule.trim().length!==0){
          this.otherRules.push(this.otherRule);
          this.getHouseRules();
        }
        this.otherRule = ""
      },
      deleteRule(index){
        this.otherRules.splice(index,1)
        this.getHouseRules();
      }
    },
    computed:{

    },
    created() {
      window.addEventListener("scroll",this.scrollFun);
      this.getHouseRules();
    }

  }
</script>

<style scoped>
  @import "../addInfo.css";

  .bedRoomAndNumber {
    margin-top: 50px;
  }

  .el-radio >>> .el-radio__input {
    /*//不要圆点*/
    display: none !important;
  }
  .el-checkbox{
    margin-top: 20px;
    display:block;
  }
  >>>.el-checkbox__label{
    cursor: inherit !important;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
    font-size: 16px !important;
    font-weight: bold;
    line-height: 20px !important;
  }
  .el-checkbox-group{
    font-size: unset;
  }

</style>
