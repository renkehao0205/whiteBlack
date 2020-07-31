<template>
  <van-address-edit
  :area-list="areaList"
  show-set-default
  :address-info='address_info'
  show-search-result
  :search-result="searchResult"
  @save="onSave"
  @change-detail="onChangeDetail"
/>
</template>
<script>
import areaList from '@/assets/area.js'
import cookie from 'js-cookie'
export default {
  data () {
    return {
      areaList,
      address_info: {
        province: '北京市',
        city: '北京市',
        county: '东城区'
      },
      searchResult: []
    }
  },
  mounted () {
    let query = this.$route.query
    console.log(this.$route.query)
    if (query.type === 'edit') {
      this.getoneAddressList(query.id)
    } else {

    }
  },
  methods: {
    onSave (content) {
      let query = this.$route.query
      let obj = {
        userName: content.name,
        phone: content.tel,
        city: content.province + ',' + content.city + ',' + content.county,
        address: content.addressDetail,
        areaCode: content.areaCode,
        default_address: content.isDefault ? 1 : 0

      }
      if (query.type === 'edit') {
        this.$http({ method: 'post', url: 'http://hopehongyun.com:7001/black/editAddress', headers: {session_id: cookie.get('session_id')}, data: {...obj, address_id: query.id} }).then(res => {
          if (res.data.code === 0) {
            this.$router.push('/address')
          }
        })
      } else {
        this.$http({method: 'post', url: 'http://hopehongyun.com:7001/black/addAddress', data: obj, headers: {session_id: cookie.get('session_id')}}).then(res => {
          if (res.data.code === 0) {
            this.$router.push('/address')
          }
        })
      }
    },
    onChangeDetail () {
    },
    async getoneAddressList (id) {
      let res = await this.$http({method: 'get', url: `http://hopehongyun.com:7001/black/getAddressList?address_id=${id}`, headers: {session_id: cookie.get('session_id')}})
      if (res.data.code === 0) {
        let data = res.data.data[0]
        this.address_info = {
          name: data.userName,
          tel: data.phone,
          province: data.city.split(',')[0],
          areaCode: data.areaCode,
          city: data.city.split(',')[1],
          county: data.city.split(',')[2],
          addressDetail: data.address,
          isDefault: data.default_address === 1
        }
        console.log(this.address_info)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
