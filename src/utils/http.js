import axios from "axios";
import { Loading, Message } from "element-ui";
import store from "../store/store";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded; charset=UTF-8";

//设置拦截器
//请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.common["Authentication-Token"] = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}`, {
        params: params,
      })
      .then((res) => {
        if(res.data.state === '1'){
          resolve(res.data);
        }
        if (res.data.state ==='3'||res.data.state ==='5'||res.data.state ==='6'||res.data.state ==='4'){
          localStorage.removeItem("token");
          resolve(res.data);
          Message.error({
            showClose: true,
            message: res.data.msg,
          });
        }
        // else {
        //   Message.error({
        //     showClose: true,
        //     message: res.data.msg,
        //   });
        // }

      })
      .catch((err) => {
        Message.error({
          showClose: true,
          message: err,
        });
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}`, params)
      .then((res) => {
        if(res.data.state === '1'){
          resolve(res.data);
        }
        if (res.data.state ==='3'||res.data.state ==='5'||res.data.state ==='6'||res.data.state ==='4'){
          localStorage.removeItem("token");
          Message.error({
            showClose: true,
            message: res.data.msg,
          });
        }
        // else {
        //   Message.error({
        //     showClose: true,
        //     message: res.data.msg,
        //   });
        // }
      })
      .catch((err) => {
        Message.error({
          showClose: true,
          message: err,
        });
      });
  });
}
