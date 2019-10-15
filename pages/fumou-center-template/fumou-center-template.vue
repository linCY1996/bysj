<template>
	<view class="center">
		<view class="center_top">
			<view class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header">

					</view>
					<text>昵称</text>
					<!-- <image src="../../static/fumou-center-template/setting.png" mode=""></image> -->
				</view>
				<view class="order_status">
					<view class="status" v-for="(item, index) in status" :key="index" @tap="gotoDetail(item.link)">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="baiban">

			</view>
			<view class="center_menu">
				<!-- <view class="menu_item" v-for="item in menus">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view> -->
				<view class="menu_item" @click="gotoSaveGoods">
					<image src="../../static/fumou-center-template/5.png" mode="aspectFill"></image>
					<text>我的收藏</text>
				</view>
				<view class="menu_item" @click="gotoAddress">
					<image src="../../static/fumou-center-template/6.png" mode="aspectFill"></image>
					<text>地址管理</text>
				</view>
				<view class="menu_item" @click="callCenter">
					<image src="../../static/fumou-center-template/8.png" mode="aspectFill"></image>
					<text>帮助中心</text>
				</view>
				<view class="menu_item" @tap="gotoFeedBack">
					<image src="../../static/fumou-center-template/9.png" mode="aspectFill"></image>
					<text>意见反馈</text>
				</view>
				<view class="menu_item" @click="gotoAboutUs">
					<image src="../../static/fumou-center-template/10.png" mode="aspectFill"></image>
					<text>关于我们</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: [{
						key: 1,
						name: '待发货',
						url: '../../static/fumou-center-template/one.png',
						link: 'waitingGods'
					},
					{
						key: 2,
						name: '待收货',
						url: '../../static/fumou-center-template/2.png',
						link: 'waitingGet'
					},
					{
						key: 3,
						name: '待评价',
						url: '../../static/fumou-center-template/3.png',
						link: 'waitingCommand'
					},
					{
						key: 4,
						name: '全部订单',
						url: '../../static/fumou-center-template/4.png',
						link: 'allOrder'
					}
				],
			};
		},
		methods: {
			// 进入地址管理
			gotoAddress() {
				uni.navigateTo({
					url: '../chb-address/address-list/address-list',
				});
			},
			// 点击跳转订单状态列表
			gotoDetail(e) {
				var status = e
				switch (status) {
					case 'waitingGods':
						uni.navigateTo({
							url: 'waitingGods',
						});
						break
					case 'waitingGet':
						uni.navigateTo({
							url: 'waitingGods',
						});
						break
					case 'waitingCommand':
						uni.navigateTo({
							url: 'waitingGods',
						});
						break
					case 'allOrder':
						uni.navigateTo({
							url: 'waitingGods',
						});
						break

				}
			},
			// 跳转意见反馈
			gotoFeedBack() {
				uni.navigateTo({
					url: 'uni-feedback',
				});
			},
			// 帮助中心。拨打电话
			callCenter(){
				uni.makePhoneCall({
					phoneNumber:'15215084164'
				})
			},
			// 跳转个人收藏
			gotoSaveGoods() {
				uni.navigateTo({
					url: 'saveGoods',
				});
			},
			// 跳转关于我们
			gotoAboutUs() {
				uni.navigateTo({
					url: 'aboutMine',
				});
			}
		},
		computed: {

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.profily,
	.profily_header {
		border-radius: 8px;
	}

	.center {
		height: 100%;
		width: 100%;

		&_top {
			height: 18%;
			background: url('../../static/fumou-center-template/header.jpg') no-repeat 0% 50%;
			background-size: cover;

			// background: #E6E6E6;
			.mask {
				background: rgba(0, 0, 0, .4);
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #F6F6F6;
		padding-bottom: 35upx;
		position: relative;

		.profily_header {
			height: 120upx;
			width: 120upx;
			background-image: url('../../static/fumou-center-template/header.jpg');
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}

		image {
			position: absolute;
			height: 40upx;
			width: 40upx;
			right: 0px;
			top: 0px;
		}
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;

		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: .5px;
			display: flex;
			flex-direction: column;

			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;

			}
		}
	}

	.baiban {
		background: #FEFEFE;
		height: 300upx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../static/fumou-center-template/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
