<template>
  <div class="Index_wrap">
    <router-view/>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to='/home'>首页</van-tabbar-item>
      <van-tabbar-item icon="search" to='/CommodityClassification'>分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to='/shopCar'>购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to='/my'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.Index_wrap {
  width: 100vw;
  height: 100vh;
}
</style>
