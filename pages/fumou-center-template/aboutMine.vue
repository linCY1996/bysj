<template>
	<view class="content">
		<view class="title">
			精品课程允诺
		</view>
		<view class="msgs">{{msgs}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				msgs: '承诺很美，很容易让人陶醉。因为它是甜言蜜语的艺术品。美的让人沾沾自喜，觉得拥有了全世界，\n却不懂得如何自拔。 去年的冬天，我送给它一个冰雪似的承诺，承诺很美，很容易让人陶醉。因为它是甜言蜜语的艺术品。美的让人沾沾自喜，觉得拥有了全世界，\n却不懂得如何自拔。 去年的冬天，我送给它一个冰雪似的承诺，'
			}
		}
	}
</script>

<style>
	.content {
		background: white;
		width: 100%;
		height: 100%;
	}
	.title{
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		font-size: 30rpx;
		font-weight: bold;
		height: 50rpx;
		width: 300rpx;
		line-height: 50rpx;
		text-align: center;
		
	}
	.msgs {
		width: 94%;
		margin-left: 3%;
		margin-top: 50rpx;
		font-size: 22rpx;
		white-space: pre-wrap;
		word-break: break-all;
	}
</style>
