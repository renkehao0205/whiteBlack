<template>
  <div class='wrap' ref="wrap">
    <ul ref="scroll" :style="{'width':list.length* 60+'px'}">
      <li v-for="(item,index) in list" :key="index" @click="select(index)" :ref="'tabs'+ index" >
        {{item.name}}
      </li>
      <div class="van-tabs__line" :style="{'transform':`translateX(${60*current}px)`}">

      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      scrollLeft:0,
      list: [
        {
          name: '楼层1'
        },
         {
          name: '楼层2'
        },
         {
          name: '楼层3'
        },
         {
          name: '楼层4'
        },
         {
          name: '楼层5'
        },
         {
          name: '楼层6'
        },
         {
          name: '楼层7'
        },
         {
          name: '楼层8'
        },
         {
          name: '楼层9'
        },
         {
          name: '楼层10'
        },
         {
          name: '楼层11'
        },
         {
          name: '楼层12'
        }
      ]
    }
  },
  methods: {
    select(index) {
        this.current = index
      let tab = 'tabs' + index
      let wrap_w = this.$refs.wrap.offsetWidth
      let li_w = this.$refs[tab][0].offsetWidth
      let scroll_w = this.$refs.scroll.offsetWidth
      console.log(wrap_w, li_w, scroll_w)
      var dis=(wrap_w-li_w)/3;
      var iMax=scroll_w-wrap_w
      var iMove=index*li_w;
      if(scroll_w > wrap_w) {
      this.$refs.scroll.style.left=-iMove+dis +'px'

      }
        console.log(-iMove+dis,'-iMove+dis')
				var str=parseInt(this.$refs.scroll.style.left);//保留整数
				if(str>=(dis-li_w)){//检测离左边距离是否大于等于一个dis减去一个li的宽度，临界值
					this.$refs.scroll.style.left=0;
				}
				if(-str>=iMax){
					this.$refs.scroll.style.left=-iMax +'px'
				}
      
    }
  }
}
</script>

<style lang='less' scoped>
  .wrap {
    width: 100vw;
    overflow-x: scroll;
    ul{
      display: flex;
      overflow-x: scroll;
      position: relative;
      transition:all 0.2s;
      ::-webkit-scrollbar {
        display: none;
      }
      li {
        width: 60px;
        flex-shrink: 0;
        text-align: center;
        padding: 10px 0;
      }
    }
  }
  .van-tabs__line {
    position: absolute;
    bottom: 0px;
    left: 0;
    z-index: 1;
    height: 3px;
    background-color: #ee0a24;
    border-radius: 3px;
    width: 60px;
    transition: all 600ms;
}

</style>
