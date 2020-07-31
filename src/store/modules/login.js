import $http from '@/api/index.js'
import cookie from 'js-cookie'

const state = {
  userInfo: {}
}
const mutations = {
  LOGIN (state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  logins ({commit}, userInfo) {
    $http(
      {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        url: 'http://hopehongyun.com:7001/black/loginblackmarket',
        data: userInfo
      }).then(res => {
      let data = res.data
      console.log(data)
      if (data.code === 0) {
        console.log(data)
        cookie.set('token', data.data.token)
        cookie.set('userName', data.data.userName)
        cookie.set('session_id', data.data.session_id)
      }
      commit('LOGIN', res)
      // if (res.data.code === 0) {
      //   window.location.reload()
      // }
    })
    // console.log(userInfo, 'action')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
