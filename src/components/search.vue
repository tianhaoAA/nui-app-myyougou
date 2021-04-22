<template>
    <view class="search">
      <!-- 搜索框 -->
      <view class="search-input">
        <input type="text" placeholder="请输入搜索的商品" />
      </view>
      <!-- 搜索结果内容 -->
      <view class="search-content"> </view>
    </view>
</template>

<script>
export default {

}
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
</style>