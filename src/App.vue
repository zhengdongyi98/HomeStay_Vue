<template>
  <div id="app">
    <container></container>
  </div>
</template>
<script>
  import container from "./components/content/container"
  export default {
    name: 'App',
    components: {
      container
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
