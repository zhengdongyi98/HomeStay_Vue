<template>
  <div>
    <el-container>
      <el-header style="height: 530px">
        <NavMenu></NavMenu>
      </el-header>
      <el-main>
        <Rooms></Rooms>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import NavMenu from "../content/NavMenu"
  import Rooms from "../content/Rooms"
  export default {
    name: "container",
    components: {
      NavMenu,Rooms
    }
  }
</script>

<style>

  .el-header {
    background-image: url("../../assets/image/封面.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }
  .el-main{
    text-align: center;
  }



</style>
