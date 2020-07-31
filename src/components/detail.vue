<template>
  <div class="detail_wrap">
    <scroll>
    <div class="detail-con">
      <div class="detail_swipe">
      <van-swipe @change="onChange" :autoplay="3000" :show-indicators='false'>
        <van-swipe-item  v-for="(item,index) in detailList.images" :key="index">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </van-swipe>
      <div class="active_animation">
        <p :style="{'width':activeIndex+'%','background':'#000'}"></p>
      </div>
    </div>
    <div class="detail_info">
      <p class="detail_info_name">{{detailList.name}}</p>
      <p class="detail_info_selling_point">{{detailList.selling_point}}</p>
      <p class="detail_info-sell_price">￥{{detailList.sell_price/100}}.00</p>
      <van-tag plain type="warning">小二推荐</van-tag>
      <p class="detail_info_recommend">{{detailList.recommend}}</p>
    </div>
    <div v-html="detailList.description" class='description'></div>
    </div>
</scroll>

    <div class="detail_sku">
       <div class="buy">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="goShopCar" />
        <van-goods-action-icon icon="shop-o" text="店铺"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="addShopCar"/>
        <van-goods-action-button type="danger" text="立即购买" @click="onBuy"/>
      </van-goods-action>
    </div>
      <van-sku
        v-model="show"
        :sku="sku"
        ref='sku'
        :goods="goods"
        :goods-id="goodsId"
        :quota="quota"
        :quota-used="quotaUsed"
        :hide-stock="hide_stock"
        :custom-stepper-config="customStepperConfig"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
        @sku-selected='selectShop'
      />
    </div>
  </div>
</template>

<script>
import scroll from '@/components/scroll.vue'
import cookie from 'js-cookie'
export default {
  name: 'HelloWorld',
  data () {
    return {
      detailList: {},
      activeIndex: 0,
      show: false,
      sku: {
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: 0, // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        none_sku: false// 是否无规格商品
      },
      goods: {},
      goodsId: null,
      quota: 0,
      quotaUsed: 0,
      hide_stock: false,
      customStepperConfig: {
      },
      shopInfo: {}
    }
  },
  components: {
    scroll
  },
  created () {
    this.getDetailList()
  },
  methods: {
    onChange (index) {
      this.activeIndex = (100 / this.detailList.images.length) * (index + 1)
    },
    getDetailList () {
      this.$http({method: 'get', url: `http://hopehongyun.com:8888/api/shop/product/${this.$route.query.id}`}).then(res => {
        if (res.data.errcode === 0) {
          this.detailList = res.data.data
          this.goodsId = res.data.data.id
          this.goods.picture = res.data.data.cover_img
          var list = []
          res.data.data.specs.forEach((items, index) => {
            var v = []
            // var obj = {}
            res.data.data.goods.map((item, i) => {
              console.log(item.spec_info[index])
              if (!item.spec_info[index].has_image) {
                v.push({ id: item.id, name: item.spec_info[index].value })
              } else {
                // let result = obj[item.spec_info[index].value] ? '' : obj[item.spec_info[index].value] = true
                v.push({ id: item.id, name: item.spec_info[index].value, imgUrl: item.spec_info[index].image.url })
              }
              list.push({id: res.data.data.id, s1: item.id, s2: item.id, price: item.sell_price + '.00', stock_num: item.stock_nums})
            })
            this.sku.tree.push({k: items.spec_name, v, k_s: 's' + (index + 1)})
          })

          this.sku.price = res.data.data.min_sell_price / 100 + '.00' + '-' + this.detailList.max_sell_price / 100 + '.00'
          this.sku.stock_num = res.data.data.stock_nums
          // this.sku.tree = [{k, v, k_s: 's1'}]
          this.sku.list = list
          console.log(this.sku)
        }
      })
    },
    onBuy () {
      this.show = true
    },
    onBuyClicked (data) {
      console.log(this.goods)
      console.log(data, 'lllll')
    },
    async onAddCartClicked (data) {
      var session = cookie.get('session_id')
      this.shopInfo.num = data.selectedNum
      let res = await this.$http(
        {
          method: 'post',
          url: 'http://hopehongyun.com:7001/black/saveCar',
          data: this.shopInfo,
          headers: {
            session_id: session
          }
        }
      )
      if (res.data.code === 0) {
        alert('添加成功，快去购物车查看吧')
      } else {
        alert(res.data.msg)
      }
    },
    selectShop (data) {
      this.shopInfo.shop_id = data.skuValue.id
      this.shopInfo.shop_style = data.skuValue.name
      this.shopInfo.img_url = data.skuValue.imgUrl
      this.shopInfo.price = data.selectedSkuComb.price
      this.shopInfo.detail_id = data.selectedSkuComb.id
      this.shopInfo.stock_num = data.selectedSkuComb.stock_num
      this.shopInfo.name = this.detailList.name
    },
    addShopCar () {
      this.show = true
    },
    goShopCar () {
      this.$router.push('/shopCar')
    }
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
  .detail_wrap  {
    .detail_swipe {
      width: 100%;
      height: 300px;
      position: relative;
      /deep/ .van-swipe {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .active_animation {
      position: absolute;
      bottom: 10px;
      margin-left: 50%;
      transform: translateX(-50%);
      width: 25%;
      background: #fff;
      height: 1px;
      border-radius: 0.5px;
      p{
        position: absolute;
        bottom:0;
        left: 0;
         background: #000;
      height: 1px;
      border-radius: 0.5px;
      }
    }
    }
    // .detail_sku {
    //   position: fixed;
    //   bottom: 0;
    //   left: 0;
    //   z-index: 1000;
    // }
  }

</style>
<style lang='less'>
.description {
      width: 100%;
      p {
        width: 100%;
         img {
          width: 100%!important;
        }
      }
    }
</style>
