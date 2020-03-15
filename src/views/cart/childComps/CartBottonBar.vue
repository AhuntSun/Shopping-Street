<template>
  <div class="bottom-bar">
      <check-button 
              :is-checked="isSelectAll" 
              class="select-all"
              @click.native="checkClick">
      </check-button>
      <span>全选</span>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
      <span class="buy-product" @click="calcClick"  >去结算({{checkLenght}})</span>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: "CartButtonBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
        }).reduce((previous, item) => {
        return item.price * item.count
      }, 0).toFixed(2)
    },
    checkLenght(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll: function () {
      return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
    }
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){//全部选中
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        });
      }else {//部分或全部不选中
        this.$store.state.cartList.forEach(item => {
          item.checked = true
        });
      }      
    },
    calcClick(){
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-bar .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-bar .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>