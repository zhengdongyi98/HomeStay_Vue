<template>
  <div class="main-container">
    <div style="color: rgb(72, 72, 72); font-size: 18px">
      ¥ {{ basePrice }} <span style="font-size: 12px">每晚</span>
    </div>
    <div style="margin-top: 20px">
      日期
      <div>
        <a-range-picker
          @change="onChange"
          :disabled-date="disabledDate"
          :locale="locale"
        >
          <template slot="dateRender" slot-scope="current">
            <div class="ant-calendar-date">
              <div>
                <span style="font-weight: 800">{{ current.date() }}</span>
                <span
                  v-if="getCurrentStyle(current)"
                  style="
                    font-size: 5px;
                    top: -5px;
                    position: relative;
                    font-weight: 300;
                  "
                >
                  ¥{{ getCurrentStyle(current) }}
                </span>
              </div>
            </div>
          </template>
        </a-range-picker>
      </div>
    </div>
    <div style="margin-top: 20px">
      人数
      <div>
        <el-select v-model="people" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in RoomDetailData.baseRoom.capacity"
            :key="item"
            :label="`${item}人`"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div v-if="totalPrice !== -1" style="margin-top: 20px">
      <el-row>
        <el-col :span="12">{{ days }}晚</el-col>
        <el-col :span="12" style="text-align: end">¥{{ totalPrice }}</el-col>
      </el-row>
      <div
        style="border-bottom: 1px rgb(235, 235, 235) solid; margin: 10px 0px"
      ></div>
      <el-row>
        <el-col :span="12">总价</el-col>
        <el-col :span="12" style="text-align: end">¥{{ totalPrice }}</el-col>
      </el-row>
    </div>
    <el-button type="danger" style="width: 100%; margin-top: 20px"
      >预定</el-button
    >
    <div v-if="totalPrice !== -1" style="margin-top: 20px">
      <div style="color: rgb(72, 72, 72)">
        享受 4月23日 – 5月31日 期间的 8 折优惠
      </div>
      <div>在 11 天内完成预订，锁定限时好价</div>
    </div>
  </div>
</template>

<script>
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import moment from "moment";
export default {
  name: "BookingPanel",
  props: {
    price: {
      type: Array,
    },
    basePrice: {
      type: Number,
    },
    RoomDetailData: {
      type: Object,
    },
  },
  // components: {
  //   RangePicker,
  // },
  data() {
    return {
      locale,
      selectDate: "",
      people: "",
      totalPrice: -1,
      days: 0,
    };
  },
  methods: {
    onChange(date, dateString) {
      if (dateString[0] && dateString[1]) {
        this.selectDate = dateString;
        const { price } = this;
        const [startTime, endTime] = dateString;
        const sIndex = price.findIndex((item) => item.time === startTime);
        const eIndex = price.findIndex((item) => item.time === endTime);
        let priceList = [];
        for (let i = sIndex; i <= eIndex; i++) {
          priceList.push(price[i]);
        }
        priceList = priceList.filter((item) => !item.blockState);
        let sum = 0;
        priceList.map((item) => {
          sum += item.price;
        });
        this.days = priceList.length;
        this.totalPrice = sum;
      } else {
        this.days = 0;
        this.totalPrice = -1;
      }
    },
    getCurrentStyle(current, today) {
      const index = this.price.findIndex(
        (item) =>
          item.time === moment(current).format("YYYY-MM-DD") && !item.blockState
      );
      if (index > -1) {
        return this.price[index].price;
      } else {
        return false;
      }
    },
    disabledDate(time) {
      const disableTimeList = this.price
        .filter((item) => !item.blockState)
        .map((item) => item.time);
      return !(disableTimeList.indexOf(moment(time).format("YYYY-MM-DD")) > -1);
    },
  },
};
</script>

<style scoped>
.main-container {
  padding: 24px;
  border: 1px solid #e4e4e4 !important;
  background-color: #ffffff !important;
  width: 95%;
  margin-left: 5%;
}
.ant-calendar-date {
  width: 40px;
  height: 40px;
}
.ant-calendar-range .ant-calendar-selected-start-date .ant-calendar-date,
.ant-calendar-range .ant-calendar-selected-end-date .ant-calendar-date {
  background-color: rgb(18, 132, 136);
}
.ant-calendar-date:hover {
  background-color: rgb(205, 238, 235);
}
.ant-calendar-range .ant-calendar-selected-start-date .ant-calendar-date:hover,
.ant-calendar-range .ant-calendar-selected-end-date .ant-calendar-date:hover {
  background-color: rgb(205, 238, 235);
}
.ant-calendar-cell.ant-calendar-in-range-cell.ant-calendar-disabled-cell-first-of-row.ant-calendar-disabled-cell-last-of-row.ant-calendar-disabled-cell
  > div
  > div
  > span {
  color: rgb(184, 184, 184);
}
.ant-calendar-cell.ant-calendar-in-range-cell.ant-calendar-disabled-cell-first-of-row.ant-calendar-disabled-cell-last-of-row.ant-calendar-disabled-cell
  > div {
  background-color: rgb(245, 245, 245);
}
.ant-calendar-range .ant-calendar-in-range-cell > div {
  background-color: rgb(205, 238, 235);
  color: rgb(18, 132, 136);
}
</style>
<style>
.ant-calendar-range {
  width: 600px !important;
}
</style>