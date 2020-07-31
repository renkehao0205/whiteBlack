
<template>
  <div class="home_wrap">
    <header>
       <van-search placeholder="请输入搜索关键词" v-model="value" />
    </header>
    <main>
      <section>
        <div class="tabs">
          <van-tabs v-model="shopTabsIndex"  @click="tabClick">
            <van-tab  title="推荐" name="0">
              <div class="home_scroll" ref="home_scroll">
                <div class="home_scroll_con">
                  <div class="swipe">
                    <van-swipe :autoplay="3000" indicator-color="white">
                      <van-swipe-item v-for="(item, index) in swipeList" :key="index">
                        <img :src="item.imgUrl" alt="">
                      </van-swipe-item>
                    </van-swipe>
                  </div>
                  <div class="shopList">
                    <div class="shopList_con" v-for="(item,index) in shopList" :key="index">
                      <p>
                        <b>{{item.name}}</b>
                        <span @click="moreInfo(item.id,index)">更多</span>
                      </p>
                      <HomeInfo :item='item' :flag="false"/>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab v-for="(item,index) in tabsList" :title="item.name" :key="index" :name='item.id'>
              <HomeInfo :item='otherShopList' :flag="true" :imgUrl="imgUrl" :homeAllInfoList='tabsList[index].children' :id= 'shopTabsIndex'/>
            </van-tab>
          </van-tabs>
        </div>

    </section>
    </main>
    <p v-if="loading" class="loading">加载中......</p>
    <!-- <HomeInfo :item='otherShopList' v-else/> -->
  </div>
</template>
<script>
import HomeInfo from '@/components/homeInfo.vue'
import BScroll from 'better-scroll'
export default {
  name: 'Home',
  components: {
    HomeInfo
  },
  data () {
    return {
      value: '',
      HomeInfoIndex: 0,
      loading: false,
      shopTabsIndex: 0,
      tabsList: [],
      swipeList: [],
      ids: [],
      imgUrl: '',
      shopList: [],
      otherShopList: {}
    }
  },
  created () {
    this.getTabs()
    this.getSwipeList()
  },
  mounted () {
    this.$nextTick(() => {
      let scroll = new BScroll(this.$refs.home_scroll, {
        probeType: 2,
        click: true,
        tap: true
      })
      let num = 0
      scroll.on('scrollEnd', (page) => {
        // scroll.refresh()
        console.log(page.y, scroll.maxScrollY)
        if (Math.abs(page.y) > Math.abs(scroll.maxScrollY)) {
          num++
          if (num < this.ids.length - 1 && !this.loading) {
            scroll.refresh()
            this.loading = true
            setTimeout(() => {
              this.getShopList(this.ids[num])
            }, 500)
          } else {
            console.log('sfff')
          }
        }
      })
    })
  },
  methods: {
    tabClick (index, name) {
      this.shopTabsIndex = index
      if (Number(index) > 0) {
        this.getShopList(index)
        this.getMoreShopList(index)
      }
    },
    moreInfo (id, index) {
      this.shopTabsIndex = id
      this.getShopList(id)
    },
    // shopInfoList (id) {
    //   this.$http.get('/shop/inert-category-products?id=' + id).then(res => {
    //     if (res.data.errcode === 0) {
    //       this.otherShopList = res.data.data[0]
    //     }
    //   })
    // },
    getTabs () {
      this.$http.get('http://hopehongyun.com:8888/api/shop/categories').then(res => {
        if (res.data.errcode === 0) {
          this.tabsList = res.data.data
        }
      })
    },
    async getMoreShopList (id) {
      let res = await this.$http.get('http://hopehongyun.com:8888/api/shop/sub-category-products/' + id)
      if (res.data.errcode === 0) {
        this.otherShopList = res.data.data
      }
    },
    getShopList (id) {
      this.loading = true
      this.$http.get('http://hopehongyun.com:8888/api/shop/inert-category-products?id=' + id).then(res => {
        if (res.data.errcode === 0) {
          this.loading = false
          if (Number(this.shopTabsIndex) === 0) {
            this.shopList.push(res.data.data[0])
          } else {
            this.imgUrl = res.data.data[0].cover_img
          }
        }
      })
    },
    getSwipeList () {
      var data = {
        '0': {
          method: 'GET',
          url: 'http://hopehongyun.com:8888/api/shop/banners/shop_index',
          data: {}
        },
        '1': {
          method: 'GET',
          url: 'http://hopehongyun.com:8888/api/shop/inert-category-products',
          data: {}
        }
      }
      this.$http(data[0]).then(res => {
        this.swipeList = res.data.data.data
        console.log(res.data.data, 'rrrrr;;;')
      })
      this.$http(data[1]).then(res => {
        this.ids = res.data.categories
        // this.ids.map(item => {
        this.getShopList(this.ids[0])
      })
      // })
    }
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.home_wrap {
  padding: 15px 10px 65px 10px;
  box-sizing: border-box;
  height: 100%;
  main {
    height: 100%;
     section {
      height: 100%;
      overflow: hidden;
      .tabs {
        height: 100%;
        /deep/ .van-tabs {
          height: 100%;
          .van-tabs__content {
            height: 100%;
            .van-tab__pane {
              height: 100%;
              overflow: hidden;
               .home_scroll {
                  height: calc(100% - 140px);
                }
            }
          }
        }
      }
    }
  }
}
.swipe {
  height: 200px;
  overflow: hidden;
  /deep/ .van-swipe {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.shopList {
  width: 100%;
  height: 100%;
  .shopList_con {
    width: 100%;
    >p{
      display: flex;
      justify-content: space-between;
      height: 32px;
      line-height: 32px;
    }
  }
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  color: #fff;
  border-radius: 5px;
  background: rgba(0,0,0,.5);
}
</style>
