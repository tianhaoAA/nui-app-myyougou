<template>
    <view class="search" :class={active:isfocus}>
      <!-- 搜索框 -->
      <view class="search-input">
        <input type="text" @focus="goSearch" placeholder="请输入搜索的商品" />
        <text class="cancel" @click="cancel">取消</text>
      </view>
      <!-- 搜索结果内容 -->
      <view class="search-content"> </view>
    </view>
</template>

<script>
export default {
       data(){
         return{
           isfocus:false
         }
       },
       methods:{
        //  输入框聚焦
         goSearch(){
           this.isfocus=true
           const res = uni.getSystemInfoSync(); //可使用窗口高度，单位px
           this.$emit('myPageHeight',res.windowHeight+'px')
         },
        //  点击取消
         cancel(){
         this.isfocus=false
            this.$emit('myPageHeight','auto')
         }
       }
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
     .cancel{
       display: none;
      width: 100rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      color: #333;

    }
   
  }
  &.active{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #ccc;
    .search-input{
      background-color:  #eeee; 
      display: flex;
      input{
        flex: 1;
      }
       .cancel{
      display: block;

    }
        
        }
        .search-content{
          position: absolute;
          top: 97rpx;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #ccc;
        }  
  }
}
</style>