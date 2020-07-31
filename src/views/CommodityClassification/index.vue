<template>
  <div class="classfication">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item  v-for="(item, index) in classficaionList" :title="item.name" :key="index" :name='index'>
      </van-sidebar-item>
    </van-sidebar>
      <div class="classfication_info" v-if="classficaionList.length> 0">
        <div class="classfication_info_con">
          <img :src="classficaionList[activeKey].cover_img" alt="" class="classfication_list_img">
          <ul class="classfication_list">
            <li v-for="(item,index) in classficaionList[activeKey].children" :key="index" @click="goShopList(item.id)">
              <img :src="item.image.url" alt="">
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeKey: 0,
      classficaionList: []
    }
  },
  created () {
    this.getClassficaionList()
  },
  methods: {
    async getClassficaionList () {
      let res = await this.$http.get('http://hopehongyun.com:8888/api/shop/categories')
      if (res.data.errcode === 0) {
        this.classficaionList = res.data.data
      }
    },
    goShopList (id) {
      this.$router.push('/shopLists?id=' + this.classficaionList[this.activeKey].id + '&activeIndex=' + id)
    }
  }
}
</script>
<style lang="less" scoped>
.classfication {
  height: 100%;
  width: 100%;
  display: flex;
  /deep/ .van-sidebar {
    height: 100%;
    background:#fafafa;
  }
  .classfication_info {
    padding: 15px 10px;
    box-sizing: border-box;
    flex: 1;
    .classfication_list_img {
      width: 100%;
    }
    .classfication_list {
      display: flex;
      flex-wrap: wrap;
      li {
        width: (100%/3);
        text-align: center;
        img {
          width: 100%;
        }
      }
    }
  }
 }
</style>
