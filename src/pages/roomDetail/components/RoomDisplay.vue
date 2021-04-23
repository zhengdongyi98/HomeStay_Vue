<template>
  <el-container>
    <el-main>
      <div class="category">
        <span>{{RoomDetailData.baseRoom.category}}·{{RoomDetailData.baseRoom.type}}</span>
      </div>
    </el-main>
    <el-aside></el-aside>
  </el-container>

</template>
<script>
  export default {
    data() {
      return {
        activeName: 'RoomDisplay'
      };
    },
    methods: {

    },
    props: {
      RoomDetailData: {
        type: Object,
      },
    },
  };
</script>

<style scoped>
.el-container{
  margin-left: 10%;
  margin-right: 10%;
  height: 1000px;
  /*width: 100%;*/
}
  .el-main{
    width: 66.66%!important;
    border: black solid 1px;
  }
  .el-aside{
    width: 33.33% !important;
    border: red solid 1px;
  }
</style>
