<template>
  <div class="home_info" ref="home_info">
    <div class="home_info_scroll">
      <div v-if="!flag">
        <img :src="item.cover_img" alt="" class='shopList_con_img'>
        <ul class='shopList_info'>
          <li v-for="(itm,i) in item.products" :key="i" :class="'li'+i" @click="shopListDetail(itm.id)">
            <div class='shopList_info_img'>
              <img :src="itm.cover_img" alt="" >
            </div>
            <p class='shopList_info_name'>{{itm.name}}</p>
            <p class='shopList_info_selling_point'>{{itm.selling_point}}</p>
            <p class="shopList_info_price">￥{{itm.sell_price/100}}.00</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <img :src="imgUrl" alt="" class='shopList_con_img'>
        <ul class="home_info_list">
          <li v-for="(item, index) in homeAllInfoList" :key="index" @click='goShopAllLists(item.id)'>
            <img :src="item.image.url" alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
        <div  v-for="(item,index) in item" :key="index">
          <p>{{item.name}}</p>
          <p>{{item.sell_point}}</p>
          <ul class='shopList_info'>
          <li v-for="(itm,i) in item.products" :key='i' :class="'li'+i" @click="shopListDetail(itm.id)">
            <div class='shopList_info_img'>
              <img :src="itm.cover_img" alt="" >
            </div>
            <p class='shopList_info_name'>{{itm.name}}</p>
            <p class='shopList_info_selling_point'>{{itm.selling_point}}</p>
            <p class="shopList_info_price">￥{{itm.sell_price/100}}.00</p>
          </li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: {
    item: {
      type: null,
      default: () => {}
    },
    flag: {
      type: Boolean,
      default: null
    },
    imgUrl: {
      type: String,
      default: ''
    },
    homeAllInfoList: {
      type: Array,
      default: () => []
    },
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.home_info, {
        probeType: 3,
        click: true
      })
    })
  },
  methods: {
    shopListDetail (id) {
      this.$router.push('/detail?id=' + id)
    },
    goShopAllLists (id) {
      this.$router.push(`/shopLists?id=${this.id}&activeIndex=${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
  .home_info {
    height: calc(100% - 140px);
  }
  .shopList_con_img {
      width: 100%;
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
    .home_info_list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 20%;
        text-align: center;
        img {
          width: 100%;
        }
      }
    }
</style>
