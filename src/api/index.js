import Vue from 'vue'
import axios from 'axios'
import cookie from 'js-cookie'
import router from '../router'
const errorFn = err => {
  console.log(err.toString())
  if (err.toString().indexOf('timeout') !== -1) {
    Vue.prototype.$message.error('请求超时，请稍后再试')
  }
  if (err.toString().indexOf('Network Error') !== -1) {
    router.push('/service')
  }
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 501:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 502:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 503:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 504:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
        err.message = '请求失败，请稍后再试'
    }
    Vue.prototype.$message.error(err.message)
  }
  return Promise.reject(err)
}
/* ***此处开始封装不同后台下的axios实例 ****/
const $http = axios.create({
  headers: {
    'content-type': 'application/json'
  },
  baseURL: '',
  timeout: 30000
  // withCredentials: true
})
$http.interceptors.request.use(
  config => {
    if (config.url.indexOf('black') !== -1) {
      config.headers.token = cookie.get('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
$http.interceptors.response.use(response => {
  console.log(response.data.code, 'pppppppp')
  if (response.config.url === 'http://hopehongyun.com:7001/black/checkToken' && response.data.code === 2333) {
    // console.log(response)
    // debugger
    cookie.remove('token')
    cookie.remove('userName')
    // window.location.href = '/'
    // setTimeout(() => {
    //   window.location.reload()
    // }, 500)
  } else {
    return response
  }
  // return response
}, errorFn)
Vue.prototype.$http = $http
export default $http
