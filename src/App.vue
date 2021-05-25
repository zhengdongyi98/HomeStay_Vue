<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import {fetchDataFromLocal} from "./utils";

export default {
  name: "App",
  components: {},
  created() {
    this.$store.state.token = fetchDataFromLocal("token");
    let userInfo = JSON.parse(fetchDataFromLocal("user"));
    this.$store.state.user = userInfo;
  }
};
</script>
<style>
@import "assets/css/base.css";
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
