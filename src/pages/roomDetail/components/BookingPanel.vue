<template>
  <div class="main-container">
    <div>¥204</div>
    <div>
      {{ price[0].price }}
      日期
      <el-date-picker
        :picker-options="pickerOptions"
        v-model="value1"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 100%"
      >
      </el-date-picker>
    </div>
    <div>
      人数
      <div>
        <el-select v-model="value" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <el-button type="danger" style="width: 100%">预定</el-button>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "BookingPanel",
  props: {
    price: {
      type: Array,
    },
  },
  data() {
    return {
      pickerOptions: this.pickerDisable(),
      value1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  methods: {
    pickerDisable() {
      // 禁止选择blockState为1的日期
      const that = this;
      return {
        disabledDate(time) {
          const disableTimeList = that.price
            .filter((item) => !!item.blockState)
            .map((item) => item.time);
          return (
            disableTimeList.indexOf(
              moment(time.getTime()).format("YYYY-MM-DD")
            ) > -1
          );
        },
      };
    },
  },
};
</script>

<style scoped>
.main-container {
  padding: 24px;
  margin: 0px !important;
  border: 1px solid #e4e4e4 !important;
  background-color: #ffffff !important;
  height: 200px;
}
</style>