<template>
  <view class="wrapper">
    <!-- 商品图片 -->
    <swiper
      class="pics"
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.6)"
      indicator-active-color="#fff"
    >
      <swiper-item v-for="item in goods.pics" :key="item.pics_id">
        <image :src="item.pics_big_url"></image>
      </swiper-item>
    
    
    
    </swiper>
    <!-- 基本信息 -->
    <view class="meta">
      <view class="price">￥{{goods.goods_price}}</view>
      <view class="name">{{goods.goods_name}}</view>
      <view class="shipment">快递: 免运费</view>
      <text class="collect icon-star">收藏</text>
    </view>
    <!-- 商品详情 -->
    <view class="detail">
      <rich-text :nodes="goods.goods_introduce"></rich-text>
    </view>
    <!-- 操作 -->
    <view class="action">
      <button open-type="contact" class="icon-handset">联系客服</button>
      <text class="cart icon-cart" @click="goCart">购物车</text>
      <text class="add" @click="addCart">加入购物车</text>
      <text class="buy" @click="createOrder">立即购买</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods: [], //商品的详情
      carts: uni.getStorageSync('carts') ||[] //加入购物车的商品
     };
  },
  onLoad(params) {
    console.log(params);
    this.getAndShowGoodsDetail(params.id);
  },
  methods: {
    // 加入购物车
    addCart(){
      /***
       * goods_id 商品id
       * goods_price 商品价格
       * goods_name 商品名字
       * goods_small_logo 商品的图片
       * goods_number 商品的数量
       * goods_checked 购物车是否是勾选的状态
        * **/ 
     let { goods_id,goods_price,goods_name,goods_small_logo  } =this.goods
  
      let index = this.carts.findIndex((item)=>item.goods_id===this.goods.goods_id)
      console.log(index);
    
     if(index===-1){
      this.carts.push({
          goods_id,
          goods_price,
          goods_name,
          goods_small_logo,
          goods_number:1,
          goods_checked:true
      })
     }else{
       this.carts[index].goods_number+=1
     }
       uni.showToast({
          title: '加入购物车成功',
          icon: 'none',
          duration: 2000
        });
      uni.setStorageSync('carts',  this.carts)
    },
    // 获取商品详情的数据
    async getAndShowGoodsDetail(goods_id) {
      const { msg, data } = await this.request({
        url: "/api/public/v1/goods/detail",
        data: { goods_id },
      });
      if(msg.status===200){
        this.goods =data
      }
      console.log(msg, data);
    },
    goCart() {
      uni.switchTab({
        url: "/pages/cart/index",
      });
    },
    createOrder() {
      uni.navigateTo({
        url: "/pages/order/index",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 100rpx;
  background-color: #f4f4f4;
}

.pics {
  height: 640rpx;
}

.meta {
  height: 250rpx;
  line-height: 1;
  padding: 30rpx 180rpx 30rpx 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .price {
    font-size: 36rpx;
    color: #ea4451;
    margin-bottom: 20rpx;
  }

  .name {
    color: #333;
    line-height: 1.4;
    font-size: 33rpx;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .shipment {
    font-size: 27rpx;
    color: #999;
    position: absolute;
    bottom: 30rpx;
  }

  .collect {
    width: 140rpx;
    height: 88rpx;
    text-align: center;
    box-sizing: border-box;
    border-left: 1rpx solid #ddd;
    font-size: 24rpx;
    color: #999;

    position: absolute;
    right: 10rpx;
    top: 91rpx;
  }

  [class*="icon-"]::before {
    display: block;
    font-size: 45rpx;
    margin-bottom: 10rpx;
  }
}

.detail image {
  width: 100%;
  height: 480rpx;
  margin-top: 20rpx;
}

.action {
  width: 100%;
  height: 98rpx;
  background-color: #fff;

  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;

  text {
    display: block;
  }

  .add,
  .buy {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210rpx;
    text-align: center;
    font-size: 27rpx;
    color: #fff;
  }

  .add {
    background-color: #f4b73f;
  }

  .buy {
    background-color: #ea4451;
  }

  button {
    padding: 0;
    border-radius: 0;
    background-color: #fff;

    &::after {
      border: none;
    }
  }

  button,
  .cart {
    flex: 1;
    text-align: center;
    color: #989898;
    font-size: 24rpx;
    box-sizing: border-box;
  }

  [class*="icon"]::before {
    display: block;
    font-size: 45rpx;
    margin-bottom: 2rpx;
  }
}
</style>
