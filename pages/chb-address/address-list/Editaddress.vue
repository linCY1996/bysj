<template>
	<view class="content" :style="{height:height+'px'}">
		<view class="btn" @tap="toggleTab">
			<text>选择地区：</text>
			<text>{{address}}</text>
		</view>
		<w-picker
			mode="region"
			:defaultVal="['浙江省','杭州市','滨江区']" 
			@confirm="onConfirm" 
			ref="region" 
		></w-picker>
		<textarea value="" v-model="detailAddress" placeholder="添加详细地址" class="detail" />
		<view class="Btns" @tap="SendAddress">确定</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {mapState} from "vuex"
	export default {
		components:{
			wPicker
		},
		computed:{
			...mapState([
				'editaddress'
			])
		},
		data() {
			return{
				height:'',
				address:'', //省市区地址
				detailAddress:'',   //详细地址
			}
		},
		methods:{
			toggleTab(){
				this.$refs["region"].show();
			},
			onConfirm(val){
				console.log("==", val.result);
				this.address=val.result;
			}
		},
		// 提交地址
		SendAddress() {
			// this.$http.sendAddress({
			// 	
			// }).then(res =>{
			// 	
			// })
		},
		onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight
			this.address = this.editaddress.address
			this.detailAddress = this.editaddress.detailaddress
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
