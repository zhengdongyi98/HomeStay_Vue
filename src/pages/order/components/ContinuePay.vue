<template>
  <div style="width: 100%;height: 100%;text-align: center;">
    <div style="margin-top: 20%;" >
      <span style="font-size: 20px">{{description}}</span>
    </div>
  </div>
</template>

<script>
  import {continueOrder} from "../../../service/order";

  export default {
    name: "ContinuePay",
    data(){
      return{
        description:"正在处理您的订单，请稍候！"
      }
    },
    methods:{
      async initContinue(){
        const data = await continueOrder(this.$route.query.orderNo)
        if (data.data===""||data.data===null||data.data==="支付失败"){
          this.description = "支付失败，订单可能已超时，请重试"
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        }else {
          document.querySelector('body').innerHTML = data.data
          document.forms[0].submit();
        }
      }
    },
    created() {
      this.initContinue()
    }
  }
</script>

<style scoped>

</style>
