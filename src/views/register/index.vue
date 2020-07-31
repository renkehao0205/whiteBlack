<template>
  <div class="register" data-testid="text-login">
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
        v-model="phone"
        type='number'
        required
        label="手机号"
        placeholder="请输入手机号"
        :error-message="telerrmessage"
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
    <van-button type="primary" @click="register" class='button' >注册</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '',
      password: '',
      usererrmsg: '',
      pwderrmsg: '',
      phone: '',
      telerrmessage: ''
    }
  },
  methods: {
    async register () {
      if (this.userName === '' || this.password === '' || this.phone === '') {
        this.usererrmsg = this.userName ? '' : '用户名不能为空'
        this.telerrmessage = this.phone ? '' : '手机号不能为空'
        this.pwderrmsg = this.password ? '' : '密码不能为空'
      } else {
        var rules = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
        if (rules.test(this.phone)) {
          this.telerrmessage = ''
        } else {
          this.telerrmessage = '手机号格式不正确'
          return
        }
        let res = await this.$http({method: 'post',
          url: 'http://hopehongyun.com:7001/black/regsinblackmarket',
          data: {
            userName: this.userName,
            password: this.password,
            phone: this.phone
          }})
        if (res.data.code === 0) {
          alert(res.data.msg + ',请去登录')
          this.$router.push('/login')
        } else {
          alert(res.data.msg)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .register {
    width: 100;
    height: 100%;
    background: url('../../assets/image/register_bg.jpg') no-repeat 0 0;
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
</style>
