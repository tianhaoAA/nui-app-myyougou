<template>
  <view class="index">
    <!-- search 搜索 -->
    <view class="search">
      <!-- 搜索框 -->
      <view class="search-input">
        <input type="text" placeholder="请输入搜索的商品" />
      </view>
      <!-- 搜索结果内容 -->
      <view class="search-content"> </view>
    </view>
    <!-- 轮播图 -->
    <view class="swiper-box">
      <swiper class="swiper" indicator-dots autoplay>
        <swiper-item v-for='item in SwiperList' :key='item.goods_id'>
          <navigator url="item.navigator_url">
            <image :src="item.image_src"  />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 四个楼层 -->
    <view class="navs">
      <navigator>
        <image src="../../static/uploads/icon_index_nav_4@2x.png" mode="" />
        <!-- <text></text> -->
      </navigator>
      <navigator>
        <image src="../../static/uploads/icon_index_nav_3@2x.png" mode="" />
        <!-- <text></text> -->
      </navigator>
      <navigator>
        <image src="../../static/uploads/icon_index_nav_2@2x.png" mode="" />
        <!-- <text></text> -->
      </navigator>
      <navigator>
        <image src="../../static/uploads/icon_index_nav_1@2x.png" mode="" />
        <!-- <text></text> -->
      </navigator>
    </view>

    <!-- 时尚女装 -->
    <view class="box">
      <view class="floor">
        <!-- 标题 -->
        <view class="floor_title">
            <image src="../../static/uploads/pic_floor01_title.png" mode="" />
        </view>
        <view class="item">
            <navigator>
            <image src="../../static/uploads/pic_floor01_1@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor01_2@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor01_3@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor01_4@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor01_5@2x.png" alt="">
            </navigator>
        </view>
      </view>
          <view class="floor">
        <!-- 标题 -->
        <view class="floor_title">
            <image src="../../static/uploads/pic_floor02_title.png" mode="" />
        </view>
        <view class="item">
            <navigator>
            <image src="../../static/uploads/pic_floor02_1@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor02_2@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor02_3@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor02_4@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor02_5@2x.png" alt="">
            </navigator>
        </view>
      </view>
          <view class="floor">
        <!-- 标题 -->
        <view class="floor_title">
            <image src="../../static/uploads/pic_floor03_title.png" mode="" />
        </view>
        <view class="item">
            <navigator>
            <image src="../../static/uploads/pic_floor03_1@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor03_2@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor03_3@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor03_4@2x.png" alt="">
            </navigator>
             <navigator>
            <image src="../../static/uploads/pic_floor03_5@2x.png" alt="">
            </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      SwiperList:[], //轮播图的数据
    };
  },
  onLoad() {
    this.getAndShowSwiperList()
  },

  methods: {
    // 获取轮播图的数据
  async  getAndShowSwiperList(){
       const res = await this.request({
        url: "/api/public/v1/home/swiperdata"
      })
      console.log('轮播图的数据',res);
      if (res.msg.status===200) {
        this.SwiperList =res.data
      }
    }
  },
};
</script>

<style lang='less' scoped>
.search {
  .search-input {
    padding: 18rpx;
    background-color: #ea4451;
    input {
      height: 60rpx;
      padding-left: 15rpx;
      background-color: #fff;
      font-size: 26rpx;
      color: #999;
    }
  }
}
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
</style>
