<template>
	<view class="container" style="width: 100%;">
		<!--header-->
		<view class="tui-header-box" :style="{height:height+'px',background:'rgba(255,255,255,'+opcity+')'}">
			<view class="tui-header" :style="{paddingTop:top+'px', opacity:opcity}">
				商品详情
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
				<view class="tui-icon tui-icon-more-fill  tui-icon-ml" :style="{color:opcity>=1?'#000':'#fff',background:'rgba(0, 0, 0,'+iconOpcity+')',fontSize:'20px'}"
				 @tap.stop="openMenu"></view>
				<!-- <tui-badge type="red" size="small">5</tui-badge> -->
			</view>
		</view>
		<!--header-->

		<!--banner-->
		<view class="tui-banner-swiper">
			<image :src="goodsMsgs.bookimgs" class="tui-slide-image" :style="{height:scrollH+'px'}" />
		</view>

		<!--banner-->
		<view class="tui-pro-detail">
			<view class="tui-product-title tui-border-radius">
				<view class="tui-pro-pricebox tui-padding">
					<view class="tui-pro-price">
						<view>￥<text class="tui-price">{{goodsMsgs.bookprice}}</text></view>
						<tui-tag size="small" :plain="true" type="high-green" shape="circle">新品</tui-tag>
					</view>
					<view class="tui-collection tui-size" @tap="collecting(goodsMsgs.id)">
						<view class="tui-icon tui-icon-collection" :class="['tui-icon-'+(collected?'like-fill':'like')]" :style="{color:collected?'#ff201f':'#333',fontSize:'20px'}"></view>
						<view class="tui-scale" :class="[collected?'tui-icon-red':'']">收藏</view>
					</view>
				</view>
				<view class="tui-original-price tui-gray">
					价格
					<text class="tui-line-through">￥199.00</text>
				</view>
				<view class="tui-pro-titbox">
					<view class="tui-pro-title">{{goodsMsgs.bookname}}</view>
					<button open-type="share" class="tui-share-btn tui-share-position">
						<tui-tag type="gray" tui-tag-class="tui-tag-share tui-size" shape="circleLeft" size="small">
							<view class="tui-icon tui-icon-partake" style="color:#999;font-size:15px"></view>
							<!-- <tui-icon name="partake" color="#999" size="15"></tui-icon> -->
							<text class="tui-share-text tui-gray">分享</text>
						</tui-tag>
					</button>
				</view>
				<view class="tui-padding">
					<view class="tui-sub-title tui-size tui-gray">{{goodsMsgs.bookmsgs}}</view>
					<view class="tui-sale-info tui-size tui-gray" style="width:80%">
						<view>快递：0.00</view>
						<view>月销{{goodsMsgs.booksalenum}}</view>
						<view>浙江杭州</view>
					</view>
				</view>
			</view>

			<view class="tui-cmt-box tui-mtop tui-radius-all" style="width: 100%;">
				<view class="tui-list-cell tui-last tui-between">
					<view class="tui-bold tui-cell-title">评价</view>
					<view @tap="common(goodsMsgs.id)">
						<text class="tui-cmt-all">查看全部</text>
						<view class="tui-icon tui-icon-more-fill" style="color:#ff201f; font-size: 20px;"></view>
						<!-- <tui-icon name="more-fill" size="20" color="#ff201f"></tui-icon> -->
					</view>
				</view>

				<view class="tui-cmt-content tui-padding">
					<view class="tui-cmt-user">
						<image src="../../../static/images/news/avatar_2.jpg" class="tui-acatar"></image>
						<view>z***9</view>
					</view>
					<view class="tui-cmt">这门课得内容真的很不错</view>
					<view class="tui-attr">中国古典文学</view>
				</view>

				<view class="tui-cmt-btn">
					<tui-tag type="black" :plain="true" tui-tag-class="tui-tag-cmt" @tap="common(goodsMsgs.id)">查看全部评价</tui-tag>
				</view>
			</view>

			<view class="tui-nomore-box">
				<tui-nomore text="课程详情" :visible="true" bgcolor="#f7f7f7"></tui-nomore>
			</view>
			<view class="tui-product-img tui-radius-all" style="width: 100%;">
				<image :src="item" v-for="(item, index) in bottomImgs" :key="index" mode="widthFix"></image>
			</view>
			<tui-nomore text="已经到最底了" :visible="true" bgcolor="#f7f7f7"></tui-nomore>
			<view class="tui-safearea-bottom"></view>
		</view>

		<!--底部操作栏-->
		<view class="tui-operation">
			<view class="tui-operation-left tui-col-5">
				<view class="tui-operation-item" hover-class="opcity" :hover-stay-time="150" @tap="connectKF">
					<tui-icon name="kefu" :size="22" color='#333'></tui-icon>
					<view class="tui-operation-text tui-scale-small">客服</view>
				</view>
				<view class="tui-operation-item" hover-class="opcity" :hover-stay-time="150">
					<tui-icon name="shop" :size="22" color='#333'></tui-icon>
					<view class="tui-operation-text tui-scale-small">店铺</view>
				</view>
				<view class="tui-operation-item" hover-class="opcity" :hover-stay-time="150" @tap="gotoCart">
					<tui-icon name="cart" :size="22" color='#333'></tui-icon>
					<view class="tui-operation-text tui-scale-small">购物车</view>
					<!-- <tui-badge type="danger" size="small">9</tui-badge> -->
				</view>
			</view>
			<view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
				<view class="tui-flex-1">
					<tui-button type="danger" shape="circle" size="mini" @click="showPopup(goodsMsgs.id)">加入购物车</tui-button>
				</view>
				<view class="tui-flex-1">
					<tui-button type="warning" shape="circle" size="mini" @click="nowBuy">立即购买</tui-button>
				</view>
			</view>
		</view>


		<!--底部操作栏--->

		<!--顶部下拉菜单-->
		<tui-top-dropdown tui-top-dropdown="tui-top-dropdown" bgcolor="rgba(76, 76, 76, 0.95)" :show="menuShow" :height="0"
		 @close="closeMenu">
			<view class="tui-menu-box tui-padding">
				<view class="tui-menu-header" :style="{paddingTop:top+'px'}">
					精品课程
				</view>
				<view class="tui-menu-itembox">
					<block v-for="(item,index) in topMenu" :key="index">
						<view class="tui-menu-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="common">
							<view class="tui-badge-box">
								<tui-icon :name="item.icon" color="#fff" :size="item.size"></tui-icon>
								<tui-badge type="red" tui-badge-class="tui-menu-badge" size="small" v-if="item.badge">{{item.badge}}</tui-badge>
							</view>
							<view class="tui-menu-text">{{item.text}}</view>
						</view>
					</block>
				</view>
				<view class="tui-icon tui-icon-up" style="color: #fff; font-size: 26px;" @tap.stop="closeMenu"></view>
				<!-- <tui-icon name="up" color="#fff" size="26" class="tui-icon-up" @tap.stop="closeMenu"></tui-icon> -->
			</view>
		</tui-top-dropdown>
		<!---顶部下拉菜单-->
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiTag from "@/components/tag/tag"
	import tuiBadge from "@/components/badge/badge"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiButton from "@/components/button/button"
	import tuiTopDropdown from "@/components/top-dropdown/top-dropdown"
	import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import {
		mapState
	} from "vuex"
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiBadge,
			tuiNomore,
			tuiButton,
			tuiTopDropdown,
			tuiBottomPopup,
			tuiNumberbox
		},
		computed: {
			...mapState([
				'userMsgs'
			])
		},
		data() {
			return {
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0.5,
				bannerIndex: 0,
				topMenu: [{
					icon: "home",
					text: "首页",
					size: 23,
					badge: 0
				}, {
					icon: "people",
					text: "我的",
					size: 26,
					badge: 0
				}, {
					icon: "cart",
					text: "购物车",
					size: 23,
					badge: 0
				}, {
					icon: "kefu",
					text: "客服小蜜",
					size: 26,
					badge: 0
				}, {
					icon: "feedback",
					text: "我要反馈",
					size: 23,
					badge: 0
				}, {
					icon: "share",
					text: "分享",
					size: 26,
					badge: 0
				}],
				menuShow: false,
				value: 1,
				collected: false,
				goodsMsgs: '', //商品详情信息
				bottomImgs: [], //底部图片
			}
		},
		onLoad: function(options) {
			this.$http.lookGoodsDetailMsgs({
				gid: options.goodsid
			}).then(res => {
				this.goodsMsgs = res.data
			})
			this.$http.lookGoodsIsSaved({
				uid:this.userMsgs.id
			}).then(res => {
				var that = this
				if(res.data != 0) {
					var list = res.data
					list.forEach(function(item) {
						if(item.goodsid == options.goodsid) {
							that.collected = true
						}
					})
				}
			})
			// 查询详情页底部多图展示
			this.$http.lookGoodDetailArrayImgs({
				gid: options.goodsid
			}).then(res => {
				console.log("detailArrayImgs", res);
				if(res.data != 0) {
					this.bottomImgs = JSON.parse(res.data.bookdetailimgs)
				}

			})
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif

			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.scrollH = res.windowWidth
				}
			})
		},
		methods: {
			bannerChange: function(e) {
				this.bannerIndex = e.detail.current
			},
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.banner[index],
					urls: this.banner
				})
			},
			back: function() {
				uni.navigateBack()
			},
			openMenu: function() {
				this.menuShow = true
			},
			closeMenu: function() {
				this.menuShow = false
			},
			// 点击收藏
			collecting: function(e) {
				uni.showLoading({
					title: '操作中',
					mask: true
				});
				this.collected = !this.collected
				var day2 = new Date()
				day2.setTime(day2.getTime());
				var nowday = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
				var status = 0  //没有收藏状态
				if (this.collected == true) {
					status = 1
				}else {
					status = 0
				}
				this.$http.controlSaveGoods({
					uid:this.userMsgs.id,
					gid:e,
					time:nowday,
					status:status
				}).then(res => {
					uni.hideLoading()
					if(res.data == 1) {
						if(status == 1) {
							uni.showToast({
								title: '收藏课程成功',
								icon:'none',
								duration:3000
							});
						}else {
							uni.showToast({
								title: '成功取消收藏',
								icon:'none',
								duration:3000
							});
						}
					}else {
						this.collected = !this.collected
						uni.showToast({
							title: '服务器异常',
							icon:'none',
							duration:3000
						});
					}
					console.log("收藏Status", res);
				})
			},
			// 查看商品评价
			common: function(e) {
				uni.navigateTo({
					url: '../uni-comment/uni-comment?gid='+e
				})
			},
			// 加入购物车
			showPopup(e) {
				// console.log('加入购物车id=', e.currentTarget.id);
				// console.log("userMsgs", this.userMsgs);
				this.$http.insertIntoCart({
					bookid: e,
					userid: this.userMsgs.id
				}).then(res => {
					if (res.data == 0) {
						uni.showToast({
							title: '商品加入购物车失败',
							icon: 'none',
							duration: 3000
						});
					} else if (res.data == 1) {
						uni.showToast({
							title: '成功加入购物车',
							icon: 'none',
							duration: 3000
						});
					}
				})
			},
			// 立即购买
			nowBuy() {
				uni.showModal({
					title: '无法进行购买',
					content: '因为没有对接支付接口',
				});
			},
			// 联系客服
			connectKF() {
				uni.makePhoneCall({
					phoneNumber:'15215084164'
				})
			},
			// 进入购物车
			gotoCart() {
				uni.switchTab({
					url: '../Cart/Cart',
				});
			}
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		}
	}
</script>

<style>
	/* icon 也可以使用组件*/
	@import "../../static/style/icon.css";

	page {
		background: #f7f7f7;
	}

	.container {
		padding-bottom: 110upx;
	}

	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9998;
	}

	.tui-header {
		width: 100%;
		font-size: 18px;
		line-height: 18px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
	}



	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}

	.tui-icon-ml {
		margin-left: 20upx;
	}

	.tui-icon {
		border-radius: 16px;
	}


	.tui-icon-back {
		height: 32px !important;
		width: 32px !important;
		display: block !important;
	}

	.tui-header-icon .tui-icon-more-fill {
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;
		display: block !important;
	}

	.tui-banner-swiper {
		position: relative;
	}

	.tui-banner-swiper .tui-tag-class {
		position: absolute;
		color: #fff;
		bottom: 30upx;
		right: 0;
	}

	.tui-slide-image {
		width: 100%;
		display: block;
	}

	/*顶部菜单*/

	.tui-menu-box {
		box-sizing: border-box;
	}

	.tui-menu-header {
		font-size: 34upx;
		color: #fff;
		height: 32px;
		display: flex;
		align-items: center;
	}

	.tui-top-dropdown {
		z-index: 9999 !important;
	}

	.tui-menu-itembox {
		color: #fff;
		padding: 40upx 10upx 0 10upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		font-size: 26upx;
	}

	.tui-menu-item {
		width: 22%;
		height: 160upx;
		border-radius: 24upx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		margin-right: 4%;
		margin-bottom: 4%;
	}

	.tui-menu-item:nth-of-type(4n) {
		margin-right: 0;
	}

	.tui-badge-box {
		position: relative;
	}

	.tui-badge-box .tui-badge-class {
		position: absolute;
		top: -8px;
		right: -8px;
	}

	.tui-msg-badge {
		top: -10px;
	}

	.tui-icon-up {
		position: relative;
		display: inline-block;
		left: 50%;
		transform: translateX(-50%);
	}

	.tui-menu-text {
		padding-top: 12upx;
	}

	.tui-opcity .tui-menu-text,
	.tui-opcity .tui-badge-box {
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
	}

	/*顶部菜单*/

	/*内容 部分*/

	.tui-padding {
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.tui-size {
		font-size: 24upx;
		line-height: 24upx;
	}

	.tui-gray {
		color: #999;
	}

	.tui-icon-red {
		color: #ff201f;
	}

	.tui-border-radius {
		border-bottom-left-radius: 24upx;
		border-bottom-right-radius: 24upx;
		overflow: hidden;
	}

	.tui-radius-all {
		border-radius: 24upx;
		overflow: hidden;
		width: 85%;
	}

	.tui-mtop {
		margin-top: 26upx;
	}

	.tui-pro-detail {
		box-sizing: border-box;
		color: #333;
	}

	.tui-product-title {
		background: #fff;
		padding: 30upx 0;
	}

	.tui-pro-pricebox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ff201f;
		font-size: 36upx;
		font-weight: bold;
		line-height: 44upx;
	}

	.tui-pro-price {
		display: flex;
		align-items: center;
	}

	.tui-pro-price .tui-tag-class {
		transform: scale(0.7);
		transform-origin: center center;
		line-height: 24upx;
		font-weight: normal;
	}

	.tui-price {
		font-size: 58upx;
	}

	.tui-original-price {
		font-size: 26upx;
		line-height: 26upx;
		padding: 10upx 30upx;
		box-sizing: border-box;
	}

	.tui-line-through {
		text-decoration: line-through;
	}

	.tui-collection {
		color: #333;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		height: 44upx;
	}

	.tui-scale {
		transform: scale(0.7);
		transform-origin: center center;
		line-height: 24upx;
		font-weight: normal;
	}

	.tui-icon-collection {
		line-height: 20px !important;
		margin-bottom: 0 !important;

	}

	.tui-pro-titbox {
		font-size: 32upx;
		font-weight: 500;
		position: relative;
		padding: 0 150upx 0 30upx;
		box-sizing: border-box;
	}

	.tui-pro-title {
		padding-top: 20upx;
	}

	.tui-share-btn {
		display: block;
		background: none;
		margin: 0;
		padding: 0;
		border-radius: 0;
	}

	.tui-tag-share {
		display: flex;
		align-items: center;
	}

	.tui-share-position {
		position: absolute;
		right: 0;
		top: 30upx;
	}

	.tui-share-text {
		padding-left: 8upx;
	}

	.tui-sub-title {
		padding: 20upx 0;
	}

	.tui-sale-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30upx;
	}

	.tui-discount-box {
		background: #fff;
	}

	.tui-list-cell {
		position: relative;
		display: flex;
		align-items: center;
		font-size: 26upx;
		line-height: 26upx;
		padding: 36upx 30upx;
		box-sizing: border-box;
	}

	.tui-right {
		position: absolute;
		right: 30upx;
		top: 30upx;
	}

	.tui-top40 {
		top: 40upx !important;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 126upx;
	}

	.tui-last::after {
		border-bottom: 0 !important;
	}

	.tui-tag-coupon-box {
		display: flex;
		align-items: center;
	}

	.tui-tag-coupon-box .tui-tag-class {
		margin-right: 20upx;
	}


	.tui-cell-title {
		width: 66upx;
		padding-right: 30upx;
		flex-shrink: 0;
	}

	.tui-promotion-box {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 10upx 0;
		width: 74%;
	}

	.tui-promotion-box .tui-tag-class {
		display: inline-block !important;
		transform: scale(0.8);
		transform-origin: 0 center;
	}

	/* .tui-inline-block {
		display: inline-block !important;
		transform: scale(0.8);
		transform-origin: 0 center;
	} */

	.tui-basic-info {
		background: #fff;
	}

	.tui-addr-box {
		width: 76%;
	}

	.tui-addr-item {
		padding: 10upx;
		line-height: 34upx;
	}

	.tui-guarantee {
		background: #fdfdfd;
		display: flex;
		flex-wrap: wrap;
		padding: 20upx 30upx 30upx 30upx;
		font-size: 24upx;
	}

	.tui-guarantee-item {
		color: #999;
		padding-right: 30upx;
		padding-top: 10upx;
	}

	.tui-pl {
		padding-left: 4upx;
	}

	.tui-cmt-box {
		background: #fff;
	}

	.tui-between {
		justify-content: space-between !important;
	}

	.tui-cmt-all {
		color: #ff201f;
		padding-right: 8upx;
	}

	.tui-cmt-content {
		font-size: 26upx;
	}

	.tui-cmt-user {
		display: flex;
		align-items: center;
	}

	.tui-acatar {
		width: 60upx;
		height: 60upx;
		border-radius: 30upx;
		display: block;
		margin-right: 16upx;
	}

	.tui-cmt {
		padding: 14upx 0;
	}

	.tui-attr {
		font-size: 24upx;
		color: #999;
		padding: 6upx 0;
	}

	.tui-cmt-btn {
		padding: 50upx 0 30upx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-tag-cmt {
		min-width: 130upx;
		padding: 20upx 52upx !important;
		font-size: 26upx !important;
		display: inline-block;
	}

	.tui-nomore-box {
		padding-top: 10upx;
	}

	.tui-product-img {
		transform: translateZ(0);
	}

	.tui-product-img image {
		width: 100%;
		display: block;
	}

	/*底部操作栏*/

	.tui-col-7 {
		width: 58.33333333%;
	}

	.tui-col-5 {
		width: 41.66666667%;
	}

	.tui-operation {
		width: 100%;
		height: 100upx;
		/* box-sizing: border-box; */
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
	}

	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.tui-operation-text {
		font-size: 22upx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100upx;
		/* box-sizing: border-box; */
		padding-top: 0;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-btnbox-4 .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28upx !important;
	}

	.tui-operation .tui-badge-class {
		position: absolute;
		top: -6upx;
		/* #ifdef H5 */
		transform: translateX(50%)
			/* #endif  */
	}

	.tui-flex-1 {
		flex: 1;
	}

	/*底部操作栏*/

	/*底部选择弹层*/

	.tui-popup-class {
		border-top-left-radius: 24upx;
		border-top-right-radius: 24upx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-popup-box {
		position: relative;
		padding: 30upx 0 100upx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28upx !important;
	}

	.tui-icon-close {
		position: absolute;
		top: 30upx;
		right: 30upx;
	}

	.tui-product-box {
		display: flex;
		align-items: flex-end;
		font-size: 24upx;
		padding-bottom: 30upx;
	}

	.tui-popup-img {
		height: 200upx;
		width: 200upx;
		border-radius: 24upx;
		display: block;
	}

	.tui-popup-price {
		padding-left: 20upx;
		padding-bottom: 8upx;
	}

	.tui-amount {
		color: #ff201f;
		font-size: 36upx;
	}

	.tui-number {
		font-size: 24upx;
		line-height: 24upx;
		padding-top: 12upx;
		color: #999;
	}

	.tui-popup-scroll {
		height: 600upx;
		font-size: 26upx;
	}

	.tui-scrollview-box {
		padding: 0 30upx 60upx 30upx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10upx 0;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20upx 0;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 200upx;
		height: 64upx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		padding: 0 26upx;
		box-sizing: border-box;
		border-radius: 32upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		font-size: 26upx;
	}

	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-attr-active::after {
		content: "";
		position: absolute;
		border: 1upx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40upx;
		left: 0;
		top: 0;
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 30upx 0;
		box-sizing: border-box;
	}

	/*底部选择弹层*/
</style>
