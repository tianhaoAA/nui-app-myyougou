<template>
  <view class="list">
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <view class="goods">
      <view class="item" @click="goDetail(item.goods_id)" v-for="item in list" :key="item.goods_id">
        <!-- 商品图片 -->
        <image
          class="pic"
          :src="item.goods_small_logo"
        ></image>
        <!-- 商品信息 -->
        <view class="meta">
          <view class="name"
            >{{item.goods_name}}</view
          >
          <view class="price"> <text>￥</text>{{item.goods_price}}<text>.00</text> </view>
        </view>
      </view>
     <text
        class="nomore"
        v-if="nomore"
      >我也是有底线的</text>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      list:[]
    }
  },
   computed: {
    nomore() {
      return this.total === this.list.length
    }
  },
  onLoad(params) {
    this.query =params
    this.query.total=0
    this.query.pagenum=1
    this.query.pagesize=20
    this.getAndShowList(this.query)
  },
  //页面上拉触底事件的处理函数
  onReachBottom(){
    if(this.nomore)return
     this.query.pagenum++
     this.getAndShowList(this.query)
			console.log("用户把这个页面上拉50时触发我的")
		},
  methods: {
    // 获取列表的数据
  async  getAndShowList(data){
      let res=  await  this.request({
           url: '/api/public/v1/goods/search',
           data
         })
            !this.total && (this.total = res.data.total)
         if(res.msg.status===200){
              this.list.push(...res.data.goods)
         }
    },

    goDetail(id) {
      uni.navigateTo({
        url: "/pages/list/goods?id="+id,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  padding-top: 100rpx;
}
.filter {
  display: flex;
  height: 96rpx;
  line-height: 96rpx;
  border-bottom: 1rpx solid #ddd;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  background-color: #fff;

  text {
    flex: 1;
    text-align: center;
    font-size: 30rpx;
    color: #333;

    &.active {
      color: #ea4451;
    }
  }
}

.nomore {
  width: 100%;
  display: inline-block;
  text-align: center;
  margin: 20rpx 0;
  color: #888;
}
.item {
  display: flex;
  padding: 30rpx 20rpx 30rpx 0;
  margin-left: 20rpx;
  border-bottom: 1rpx solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .pic {
    width: 200rpx;
    height: 200rpx;
    margin-right: 30rpx;
  }

  .meta {
    flex: 1;
    font-size: 27rpx;
    color: #333;
    position: relative;
  }

  .name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    position: absolute;
    bottom: 0;

    color: #ea4451;
    font-size: 33rpx;

    text {
      font-size: 22rpx;
    }
  }
}
</style>
