<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {
    }
  }
</script>
<style>
  @import "assets/css/base.css";
  html,body,#app{
    height:100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }
</style>
