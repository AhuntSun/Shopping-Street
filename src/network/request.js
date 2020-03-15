// 导入axios框架
import axios from 'axios'

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    //2.axios拦截器
    //2.1.请求拦截
    instance.interceptors.request.use(config => {
      // console.log(config);
      return config;
    },err => {
      console.log(err);
    });

    //2.2.响应拦截
    instance.interceptors.response.use(res => {
      // console.log(res.data);
      return res.data;
    },err => {
      console.log(err);
    })

    //3.发送真正的网络请求
    // 该函数返回的直接是一个Promise，所以其他地方调用它的时候可以直接.then()
    return instance(config)
}