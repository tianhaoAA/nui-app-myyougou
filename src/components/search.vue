<template>
  <!-- 搜索 -->
  <div class="search" :class="{active: isfocus}">
    <!-- 搜索框 -->
    <div class="input-wrap" @click="goSearch">
      <input type="text" @confirm='goResult' v-model="keyWord" @input="querySearch" placeholder="请输入搜索商品">
      <span class="cancle" @click.stop="goCancel">取消</span>
    </div>
    <!-- 搜索结果 -->
    <div class="search-content">
      <div class="title">搜索历史<span class="clear" @click="clearHistory"></span></div>
      <div class="history"       v-if="resultList.length===0">
        <navigator url="/pages/list/index" v-for="(item,index) in isHistoryList" :key="index">{{item}}</navigator>
      </div>
      <!-- 结果 -->
      <scroll-view scroll-y class="result" v-else>
        <navigator url="/pages/goods/index" v-for="item  in resultList" :key="item.goods_id">{{item.goods_name}}</navigator>
       
      </scroll-view>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return { 
        isfocus: false, //输入框是否聚焦
        placeholder: null,
        keyWord:null, //查询的值
        historyList: uni.getStorageSync('historyList')|| [], //存储本地历史记录
        resultList:[] //搜索的结果
      }
    },
    computed:{
      isHistoryList(){
        return this.historyList&&this.historyList
      }
    },
    methods: {
      // 清除历史搜索的记录
      clearHistory(){
        this.historyList=[]
       uni.removeStorageSync('historyList')
      },
      // 去列表页面
      goResult(){
           this.historyList.push(this.keyWord)
           this.historyList =[...new Set(this.historyList)]
            console.log('搜索的历史',this.historyList);
            uni.setStorageSync('historyList',this.historyList)
            uni.navigateTo({
              url:'/pages/list/index?query='+this.keyWord
            })
      },
      // 查询
       querySearch(){
         // 获取搜索建议商品=》函数防抖处理
        this.timer&&clearTimeout(this.timer)
         this.timer = setTimeout(async ()=>{
          console.log('查询的值',this.keyWord);    
         const {msg,data} = await this.request({
           url:'/api/public/v1/goods/qsearch',
          data:{
              query:this.keyWord
         },
         }) 
         this.resultList =data
         console.log(msg,data);
         },1000)
        
      },
      goSearch (ev) {
        // 获取焦点 isfocus true 加上 active
        this.isfocus=true;
        // 获取屏幕高度 微信提供了
        // wx. ---》换成 uni. 就行
        let res= uni.getSystemInfoSync()
        // console.log('结果',res)
        this.$emit("myPageHeight",res.windowHeight+'px')

        // 隐藏tabBar
        uni.hideTabBar();
      },
      goCancel () {
        // 取消 isfocus false 加上 active
        this.isfocus=false;
        this.resultList=[]
        this.keyWord =''
        // 触发父组件自定义事件
        this.$emit('myPageHeight', 'auto');
        // 显示tabBar
        uni.showTabBar();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    display: flex;
    flex-direction: column;
    
    // 搜索框
    .input-wrap {
      display: flex;
      height: 100rpx;
      padding: 20rpx 30rpx;
      background-color: #ea4451;
      box-sizing: border-box;
      position: relative;

      // &::before,
      // &::after {
      //   height: 44rpx;
      //   line-height: 1;
      //   background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
      //   background-size: 32rpx;
      //   background-position: 6rpx center;
      //   background-repeat: no-repeat;

      //   position: absolute;
      //   top: 28rpx;
      //   z-index: 9;
      // }

      // &::before {
      //   content: '搜索';
      //   display: block;

      //   width: 100rpx;
      //   padding: 11rpx 0 10rpx 44rpx;
      //   box-sizing: border-box;
      //   color: #666;
      //   font-size: 24rpx;
      //   left: 325rpx;
      // }

      // &::after {
      //   display: none;
      //   content: '';
      //   width: 44rpx;
      //   left: 40rpx;
      // }

      input {
        flex: 1;
        height: 60rpx;
        padding: 0 20rpx 0 64rpx;
        background-color: #fff;
        border-radius: 8rpx;
        font-size: 24rpx;
        color: #666;
      }

      span.cancle {
        display: none;
        width: 80rpx;
        text-align: right;
        line-height: 60rpx;
        font-size: 27rpx;
        color: #666;
      }
    }

    // 搜索结果
    .search-content {
      display: none;
      flex: 1;
      padding: 27rpx;
      background-color: #fff;
      position: relative;

      .title {
        font-size: 27rpx;
        line-height: 1;
        color: #333;
      }

      .clear {
        display: block;
        width: 27rpx;
        height: 27rpx;
        float: right;
        background-image: url(http://static.botue.com/ugo/images/clear.png);
        background-size: cover;
      }

      .history {
        padding-top: 30rpx;

        navigator {
          display: inline-block;
          line-height: 1;
          padding: 15rpx 20rpx 12rpx;
          background-color: #ddd;
          font-size: 24rpx;
          margin-right: 20rpx;
          margin-bottom: 15rpx;
          color: #333;
        }
      }

      .result {
        // display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;

        navigator {
          line-height: 1;
          padding: 20rpx 30rpx;
          font-size: 24rpx;
          color: #666;
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    
    // 获得焦点状态
    &.active {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;

      .input-wrap {
        background-color: #eee;

       
      }

      span.cancle {
        display: block;
      }

      .search-content {
        display: block;
      }
    }
  }
</style>