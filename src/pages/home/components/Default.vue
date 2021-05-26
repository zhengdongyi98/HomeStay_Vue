<template>
<div>
  {{this.$route.query.rId}}
</div>
</template>

<script>
  export default {
    name: "Default",
    methods:{
      goRoom(){
        this.$router.push("/roomDetail?id="+this.$route.query.rId);
      }
    },
    created() {
      this.goRoom();
    }
  }
</script>

<style scoped>

</style>
