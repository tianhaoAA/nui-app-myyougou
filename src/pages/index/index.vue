<template>
	<view class="content">
	
	{{name}}
		<view >
          <text v-for="(item,index) in list " :key="index">我是谁啊 {{item.name}}</text>  
		</view>
		<button @click="chang('123',$event)">点击修改msg</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				name:'张三',
				list:[{name:'张三'},{name:'李四'},]
			}
		},
		onLoad() {
			// 执行一次
          console.log('onLoad 首页刚刚加载 ');
		},
		onShow(){
		 console.log('onShow 页面显示了');
		},
		onReay(){
			// 执行一次
			 console.log('onShow 页面初次渲染了');
		},
		onHide(){
			console.log('onHide 页面隐藏了')
		},
		onUnload(){
			console.log('onUnload 页面卸载了')
		},
		methods: {
            chang(id,event){
				this.name='李四'
				console.log(id);
				console.log('事件对象E',event);
			}
		}
	}
</script>

<style>

</style>
