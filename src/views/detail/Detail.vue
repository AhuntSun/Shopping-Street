<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <!-- 属性：topImages  传入值：top-images -->
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'



export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopsY: [],
      currentIndex: 0,
    }
  },
  created () {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取数据
      const data = res.result
      // console.log(data);
      

      //2.获取顶部的轮播数据
      this.topImages = data.itemInfo.topImages

      //3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //4.创建商品信息的对象
      this.shop = new Shop(data.shopInfo) 

      //5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //6.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
        //1.第一次获取，值不对
        //值不对的原因：this.$refs.params.$el还没有渲染
        /*
        this.themeTopsY = []
        this.themeTopsY.push(0);
        this.themeTopsY.push(this.$refs.param.$el.offsetTop);
        this.themeTopsY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopsY.push(this.$refs.recommend.$el.offsetTop);
        */

       //2.第二次获取：值不对
      //原因：图片没有计算在内
      //根据最新的数据，对应的DOM是已经渲染出来
      //但是图片依然是没有加载完(目前获得的offsetTop依然是不包含图片的)
      //一般offsetTop值不对的时候，都是因为图片的问题
      //该函数为：等上面的DOM元素渲染完成后再回调传入的参数
      /*
      this.$nextTick( () => {
        this.themeTopsY = []
        this.themeTopsY.push(0);
        this.themeTopsY.push(this.$refs.param.$el.offsetTop);
        this.themeTopsY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopsY.push(this.$refs.recommend.$el.offsetTop);
  
        console.log(this.themeTopsY);
      })*/
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      // 3.第三次获取：在图片加载完成后，再获取，值正确
      this.getThemeTopY()
    },
    titleClick(index){
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopsY[index], 300)
    },
    getThemeTopY(){
      this.themeTopsY = []
      this.themeTopsY.push(0);
      this.themeTopsY.push(this.$refs.param.$el.offsetTop);
      this.themeTopsY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopsY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopsY.push(Number.MAX_VALUE);
      // console.log(this.themeTopsY);
    },
    contentScroll(position){  
      //1.获取y值
      const positionY = -position.y

      //2.positionY和主题中的值进行对比
      let length = this.themeTopsY.length
      for (let i = 0; i < length-1; i++ ) {
        
        /*法一：
        if (this.currentIndex !== i && ((i < length - 1) && positionY >= this.themeTopsY[i] && positionY < this.themeTopsY[i+1] || (i === length - 1 && positionY >= this.themeTopsY[i] ))){
         this.currentIndex = i;
         this.$refs.nav.currentIndex = this.currentIndex
        }
        */
       //法二：
       if (this.currentIndex !== i && (positionY >= this.themeTopsY[i] && positionY < this.themeTopsY[i+1])) {
         this.currentIndex = i;
         this.$refs.nav.currentIndex = this.currentIndex
       }
      }

      //3.是否显示回到顶部
      this.isShowBackTop = -position.y > 1000
    },
    addToCart(){
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      
      //2.将商品添加到购物车中
      // 使用mapAction将Action中的方法映射到该组件中
      this.addCart(product).then(res => {
        this.$toast.show(res, 1500)
        console.log(this.$toast);
        
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content{
  height: calc(100% - 44px - 49px);
}

.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>