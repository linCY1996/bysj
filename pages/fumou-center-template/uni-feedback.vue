<template>
    <view class="content" :style="{height:height+'px'}">
    	<view class="Nav">
    		<textarea value="" placeholder="请填写您的问题反馈" />
    	</view>
		<button type="primary" @tap="SendMsg">点击提交</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
               height:'',   //屏幕高度
            }
        },
        onLoad() {
			this.height = uni.getStorageInfoSync().windowHeight
        },
        methods: {
            // 点击提交
			SendMsg() {
				// this.$http.SendCommand({
				// 	
				// }).then(res => {
				// 	console.log("res=", res);
				// })
			}
        }
    }
</script>

<style>
   .content {
	   width: 100%;
	   /* height: 100%; */
	   background: #EEEEEE;
	   display: flex;
	   /* justify-content: center; */
   }
   .Nav {
	   width: 80%;
	   height: 260rpx;
	   /* border: 1rpx solid black; */
	   margin-top: 150rpx;
	   margin-left: 10%;
   }
   .Nav textarea {
	   width: 100%;
	   height: 100%;
	   font-size: 26rpx;
	   border: 1rpx solid #D2D2D2;
   }
   button {
	   width: 80%;
	   margin-left: 10%;
	   margin-top: 150rpx;
	   background: #44CF85;
	   text-align: center;
	   font-size: 34rpx;
	   color: white;
	   border-radius: 10rpx;
   }
</style>
