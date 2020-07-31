<template>
  <div class="service">
    <div class="service_img"></div>
    <span @click="sends" class="sends">服务中断，请点击这里通知任科皓</span>
  </div>
</template>
<script>
import { sha256 } from 'js-sha256'
export default {
  name: 'service',
  data () {
    return {
      flag: window.localStorage.setItem('flag', true)
    }
  },
  methods: {
    async sends () {
      if (!window.localStorage.getItem('times') && this.flag) {
        await this.sendMessage()
      }
      if (parseInt(Date.now() / 1000) - window.localStorage.getItem('times') > 300) {
        this.sendMessage()
      } else {
        var time1 = parseInt(Date.now() / 1000)
        this.flag = window.localStorage.getItem('flag')
        if (this.flag) {
          var times = time1 - window.localStorage.getItem('times')
          alert(300 - times + 's再试')
        } else {
          alert('通知上限，明天再来')
        }
      }
    },
    async sendMessage () {
      let sig = sha256(`appkey=c37732e4a041de77146f15fb479d01a0&random=497984&time=${parseInt(Date.now() / 1000)}&mobile=18515355836`)
      let res = await this.$http({
        method: 'post',
        url:
          'https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=1400294477&random=497984',
        data: {
          ext: '',
          extend: '',
          params: ['ren'],
          sig,
          sign: '任科皓图片分享',
          tel: {
            mobile: '18515355836',
            nationcode: '86'
          },
          time: parseInt(Date.now() / 1000),
          tpl_id: 497984
        }
      })
      if (res.data.result === 0) {
        this.flag = window.localStorage.setItem('flag', true)
        window.localStorage.setItem('times', parseInt(Date.now() / 1000))
        alert('已经通知他了，请稍后')
      } else {
        this.flag = window.localStorage.setItem('flag', false)
        window.localStorage.setItem('times', parseInt(Date.now() / 1000))
        alert('通知上限，明天再来')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.service {
  width: 100%;
  height: 100%;
  .service_img {
    width: 100%;
    min-height: 300px;
    background: url("../../assets/image/500.jpg") no-repeat 0 0;
    background-size: 100%;
  }
  .sends {
    color: blue;
    margin-left: 20px;
  }
}
</style>
