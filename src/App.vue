<template>
  <div id="app">
     <van-nav-bar
      title="BlackMarket"
      :fixed='true'
      class="navTitle"
      :left-arrow = "$route.path !=='/home' && $route.path !=='/CommodityClassification'&&$route.path !=='/shopCar'&&$route.path !=='/my'"
      @click-left="onClickLeft"
    />
    <keep-alive>
      <router-view v-if="$route.meta.flag"/>
    </keep-alive>
    <router-view  v-if="!$route.meta.flag"/>
  </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  name: 'App',
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async checkToken () {
      let userName = cookie.get('userName')
      let token = cookie.get('token')
      if (token) {
        await this.$http({method: 'post', url: 'http://hopehongyun.com:7001/black/checkToken', data: {userName: userName}})
      }
    }
  },
  mounted () {
    this.checkToken()
  }
}
</script>

<style>
*{
  margin: 0;
  padding:0;
}

#app {
  padding-top: 50px;
  width: 100%;
  height: 100%;
}
</style>
<style lang="less" scoped>
  #app .van-nav-bar {
    background-color: rgb(0, 0, 0);
    width: 100%;
    /deep/ .van-nav-bar__title {
      color:#fff;
    }
  }
</style>
