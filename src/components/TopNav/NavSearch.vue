<template>
  <div style="width: 1080px !important; height: 60px">
    <el-form>
      <el-form-item>
        <div class="nav-search">
          <el-input
            placeholder="输入目的地、城市或景点"
            v-model="location"
            class="input-with-select"
            style="height: 60px"
          >
            <el-select
              v-model="select"
              slot="prepend"
              placeholder="房源"
              style="height: 60px"
            >
              <el-option label="房源" value="1"></el-option>
            </el-select>
            <el-date-picker
              style="height: 60px;"
              slot="suffix"
              :picker-options="pickerOptions1"
              @change="getTimeList"
              value-format="yyyy-MM-dd"
              v-model="timeList"
              type="daterange"
              start-placeholder="入住日期"
              end-placeholder="退房日期"
            >
            </el-date-picker>
            <el-button slot="append" icon="el-icon-search" @click="searchRoom"></el-button>
          </el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import moment from "moment";

export default {
  name: "NavSearch",
  components: {},
  data() {
    return {
      timeList: [],
      location: "",
      select: "",
      pickerOptions1: this.pickerOptions11(),
    };
  },
  methods:{
    pickerOptions11() {
      return {
        disabledDate(time) {
          return moment(time.getTime()).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD");
        }
      }
    },
    getTimeList(){
      console.log(this.timeList);
      if (this.timeList!==null) {
        if(this.timeList[0]===this.timeList[1]){
          this.$message.error("不能一样")
          this.timeList = []
        }else {
        }
      }
    },
    searchRoom(){
      this.$router.push({
        path: '/roomSearch',
        query:{
          location:this.location,
          timeList:this.timeList
        }
      })
    }
  }
};
</script>

<style>
.el-select .el-input {
  width: 130px
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.nav-search .el-input__inner {
  height: 60px !important;
  font-size: 15px!important;
  font-weight: bold!important;
  color: black!important;
  padding-right: 0px!important;
}
.nav-search .el-date-editor .el-range-separator {
  line-height: 50px;
}
</style>
<style scoped>
</style>
