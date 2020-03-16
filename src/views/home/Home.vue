<template>
  <div id="home"> 
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick" 
                 ref="tabControl1" 
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners = "banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends = "recommends" />
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" 
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {
  getHomeMultidata,
  getHomeGoods
} from "network/home"
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'


export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  // 使用混入，使多个组件间可以复用代码
  mixins: [itemListenerMixin, backTopMixin],
  data(){
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop' : {page: 0, list: []},
        'new' : {page: 0, list: []},
        'sell' : {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    //1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',  this.itemImageListener)
  },
  created(){
    // 只在created中写主要逻辑，具体实现抽出来
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {

  },
  methods: {
    /**
     * 事件监听相关方法
     */    
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000      

      //2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        // 使用变量存储请求到的数据,不然请求回来的res变量会再函数执行完后被回收
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },

    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // 使用扩展运算符，将取到的数组存储s起来
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //完成了上拉加载更多
        this.$refs.scroll.finishPullUp()
    })
    }
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* 这些属性在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

.tab-control{
  position: relative;
  z-index: 9;
}

</style>