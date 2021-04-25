<script>
	export default {
		// 执行一次
		onLaunch: function() {
			// console.log('App Launch 项目启动了')
		},
		onShow: function() {
			// console.log('App Show 项目显示了')
		},
		onHide: function() {
			// console.log('App Hide 项目隐藏了')
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	@import "./fonts";
image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

input {
  display: block;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

.tips {
  text-align: center;
  margin-top: 200rpx;
  font-size: 36rpx;
  color: #666;
}
</style>
