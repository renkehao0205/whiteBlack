<template>
  <div class="my-wrap">
    <div class="my-user-info">
      <img src="http://hopehongyun.com:8081" alt="">
      <span>{{userName}}</span>
    </div>
    <div class="my-content">
      <ul class="content-list">
        <li @click="goAddress">地址管理</li>
      </ul>
    </div>
    <div class="my-wrap-footer">
      <van-button type="primary" size="large" @click.prevent="exit">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import cookie from 'js-cookie'
export default {
  name: 'my',
  data () {
    return {
      userName: ''
    }
  },
  created () {
    this.userName = cookie.get('userName')
  },
  computed: {
  },
  methods: {
    goAddress () {
      this.$router.push('/address')
    },
    async exit() {
      let res = await this.$http.post('http://hopehongyun.com:7001/black/exitLogin')
    }
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
  .my-wrap {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    .my-user-info {
      height: 20%;
      background-color: #999;
      display: flex;
      align-items: center;
      img {
        margin-left: 10px;
        margin-right: 10px;
        overflow: hidden;
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      span {
        color: #fff;
        font-size: 20px;
        letter-spacing: 4px;
      }
    }
    .my-content {
      flex: 1;
    }
    .content-list {
      box-sizing: border-box;
      padding: 0 8px;
      li {
        padding: 15px 0;
        border-bottom: 1px solid #999;
      }
    }
  }
</style>
