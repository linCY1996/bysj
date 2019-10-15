<template>
	<view class="content" :style="{height:height+'px'}">
		<view class="btn" @tap="toggleTab">
			<text>选择地区：</text>
			<text>{{resultInfo.result}}</text>
		</view>
		<w-picker
			mode="region"
			:defaultVal="['浙江省','杭州市','滨江区']" 
			@confirm="onConfirm" 
			ref="region" 
		></w-picker>
		<textarea value="" placeholder="添加详细地址" class="detail" />
		<view class="Btns">确定</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
			wPicker
		},
		data() {
			return{
				tabIndex:0,
				resultInfo:{
					result:"请选择地区"
				},
				height:''
			}
		},
		methods:{
			toggleTab(){
				this.$refs["region"].show();
			},
			onConfirm(val){
				console.log(val);
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
				this.resultInfo=val;
			}
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight
		}
	}
</script>

<style>
	.content {
		/* text-align: center; */
	}
	.tab{
		padding:20upx 0;
		font-size: 32upx;
	}
	.tab.active{
		color:#f00;
	}
	.result{
		margin-top: 200upx;
		font-size: 32upx;
	}
	.btn{
		width: 600rpx;
		height: 50rpx;
		border: 1rpx solid #B2B2B2;
		position: fixed;
		top: 250rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 26rpx;
		line-height: 50rpx;
	}
	
	.detail {
		position: fixed;
		top: 330rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 600rpx;
		height: 150rpx;
		border: 1rpx solid #DDDDDD;
		font-size: 26rpx;
	}
	
	.Btns {
		position: fixed;
		top: 800rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 500rpx;
		height: 65rpx;
		border-radius: 20rpx;
		border: 1rpx solid #16AB60;
		color: #16AB60;
		font-size: 34rpx;
		text-align: center;
		line-height: 65rpx;
	}
</style>
