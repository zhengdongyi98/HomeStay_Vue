<template>
  <div>
    <el-container>
      <el-header style="height: 530px">
        <NavMenu></NavMenu>
      </el-header>
      <el-main>
        <!-- v-for应该写在这里，循环生成Rooms -->
        <Rooms></Rooms>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "../../components/TopNav/NavMenu";
import Rooms from "./components/Rooms";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    NavMenu,
    Rooms,
  },
};
</script>

<style>
.el-header {
  background-image: url("../../assets/image/封面.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.el-main {
  text-align: center;
}
</style>
