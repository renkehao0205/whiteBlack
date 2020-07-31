<template>
  <div class='shopcar_wrap'>
    <div class="shop_list">
      <scroll>
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        @change="checkss"
      >
        <div
          class="shop_list-con"
          v-for="(item, i) in shopcarList"
          :key="i"
        >
          <van-checkbox ref="checks" :name="i" @click="checks">
          </van-checkbox>
          <img
            :src="item.img_url"
            alt=""
            class='shop_list_img'
            @click="goDetail(item.detail_id)"
          >
          <div class="shop_con_info">
            <p class="shop_title">{{item.name}}</p>
            <p class="shop_style">{{item.shop_style}}</p>
            <div class="shop_computed">
              <span class='shop_price'>{{item.price/100+'.00'}}</span>
              <p class="shop_add_reduce">
                <span
                  class="shop_reduce"
                  @click="reduce(item.shop_id, item.stock_num, item.num)"
                >－</span>
                <span
                  class="shop_num"
                  :style="{'color': item.num > item.stock_num? 'red':''}"
                >{{item.num}}</span>
                <span
                  class='shop_add'
                  @click="add(item.shop_id, item.stock_num, item.num)"
                >＋</span>
              </p>
            </div>
          </div>
        </div>
      </van-checkbox-group>
      </scroll>
      <van-submit-bar
        :price="allPrice"
        button-text="提交订单"
        @submit="onSubmit"
        :disabled="submitFlag"
        class="shopcar_submit"
      >
        <van-checkbox v-model="checked" @click="checkedAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import cookie from 'js-cookie'
import scroll from '@/components/scroll.vue'
export default {
  name: 'shopCar',
  data () {
    return {
      shopcarList: [],
      result: [],
      total: 0,
      checked: false,
      allPrice: 0,
      submitFlag: true,
      timer: null
    }
  },
  components: {
    scroll
  },
  created () {
    this.getShopcarList()
  },
  methods: {
    async getShopcarList () {
      let session = cookie.get('session_id')
      let res = await this.$http({
        method: 'get',
        url: 'http://hopehongyun.com:7001/black/getshopcarlist',
        headers: { session_id: session }
      })
      if (res.data.code === 0) {
        this.shopcarList = res.data.data
        this.total = res.data.all_list_total
      }
    },
    reduce (shopId, stockNum, num) {
      num--
      if (num < 0) {
        return
      }
      this.throttle(this.getAddreduceshopcar, shopId, stockNum, num)
    },
    add (shopId, stockNum, num) {
      num++
      if (num > stockNum) {
        alert('超出库存')
        return
      }
      this.throttle(this.getAddreduceshopcar, shopId, stockNum, num)
      // throttle(this.getAddreduceshopcar, shopId, stockNum, num)
    },
    throttle (fn, ...reset) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        fn(...reset)
      }, 500)
    },
    async getAddreduceshopcar (shopId, stockNum, num) {
      let session = cookie.get('session_id')
      let res = await this.$http({
        method: 'post',
        url: 'http://hopehongyun.com:7001/black/addreduceshopcar',
        data: { shop_id: shopId, stock_num: stockNum, num },
        headers: { session_id: session }
      })
      if (res.data.code === 0) {
        this.getShopcarList()
      } else {
        alert(res.data.msg)
      }
    },
    checkedAll  () {
      this.checked = !this.checked
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true)
      } else {
        this.$refs.checkboxGroup.toggleAll()
      }
    },
    checkss (arr) {
      if (this.result.length === this.total) {
        this.checked = true
      } else {
        this.checked = false
      }
      let totalPrice = 0
      arr.forEach(item => {
        totalPrice += this.shopcarList[item].num * Number(this.shopcarList[item].price)
      })
      this.allPrice = totalPrice
    },
    checks (a) {
      // console.log(a)
    },
    onSubmit () {
      this.$http.get('http://hopehongyun.com:7001/black/getStr').then(res => {
        var div = document.createElement('div')
        div.innerHTML = res.data.data
        document.body.appendChild(div)
        document.forms[0].submit()
      })
    },
    goDetail (id) {
      this.$router.push('/detail?id=' + id)
    }
  },
  watch: {
    shopcarList: {
      deep: true,
      handler (news) {
        let totalPrice = 0
        if (this.checked) {
          this.shopcarList.forEach(item => {
            totalPrice += Number(item.price) * item.num
          })
          this.allPrice = totalPrice
        } else {
          // this.allPrice = 0
          this.result.forEach(item => {
            totalPrice += this.shopcarList[item].num * Number(this.shopcarList[item].price)
          })
          this.allPrice = totalPrice
        }
      }
    },
    result: {
      deep: true,
      handler (news) {
        this.submitFlag = !(news.length)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.scroll-wrap {
  height: calc(100vh - 90px)!important;
}
.shopcar_wrap {
  width: 100%;
  height: 100%;
}
.shopcar_submit {
  bottom: 50px;
}
.shop_list {
  // padding: 0px 10px;
  /deep/ .van-checkbox-group {
     padding: 0px 10px;
     padding-bottom: 50px;
  }
  /deep/ .van-submit-bar__bar{
    padding: 0 10px;
  }
  .shop_list_img {
    width: 80px;
    height: 80px;
    margin-left: 10px;
  }
  .shop_list-con {
    display: flex;
    padding: 20px 0px;
    .shop_con_info {
      flex: 1;
      margin-left: 20px;
      .shop_title {
        font-size: 16px;
        width: 100%;
        // white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 5px;
      }
      .shop_style {
        color: #999;
        margin-bottom: 5px;
      }
      .shop_computed {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .shop_price {
          font-size: 16px;
          color: red;
        }
        .shop_add_reduce {
          border: 1px solid #999;
          padding: 5px 8px;
          .shop_add,
          .shop_reduce {
            color: #999;
            font-size: 16px;
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
