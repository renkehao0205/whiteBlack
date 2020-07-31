<template>
  <div class="login" data-testid="text-login">
    <div class="phone-login" v-if="$route.fullPath==='/login?type=phone'">
      <van-cell-group>
        <van-field
          v-model="phone"
          type='number'
          required
          label="手机号"
          placeholder="请输入手机号"
          :error-message="telerrmessage"
        />
        <van-field
          v-model="code"
          center
          clearable
          required
          label="短信验证码"
          placeholder="请输入短信验证码"
          :error-message="codeerrmessage"
        >
          <van-button slot="button" size="small" type="primary" @click="sendCode" :disabled="btnDisabled">
            发送验证码
            <span v-if="btnDisabled">{{times}}</span>
          </van-button>
        </van-field>
      </van-cell-group>
      <div class="userRules" @click="goLogin('/login')">
       账号密码登录
     </div>
    </div>
    <div class="user-name-login" v-else>
      <van-cell-group>
        <van-field
          v-model="userName"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          :error-message='usererrmsg'
          @click-right-icon="$toast('请输入用户名')"
        />
        <van-field
          v-model="password"
          :error-message='pwderrmsg'
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
     <div class="phoneRules" @click="goLogin('/login?type=phone')">
       手机号验证登录
     </div>
    </div>
    <van-button type="primary" @click="login" class='button'>登录</van-button>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      userName: '',
      btnDisabled: false,
      password: '',
      usererrmsg: '',
      pwderrmsg: '',
      code: '',
      telerrmessage: '',
      codeerrmessage: '',
      phone: '',
      times: 120
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    ...mapActions({
      loginInfo: 'user/logins'
    }),
    async login () {
      if (this.$route.fullPath === '/login') {
        if (this.userName === '' || this.password === '') {
          this.usererrmsg = this.userName ? '' : '用户名不能为空'
          this.pwderrmsg = this.password ? '' : '密码不能为空'
        } else {
          await this.loginInfo({ userName: this.userName, password: this.password })
        }
      } else {
        if (this.phone === '' || this.code === '') {
          this.telerrmessage = this.phone ? '' : '手机号不能为空'
          this.codeerrmessage = this.code ? '' : '验证码不能为空'
        } else {
          await this.loginInfo({ phone: this.phone, code: this.code })
        }
      }
    },
    sendCode () {
      var rules = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (this.phone && rules.test(this.phone)) {
        this.btnDisabled = true
        this.countDown()
        this.$http.get('http://hopehongyun.com:7001/black/sendMessage?phone=' + this.phone).then(res => {
          if (res.data.code === 0) {
            this.btnDisabled = true
          } else {
            this.btnDisabled = false
            this.times = 120
          }
          alert(res.data.msg)
          if (res.data.msg === '手机号没有注册，请去注册') {
            this.$router.push('/register')
          }
        })
      } else {
        this.telerrmessage = '手机不能为空或手机号格式不正确'
      }
    },
    countDown () {
      if (!this.btnDisabled) {
        return
      }
      if (this.times > 0) {
        this.times--
        setTimeout(() => {
          this.countDown()
        }, 1000)
      } else {
        this.btnDisabled = false
      }
    },
    goLogin (path) {
      this.$router.push(path)
    }
  },
  watch: {
    userInfo: {
      deep: true,
      handler (news, olds) {
        let data = news.data
        if (data.code === 0) {
          setTimeout(() => {
            window.location.href = '/'
          }, 500)
        } else if (data.code === 1) {
          alert(data.msg)
        } else {
          alert(data.msg)
          this.$router.push('/register')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100;
  height: 100%;
  background: url('../../assets/image/login_bg.jpg') no-repeat 0 0;
  background-size: 100% 100%;
  /deep/ .van-cell-group {
    background-color: transparent;
    .van-cell {
      background-color: transparent;
    }
  }
}
 .button {
   display: block;
   width: 90%;
   margin: 100px auto;
   span {
     display: inline-block;
     width: 100%;
   }
 }
 .userRules, .phoneRules {
   color: blue;
   margin-top: 20px;
   margin-left: 20px;
 }
</style>
