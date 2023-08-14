import axios from 'axios'
import { showMessage } from "./status"   // 引入状态码文件
import { ElMessage } from 'element-plus'  // 引入el 提示框
  // 设置接口超时时间
  axios.defaults.timeout = 60000
  // 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
  // axios.defaults.baseURL = 'http://192.168.50.3:8888/app'
  axios.defaults.baseURL = '/api'
  //http request 拦截器
  axios.interceptors.request.use(
    config => {
    // 配置请求头
      config.headers = {
        'Content-Type':'application/json;charset=UTF-8',
        // 'token':'666'
      }
      return config
      
    },
    error => {
      return Promise.reject(error)
    }
  )
  //http response 拦截器
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const {response} = error
      if (response) {
        // 请求已发出，但是不在2xx的范围
        showMessage(response.status)// 响应码
        return Promise.reject(response.data)
      } else {
        ElMessage.warning('网络连接异常,请稍后再试!')
      }
    }
  )
  // 封装 GET POST 请求并导出
  export function request(url='', params={}, type='POST'){
  //设置 url params type 的默认值
    return new Promise((resolve, reject)=>{
      let promise
      if( type.toUpperCase() === 'GET' ){
        promise = axios({
          url,
          params
        })
      }else if( type.toUpperCase() === 'POST' ){
        promise = axios({
          method:'POST',
          url,
          data:params
        })
      }
      //处理返回
      promise.then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }
