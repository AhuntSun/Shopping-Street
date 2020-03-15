<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 最好在插槽外面包一层div，在div上加属性，防止替换插槽时把加在插槽上的属性都覆盖了 -->
    <div v-if="!isActive" ><slot name="item-icon"></slot></div>
    <div v-else><slot  name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  // props属性可以实现数据的父传子
  props: {
    path: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },
  data(){
    return {
      // isActive: true
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods: {
    itemClick(){
      // console.log('itemClick')
      // $router的push方法允许用户进行返回，replace方法则不允许返回
      // 加个判断条件可以解决双击报错的问题
      if (this.$route.path !== this.path) {
        this.$router.replace(this.path);
      }
      
    }
  },
}
</script>

<style>
  .tab-bar-item{
   flex: 1;
   text-align: center;
   height: 49px;
   font-size: 14px
 }
 
 .tab-bar-item img{
   width: 24px;
   height: 24px;
   margin-top: 3px;
   vertical-align: middle;
   margin-bottom: 2px;
 }

/* 由于无法直接把props中的数据拿过来所以div绑定active类变得毫无意义 */
 /* .active{
   color: red
 } */
</style>