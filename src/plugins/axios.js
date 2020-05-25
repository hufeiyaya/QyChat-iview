import axios from 'axios';
import { Message,MessageBox } from 'element-ui';
import store from '../store';
import { baseUrl } from 'config'
// import { getToken } from '';

window.temp=true;

axios.defaults.withCredentials=true;//让ajax携带cookie

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 300000, // 请求超时时间
  /***如果qs没有stringify,将下面方法打开才能提交form,只在post时生效 **/
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    // console.log("ret");
    // console.log(ret);
    return ret;
  }]
});

// request拦截器
service.interceptors.request.use(config => {

  let token = store.getters.token;
  // console.log(token)
  if (store.getters.token) {
    config.headers['X-Token'] = token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  config.headers['X-SysCode'] = 'stfinance'; //让每个请求携带SysCode,请根据实际情况自行修改

  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})
/**=======================================**/

// respone拦截器
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中,
   */
  response => {
    // return response.data;
    // console.log({response})

    const res = response.data;
    if (res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });
    }

    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (res.code === 503) {
      if(window.temp){
        window.temp=false;
        MessageBox.confirm('你的会话已失效', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
     
        }).then(() => {
          window.temp=true;
          window.clearInterval(window.interval);    //清除计时器
          sessionStorage.removeItem('userInfo');    //清除用户信息
          store.commit('logOut');    //注销
          location.reload(); // 为了重新实例化vue-router对象 避免bug
         
          
        }).catch(() => {       
          
        });
      }
    }
    return response.data;

  },
  /**接口交互错误是处理,如果特殊错误,可对message进行修改**/
  error => {
    // console.log(error.response.code);//  debug
    let message = error.message;
    console.log(error);
    if (error.response.code == 500) {
      message = "请求异常";
    }
    if (error.response.code == 504) {
      message = "服务器异常";
    }
    if (error.response.code == 404) {
      message = "找不到服务内容";
    }

    /**错误弹框,仅在element-ui适用,如果使用其他前端框架(如手机端的),要相应进行修改**/
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }

)

export default service;