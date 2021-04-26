<template>
  <div style="width: 1080px !important; height: 60px">
    <el-form>
      <el-form-item>
        <div class="nav-search">
          <el-input
            placeholder="输入目的地、城市或景点"
            v-model="input3"
            class="input-with-select"
            style="height: 60px"
          >
            <el-select
              v-model="select"
              slot="prepend"
              placeholder="房源"
              style="height: 60px"
            >
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-date-picker
              style="height: 60px"
              slot="suffix"
              v-model="value1"
              type="daterange"
              start-placeholder="入住日期"
              end-placeholder="退房日期"
            >
            </el-date-picker>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "NavSearch",
  components: {},
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      select: "",
      value1: "",
    };
  },
};
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.nav-search .el-input__inner {
  height: 60px !important;
}
.nav-search .el-date-editor .el-range-separator {
  line-height: 50px;
}
</style>
<style scoped>
</style>
