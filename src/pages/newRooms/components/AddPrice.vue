<template>
  <div style="display: flex;margin-bottom: 90px!important;">
    <div class="main-info-outside">
      <div class="main-info-inside">
        <div style="margin-top: 30px;">
          <span style="font-size: 24px !important;font-weight: 800 !important;">请选择要出租的月份</span>
          <div style="margin-top: 30px;">
            <div >
              <span class="demonstration"></span>
              <el-date-picker
                      :picker-options="pickerOptions"
                      @change="getTimeList"
                      v-model="timeList"
                      value-format="yyyy-MM"
                      type="monthrange"
                      range-separator="-"
                      start-placeholder="开始月份"
                      end-placeholder="结束月份">
              </el-date-picker>
            </div>
          </div>

          <div style="margin-top: 60px;">
            <div>
              <span style="font-size: 24px !important;font-weight: 800 !important;">请选择要屏蔽的日期</span>
              <div></div>
            </div>
            <div style="margin-top: 30px;">
              <span class="demonstration"></span>
              <el-date-picker
                      :picker-options="pickerOptions1"
                      type="dates"
                      @change="getBlockTime"
                      value-format="yyyy-MM-dd"
                      v-model="blockTime"
                      :clearable="false"
                      placeholder="选择屏蔽日期">
              </el-date-picker>
            </div>
          </div>
          <el-divider></el-divider>
          <div style="margin-top: 30px;">
            <div>
              <span style="font-size: 24px !important;font-weight: 800 !important;">为房源定价</span>
            </div>
            <div style="margin-top: 30px;">
              <span style="font-size: 16px !important;line-height: 20px !important;font-weight: 600 !important;">基础价格</span>
            </div>
            <div>
              <span style="font-size: 14px !important;line-height: 18px !important;">这将是您的默认价格。</span>
            </div>
            <div style="margin-top: 10px;">
              <el-input class="basePrice"@change="getBasePrice" v-model.number="basePrice" placeholder="请输入您的预期价格" ></el-input>
            </div>

          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    <tips :divName="divName"></tips>
  </div>
</template>

<script>
  import tips from "./tips";
  import moment from "moment";
  export default {
    name: "addPrice",
    data() {
      return {
        timeList: [],
        blockTime:[],
        basePrice: '',
        divName:"priceDiv",
        pickerOptions1: this.pickerOptions11(),

        pickerOptions: {
          disabledDate(time) {
            let cyear = (new Date()).getFullYear();
            let year = (new Date(time)).getFullYear();
            let cmonth = (new Date()).getMonth();
            let month = (new Date(time)).getMonth();
            // return time.getTime() < Date.now();
            if (year<cyear){
              return true
            } else if (year === cyear){
              return month < cmonth ;
            } else
              return false
          }
        },

      };
    },
    components:{
      tips
    },
    methods: {
      pickerOptions11() {
        let that = this;
        return {
          disabledDate(time) {
            let beginTime = (new Date(that.timeList[0])).getTime();
            let endTime = (new Date(that.timeList[1])).getTime();
            endTime = moment(endTime).add(1,"months").subtract(1,"day");
            return time.getTime() < beginTime || time.getTime() >= endTime || moment(time.getTime()).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD");;
          }
        }
      },
      getTimeList(){
        console.log(this.timeList);
        this.$store.state.roomInfo['timeList'] = this.timeList;
        this.blockTime = []
      },
      getBlockTime(){
        console.log(this.blockTime);
        this.$store.state.roomInfo['blockTime'] = this.blockTime;
      },
      getBasePrice(){
        console.log(this.basePrice);
        this.$store.state.roomInfo['basePrice'] = this.basePrice;
      }

      // scrollFun(){
      //   let s1 = document.getElementById("categoryDiv");
      //   let s2 = document.getElementById("locationDiv");
      //   let boxArr = [s1,s2];
      //   let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //   let winHeight = document.documentElement.clientHeight || document.body.clientHeight ;
      //   for(let i=0 ; i<=boxArr.length-1 ; i++){
      //     //  boxArr[i].offsetTop  标签距离页面顶部的距离
      //     let oTop = boxArr[i].offsetTop;
      //     let bH = boxArr[i].offsetHeight ;
      //     // if( (oTop-scrollTop >= 0  && scrollTop+winHeight-oTop > 100 ) || ( (oTop+bH-scrollTop)/ winHeight>0.6 && oTop-scrollTop <= 0  ) ){
      //     if((oTop+bH-scrollTop)>=110 &&(oTop+bH-winHeight-scrollTop)<=0){
      //       console.info( boxArr[i].id  );  // 如果进入到窗口，输出 id
      //       this.divName = boxArr[i].id                                // 在实际项目中可以执行动画
      //     }
      //   }
      // },

    },
    created() {
      // window.addEventListener("scroll",this.scrollFun);
    }
  }
</script>

<style scoped>
  @import "../addInfo.css";
  >>>.el-date-editor--monthrange.el-input, .el-date-editor--monthrange.el-input__inner{
    width: 500px!important;
  }
  >>>.el-range-input{
    font-size: 16px!important;
    font-weight: bolder;
  }
  >>>.el-input__inner{
    width: 500px!important;
  }
  >>>.basePrice>.el-input__inner{
    width: 500px!important;
    height: 60px!important;
    font-size: 20px;
  }
</style>
