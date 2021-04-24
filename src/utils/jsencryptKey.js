import Vue from 'vue'
import{JSEncrypt} from 'jsencrypt'

Vue.prototype.$encruption = function (obj) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(

      `----- BEGIN PUBLIC KEY -----
      MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb8sSIr7fCpfEwPTGK8IZK2IGi5T7O8bUIjdNKt28KeBs53pHC7KN2RbjUDrxNmgx0nhm0cJ9bOg62GxG1qMPYictMuSWZbShryjSQDL53g9LG7uE0GsRGBIyQM5//1RVGbw6Cm4WzgGX96j7IoJvQML4x7Ndg3+vbtILrRDPEiwIDAQAB
       ----- END PUBLIC KEY -----`

  )
  return encrypt.encrypt(obj);
}
