<template>
  <div class='scroll-wrap' ref="scroll_wrap">
    <slot/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.scroll_wrap, {
        probeType: 3,
        click: true
      })
    })
  }
}
</script>

<style lang="less" scoped>
  .scroll-wrap {
    width: 100vw;
    height: 100vh;
  }
</style>
