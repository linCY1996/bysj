<template>
	<view class="container">
		<view class="tui-searchbox">
			<view class="tui-search-input" @tap="search">
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="search" size='13' color='#999'></icon>
				<!-- #endif -->
				<text class="tui-search-text">搜索精品课程</text>
			</view>
		</view>

		<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" :style="{height:height+'px'}">
			<view v-for="(item,index) in tabbar" :key="index" class="tab-bar-item" :class="[currentTab==index ? 'active' : '']"
			 :data-current="index" @tap.stop="swichNav">
				<text>{{item.name}}</text>
			</view>
		</scroll-view>
		<block v-for="(item,index) in tabbar" :key="index">
			<scroll-view scroll-y class="right-box" :style="{height:height+'px'}" v-if="currentTab==index">
				<!--内容部分 start 自定义可删除-->
				<view class="page-view">
					<swiper indicator-dots autoplay circular :interval="5000" :duration="3500" class="swiper">
						<swiper-item v-for="(item ,index) in info" :key="index" @tap.stop="detail">
							<image :src="item.imgs" class="slide-image" />
						</swiper-item>
					</swiper>
					<view class="class-box">
						<view class="class-item">
							<view class="class-name">{{item.name}}</view>
							<view class="g-container">
								<view class="g-box" v-for="(item, index) in tabgoodsList" :key="index" @tap.stop="prodectail(item.id)">
									<image :src="item.bookimgs" class="g-image" />
									<view class="g-title">{{item.bookname}}</view>
								</view>
							</view>
						</view>

						<view class="class-item">
							<view class="class-name">专场推荐{{index+1}}</view>
							<view class="g-container">
								<view class="g-box" v-for="(item,index) in listAll" :key="index" @tap.stop="prodectail(item.id)">
									<image :src="item.bookimgs" class="g-image" />
									<view class="g-title">{{item.bookname}}</view>
								</view>
								
							</view>
						</view>
					</view>
				</view>
				<!--内容部分 end 自定义可删除-->
			</scroll-view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: [],
				height: 0, //scroll-view高度
				currentTab: 0, //预设当前项的值
				scrollTop: 0, //tab标题的滚动条位置
				info:[],   //轮播图
				tabgoodsList:[],   //对应得tab信息列表
				listAll:[],  //显示专场推荐
			}
		},
		onLoad: function(options) {
			uni.getSystemInfo({
				success: (res) => {
					let header = 92;
					// #ifdef H5
					header = 0;
					// #endif
					this.height = res.windowHeight - uni.upx2px(header)
				}
			});
			// 获取侧边栏信息
			this.$http.getSlideAll({}).then(res => {
				// console.log("res", res);
				this.tabbar = res.data
			})
			// 获取轮播图信息
			this.$http.getLunImgs({}).then(res => {
				this.info = res.data
			});
			// 获取初次默认数据
			this.$http.lookDetailClass({
				class:1
			}).then(res => {
				// console.log("all", res);
				this.tabgoodsList = res.data
			})
			// 获取专场推荐数据
			this.$http.getClassList({}).then(res => {
				// console.log('res====', res);
				var list = res.data
				this.listAll = list.slice(5,11)
			})
		},
		methods: {
			// 点击标题切换当前页时改变样式
			swichNav: function(e) {
				console.log("====" ,e);
				var that = this
				let cur = e.currentTarget.dataset.current;
				that.tabbar.forEach(function(item, i) {
					if(cur == i) {
						// console.log("====", item.classid);
						that.$http.lookDetailClass({
							class:item.classid
						}).then(res => {
							console.log("all", res);
							that.tabgoodsList = res.data
						})
					}
				})
				if (that.currentTab == cur) {
					return false;
				} else {
					that.currentTab = cur;
					that.checkCor();
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				let that = this;
				if (that.currentTab > 7) {
					that.scrollTop = 500
				} else {
					that.scrollTop = 0
				}
			},
			detail(e) {
				uni.navigateTo({
					url: '../extend-view/productDetail/productDetail?goodsid='+e
				})
			},
			// 点击进入商品详情
			prodectail(e) {
				uni.navigateTo({
					url: '../productDetail/productDetail?goodsid='+e
				});
			},
			search: function() {
				uni.navigateTo({
					url: '../news-search/news-search'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #fcfcfc;
	}

	/* 左侧导航布局 start*/

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-searchbox {
		width: 100%;
		height: 92upx;
		padding: 0 30upx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}

	.tui-searchbox::after {
		content: '';
		position: absolute;
		border-bottom: 1upx solid #d2d2d2;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-search-input {
		width: 100%;
		height: 60upx;
		background: #f1f1f1;
		border-radius: 30upx;
		font-size: 26upx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-search-text {
		padding-left: 16upx;
	}

	.tab-view {
		/* height: 100%; */
		width: 200upx;
		position: fixed;
		left: 0;
		top: 92upx;
		z-index: 10;
	}

	.tab-bar-item {
		width: 200upx;
		height: 110upx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #444;
		font-weight: 400;
	}

	.active {
		position: relative;
		color: #000;
		font-size: 30upx;
		font-weight: 600;
		background: #fcfcfc;
	}

	.active::before {
		content: "";
		position: absolute;
		border-left: 8upx solid #E41F19;
		height: 30upx;
		left: 0;
	}

	/* 左侧导航布局 end*/

	.right-box {
		width: 100%;
		position: fixed;
		padding-left: 220upx;
		box-sizing: border-box;
		left: 0;
		top: 92upx;
	}

	.page-view {
		width: 100%;
		overflow: hidden;
		padding-top: 20upx;
		padding-right: 20upx;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.swiper {
		width: 100%;
		height: 220upx;
		border-radius: 12upx;
		overflow: hidden;
		transform: translateZ(0);
	}

	/* #ifdef APP-PLUS || MP */
	.swiper .wx-swiper-dot {
		width: 8upx;
		height: 8upx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16upx;
		overflow: hidden;
	}

	.swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16upx;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>.swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	>>>.swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	>>>.swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	.slide-image {
		width: 100%;
		height: 220upx;
	}

	.class-box {
		padding-top: 30upx;
	}

	.class-item {
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 20upx;
		margin-bottom: 20upx;
		border-radius: 12upx;
	}

	.class-name {
		font-size: 22upx;
	}

	.g-container {
		/* padding-top: 20upx; */
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.g-box {
		width: 33.3333%;
		text-align: center;
		padding-top: 40upx;
	}

	.g-image {
		width: 120upx;
		height: 120upx;
	}

	.g-title {
		font-size: 22upx;
	}
</style>
