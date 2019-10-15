<template>
	<view class="content">
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState([
			'hasLogin', 
		]),
		onLoad() {
			// var status = uni.getStorageSync('status')
			// console.log("Login==", this.hasLogin);
			var status = uni.getStorageSync('status')
			if(status == 1) {
				uni.switchTab({
					url:'../index/index'
				})
			} else {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul {
		font-size: 30upx;
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul>view {
		line-height: 50upx;
	}
</style>
