<template>
  <view class="index" :style="{overflow:'hidden',height:pageHeight}">
    <!-- search 搜索 -->
    <search @myPageHeight='indexGetHeight'></search>
    <!-- 轮播图 -->
    <view class="swiper-box">
      <swiper class="swiper" indicator-dots autoplay>
        <swiper-item v-for='item in SwiperList' :key='item.goods_id'>
          <navigator :url="'/pages/list/goods?id='+item.goods_id">
            <image :src="item.image_src"  />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 四个楼层 -->
    <view class="navs">
      <!-- 跳转到 switchTab  -->
      <navigator url="/pages/category/index" open-type="switchTab" v-for="(item,index) in navsList" :key="index">
        <image :src="item.image_src" />
      </navigator>
    </view>
    <!-- 时尚女装 -->
    <view class="box">
      <view class="floor" v-for="item in floorsList" :key="item.name">
        <!-- 标题 -->
        <view class="floor_title">
            <image :src="item.floor_title.image_src" />
        </view>
        <view class="item">
            <navigator  v-for="sub in item.product_list" :key="sub.name">
            <image :src="sub.image_src" alt="">
            </navigator>
        </view>
      </view>
    </view>
    <view
    @click="goTop"
    v-if="isGoTop"
    class="goTop icon-top">
    </view>
  </view>
</template>

<script>
import search from "@/components/search.vue";
export default {
  data() {
    return {
      pageHeight: "auto", //默认页面可以正常滚动
      SwiperList: [], //轮播图的数据
      navsList: [], //导航栏数据
      floorsList: [], //楼层的数据
      scrollTop:0 //页面滚动
    };
  },
  components: {
    search,
  },
  // 开启下拉刷新事件
  onPullDownRefresh() {
   Promise.all([ this.getAndShowSwiperList(),  this.getAndShowNavsList(),this.getAndShowFloorsList()]).then(()=>{
       uni.stopPullDownRefresh();
         console.log('请求执行完毕了');
   })
  },

  computed:{
    isGoTop(){
       return this.scrollTop>10
    }
  },
  onLoad() {
    console.log( this.scrollTop);
    this.getAndShowSwiperList();
    this.getAndShowNavsList();
    this.getAndShowFloorsList();
  },

  methods: {
    // 点击回到顶部
    goTop(){
      uni.pageScrollTo({
        scrollTop: 0
      });
    },
    //监听页面滚动事件
       onPageScroll(obj){
           console.log(obj);
       this.scrollTop =obj.scrollTop
       },
    // 搜索时 页面禁止滚动
    indexGetHeight(height) {
      this.pageHeight = height;
    },

    // 获取轮播图的数据
    async getAndShowSwiperList() {
      const res = await this.request({
        url: "/api/public/v1/home/swiperdata",
      });
      console.log("轮播图的数据", res);
      if (res.msg.status === 200) {
        this.SwiperList = res.data;
      }
    },
    // 获取导航栏的数据
    async getAndShowNavsList() {
      const res = await this.request({
        url: "/api/public/v1/home/catitems",
      });
      console.log("导航栏的数据", res);
      if (res.msg.status === 200) {
        this.navsList = res.data;
      }
    },
    // 获取楼层的数据
    async getAndShowFloorsList() {
      const res = await this.request({
        url: "/api/public/v1/home/floordata",
      });
      console.log("楼层的数据", res);
      if (res.msg.status === 200) {
        this.floorsList = res.data;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.swiper-box {
  .swiper {
    height: 340rpx;
    navigator {
      width: 750rpx;
      height: 340rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.navs {
  padding: 30rpx 0;
  display: flex;
  navigator {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 128rpx;
      height: 140rpx;
    }
  }
}
.box {
  .floor {
    .floor_title {
      background-color: #f4f4f4;
      padding-top: 30rpx;
      image {
        width: 750rpx;
        height: 60rpx;
      }
    }
    .item {
      overflow: hidden;
      padding: 20rpx 15rpx;
      navigator {
        float: left;
        width: 193rpx;
        height: 188rpx;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      navigator:nth-child(1) {
        width: 233rpx;
        margin-left: 0;
        height: 386rpx;
      }
      navigator:nth-child(2),
      navigator:nth-child(5) {
        width: 273rpx;
      }
    }
  }
  .floor:nth-child(1) {
    .item {
      navigator {
        width: 233rpx;
      }
    }
  }
}
.goTop {
    position: fixed;
    bottom: 30rpx;
    /* #ifdef H5 */
    bottom: 65px;
    /* #endif */
    right: 30rpx;
  
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>
