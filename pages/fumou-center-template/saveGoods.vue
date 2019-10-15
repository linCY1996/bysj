<template>
	<view class="content">
		<view class="NavCh" v-for="(item, index) in list" :key="index" @tap="gotoDetail(item.books.id)">
			<image class="ShowImgs" :src="item.books.bookimgs" mode=""></image>
			<view class="ChMsgs">
				<view class="Title">
					<text class="TitleMsgs"><text>爆！</text>{{item.books.bookname}}</text>
				</view>
				<view class="NavBarMsgs">{{item.books.bookmsgs}}</view>
				<view class="Bottom">
					<view class="NavTime">{{item.time}}</view>
					<view class="Pirce">￥{{item.books.booksalenum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		computed:{
			...mapState([
				'userMsgs'
			])
		},
		data() {
			return{
				list:[],
			}
		},
		methods:{
			// 进入详情页
			gotoDetail(e) {
				// console.log(e);
				uni.navigateTo({
					url: '../productDetail/productDetail?goodsid='+e,
				});
			}
		},
		async onLoad() {
			var that = this
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			await that.$http.lookGoodsIsSaved({
				uid:that.userMsgs.id
			}).then(res => {
				var list = res.data
				list.forEach(function(item) {
					that.$http.lookGoodsDetailMsgs({
						gid:item.goodsid
					}).then(res => {
						item.books = res.data
						that.list.push(item)
					})
				})
				uni.hideLoading()
				console.log("lit", that.list);
			})
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		background: rgba(235, 235, 235, 0.2)
	}
	.NavCh {
		width: 96%;
		height: 200rpx;
		background: white;
		margin-left: 2%;
		margin-top: 10rpx;
		position: relative;
		border-bottom: 1rpx solid #EDEDED;
	}
	.ShowImgs{
		position: absolute;
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		left: 10rpx;
		top: 15rpx;
	}
	.ChMsgs {
		width: 500rpx;
		height: 170rpx;
		position: absolute;
		top: 25rpx;
		left: 180rpx;
	}
	.Title {
		/* position: absolute; */
		margin-top: 0rpx;
		margin-left: 0rpx;
		width: 100%;
		/* min-height: 60rpx; */
		line-height: 30rpx;
	}
	.TitleMsgs {
		font-size: 26rpx;
		white-space: pre-wrap;
		font-weight: bold;
	}
	.TitleMsgs text {
		width: 20rpx;
		height: 20rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFB400;
	}
	.NavBarMsgs {
		/* position: absolute; */
		margin-top: 20rpx;
		margin-left: 0rpx;
		width: 100%;
		height: 30rpx;
		line-height: 30rpx;
		white-space:nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		color: #C8C7CC;
		font-size: 24rpx;
	}
	.Bottom {
		margin-top: 15rpx;
		margin-left: 0rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.NavTime {
		/* position: absolute; */
		font-size: 22rpx;
		width: 150rpx;
		height: 30rpx;
		line-height: 30rpx;
		color: #C8C7CC;
	}
	.Pirce {
		font-size: 30rpx;
		color:#FAA851;
		width: 150rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: right;
	}
</style>
