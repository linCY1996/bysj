<!--首页每日推荐-->
<template>
	<view id="bbb" class="index-pb">
		<div id="vm" class="pubu" v-cloak>
			<!-- 左边的瀑布 -->
			<ul class="yg yg_l">
				<li v-for="(item,index) in recomendList" :key="index" v-if="index%2==0">
					<view class="" @tap="toDetail(item.id)">
						<div>
							<image :src="item.bookimgs" mode="scaleToFill"></image>
						</div>
						<p class="tit">{{ item.bookname }}</p>
						<p class="subtit">{{ item.bookmsgs }}</p>
					</view>
					<p class="price">
						<text class="price-l fw700 fs26">￥{{ item.bookprice }}</text>
						<view class="pb-car iconfont" :id="item.id" :data-img="item.bookimgs" @tap="addShopCar">
							<image src="../../static/img/shopcar.png"></image>
						</view>
					</p>
				</li>
			</ul>
			<!-- 右边的瀑布 -->
			<ul class="yg yg_r">
				<li v-for="(item,index) in recomendList" :key="index" v-if="index%2==1">
					<view class="" @tap="toDetail(item.id)">
						<div>
							<image :src="item.bookimgs" mode="scaleToFill"></image>
						</div>
						<p class="tit">{{ item.bookname }}</p>
						<p class="subtit">{{ item.bookmsgs }}</p>
					</view>
					<p class="price">
						<text class="price-l fw700 fs26">￥{{ item.bookprice }}</text>
						<view class="pb-car iconfont" :id="item.id" :data-img="item.bookimgs" @tap="addShopCar">
							<image src="../../static/img/shopcar.png"></image>
						</view>
					</p>
				</li>
			</ul>
			<div style="clear: both;"></div>
		</div>
		<!-- 加入购物车动画 cartx 和 carty 是购物车位置在屏幕位置的比例 例如左上角x0.1 y0.1 右下角 x0.9 y0.9-->
		<shopCarAnimation ref="carAnmation" cartx="0.58" carty="1.1"></shopCarAnimation>
	</view>
</template>


<!--JS-->
<script>
	//  加入购物车动画组件
	import shopCarAnimation from '@/components/fly-in-cart/fly-in-cart.vue'
	import {mapState} from "vuex"
	export default {
		computed:{
			...mapState([
				'userMsgs'
			])
		},
		data() {
			return {
				recomendList: [],  //课程列表
			};
		},
		onLoad(options) {
			// console.log("options", options);
			this.$http.lookDetailClass({
				class:options.class
			}).then(res => {
				// console.log("class", res);
				this.recomendList = res.data
			})
		},
		components: {
			shopCarAnimation
		},
		methods: {
			// 跳转到详情页
			toDetail(id) {
				uni.navigateTo({
					url: '../productDetail/productDetail?goodsid='+id
				});
			},
			// 加入购物车
			addShopCar(e) {
				// console.log('加入购物车id=', e.currentTarget.id);
				// console.log("userMsgs", this.userMsgs);
				this.$http.insertIntoCart({
					bookid:e.currentTarget.id,
					userid:this.userMsgs.id
				}).then(res => {
					if(res.data == 0) {
						uni.showToast({
							title: '商品加入购物车失败',
							icon:'none',
							duration:3000
						});
					}else if (res.data == 1) {
						uni.showToast({
							title: '成功加入购物车',
							icon:'none',
							duration:3000
						});
					}
				})
				// 成功的话，调用加入购物车动画
				this.$refs.carAnmation.touchOnGoods(e);
			}
		}
	};
</script>


<!--css样式-->
<style lang="scss" scoped>
	@import '../../static/style/pubu.css';

	.pb-car {
		float: right;
		color: #FD395B;
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
		text-align: center;
		margin-right: 8upx;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
