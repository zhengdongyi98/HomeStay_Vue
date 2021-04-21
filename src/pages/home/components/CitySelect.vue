<template>
  <div style="display: flex; margin-bottom: 20px">
    <div
      v-for="(city, index) in cityList"
      :key="index"
      @click="setCurrentSelectCity(city)"
      :class="
        currentSelectCity === city
          ? 'city-select-button select'
          : 'city-select-button normal'
      "
    >
      {{ city }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CitySelect",
  data() {
    return {
      cityList: [
        "重庆",
        "成都",
        "厦门",
        "长沙",
        "丽江",
        "广州",
        "上海",
        "大理",
      ],
      currentSelectCity: "",
    };
  },
  props: {
    setSelectCity: {
      type: Function,
    },
  },
  methods: {
    setCurrentSelectCity(city) {
      if (this.currentSelectCity === city) {
        //  选中后再次点击可取消，home接收到空字符串
        this.currentSelectCity = "";
        this.setSelectCity("");
      } else {
        this.currentSelectCity = city;
        this.setSelectCity(city);
      }
    },
  },
};
</script>

<style scoped>
.city-select-button {
  margin-right: 20px;
  min-width: 120px;
  height: 48px;
  padding: 14px 16px;
  border-radius: 3px;

  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 17px;

  text-align: center;
  font-weight: bold;
  line-height: 20px;
  outline: none;
  cursor: pointer;
}
.select {
  border: solid 0.5px #00848a;
  background: #00848a;
  color: #ffffff;
  box-shadow: 0px 7px 14px rgb(0 132 138 / 15%);
}
.normal {
  border: solid 0.5px #d8d8d8;
  color: #484848;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgb(0 0 0 / 15%);
  -webkit-transition: box-shadow 0.5s;
  -moz-transition: box-shadow 0.5s;
  transition: box-shadow 0.5s;
}
.normal:hover {
  box-shadow: 0px 3px 6px rgb(0 0 0 / 15%);
}
</style>
