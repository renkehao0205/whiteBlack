<template>
  <div class="shopLists">
    <div class="tabs">
      <van-tabs v-model="$route.query.activeIndex">
        <van-tab v-for="(item,index) in shopLists" :title="item.name" :key="index" :name="item.id+''">
          <HomeInfo :item='item' :flag="false"/>
      </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import HomeInfo from '@/components/homeInfo.vue'
export default {
  data () {
    return {
      shopLists: []
    }
  },
  components: {
    HomeInfo
  },
  created () {
    this.getShopLists(this.$route.query.id)
  },
  methods: {
    async getShopLists (id) {
      let res = await this.$http.get('http://hopehongyun.com:8888/api/shop/sub-category-products/' + id)
      if (res.data.errcode === 0) {
        this.shopLists = res.data.data
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .shopLists {
    width: 100vw,;
    height: 100vh;
    .tabs {
      height: 100%;
      /deep/ .van-tabs {
        height: 100%;
        .van-tabs__content {
          height: 100%;
          .van-tab__pane {
            height: 100%;
            overflow: hidden;
            .home_info {
              height: 100%;
            }
          }
        }
      }
    }
  }
  .shopList_info {
       display: flex;
       flex-wrap: wrap;
      li:nth-child(2n) {
        margin-left: 10px;
      }
       li {
         width: calc(50% - 5px);
         margin-top: 5px;
         margin-bottom: 5px;
         .shopList_info_img {
           width: 100%;
           background: #f9f9f9;
           img {
             width: 100%;
           }
         }
         .shopList_info_name {
           margin-top: 5px;
           font-size: 16px;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
         }
         .shopList_info_selling_point {
           font-size: 14px;
           color: #999;
           margin-top: 5px;
         }
       }
    }
</style>
