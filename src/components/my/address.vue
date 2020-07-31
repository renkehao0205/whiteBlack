<template>
  <div class="address">
    <scroll>
      <ul>
        <li v-for="(item, index) in addressList" :key="index">
          <h5>
            <span>收货人：{{item.userName}}</span>
            <span>{{item.phone}}</span>
          </h5>
          <p class='receiving_address'>收货地址：{{item.city.split(',').join('')}} {{item.address}}</p>
          <div class="address-con">
            <div class="del">
              <div class='default_address'>
                <van-radio-group v-if="item.default_address">
                  <van-radio  checked-color="#07c160">默认地址</van-radio>
                </van-radio-group>
              </div>
              <p>
                <span @click="edit(item.address_id)">编辑</span>
                <span @click='del(item.address_id)'>删除</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <div class="add_address" @click="addAddress">
      新增地址
    </div>
  </div>
</template>
<script>
import scroll from '@/components/scroll.vue'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      addressList: []
    }
  },
  components: {
    scroll
  },
  mounted () {
    this.getAddressList()
  },
  methods: {
    async getAddressList () {
      let res = await this.$http({method: 'get', url: 'http://hopehongyun.com:7001/black/getAddressList', headers: {session_id: cookie.get('session_id')}})
      if (res.data.code === 0) {
        this.addressList = res.data.data
      }
    },
    edit (id) {
      this.$router.push('/addEditAddress?type=edit&id=' + id)
    },
    async del (id) {
      let res = await this.$http({method: 'get', url: `http://hopehongyun.com:7001/black/remAddress?address_id=${id}`, headers: {session_id: cookie.get('session_id')}})
      if (res.data.code === 0) {
        window.location.reload()
      }
    },
    addAddress () {
      this.$router.push('/addEditAddress?type=add')
    }
  }
}
</script>
<style lang="less" scoped>
.address {
  ul {
    padding: 0 10px;
    li {
      padding: 15px 0px;
      border-bottom: 5px solid #f9f9f9;
      h5 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .receiving_address {
        margin-bottom: 10px;
      }
    }
  }
}
  .del {
    display: flex;
    justify-content: space-between;
  }
  .add_address {
    position: fixed;
    bottom: 20px;
    left: 10px;
    width: 40%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px dashed #ccc;
  }
</style>
