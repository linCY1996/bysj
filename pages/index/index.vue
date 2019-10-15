<template>
	<view class="contents">
		<view class="Top">
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change" circular="true" autoplay="true" :interval="interval" :duration="duration"
				 :previous-margin="premargin+'rpx'" :next-margin="nextmargin+'rpx'">
					<swiper-item v-for="(item ,index) in info" :key="index">
						<image :src="item.imgs" mode=""></image>
						<!-- <view class="swiper-item">
						{{item.imgs}}
						</view> -->
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="Body">
			<view class="BodyMsg">
				<view class="BodyCh" v-for="(item, index) in chrList" :key="index" @click="gotoJP(item.id)">
					<image :src="item.imgs" mode=""></image>
					<text>{{item.names}}</text>
				</view>
			</view>
		</view>
		<!-- 底部瀑布流 -->
		<view class="Bottom">
			<waterfall-flow :list="list" :loading="loading" @click="choose"></waterfall-flow>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	// 瀑布流组件
	import WaterfallFlow from '@/components/nairenk-waterfall-flow/nairenk-waterfall-flow.vue';
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		components: {
			uniSwiperDot,
			WaterfallFlow
		},
		computed: mapState([
			'hasLogin',
		]),
		data() {
			return {
				interval: 5000,
				duration: 3500,
				premargin: 45,
				nextmargin: 45,
				info: [], //轮播图信息
				current: 0,
				mode: 'indexes',
				page: 1,
				start: 0,
				end: 0,
				list: [], // 列表
				loading: true,
				listAll: [], //接口获取列表
				chrList: [], //首页子级入口展示
			}
		},
		onReachBottom() {
			this.page++;
			this.loading = true;
			this.getList();
		},
		methods: {
			...mapMutations([
				'saveUserMsgs'
			]),
			// 轮播图事件
			change(e) {
				this.current = e.detail.current;
			},
			// 选中
			choose(item) {
				// item 返回选中 JSON 对象
				// console.log("===", item)
				uni.navigateTo({
					url: '../productDetail/productDetail?goodsid='+item.id,
				});
			},
			// 获取课程列表
			async getClassList() {
				await this.$http.getClassList({}).then(res => {
					this.listAll = res.data
				})
			},
			// 模拟加载数据
			getList() {
				if (this.list.length < this.listAll.length) {
					setTimeout(() => {
						this.end = this.page * 5;
						this.list = this.list.concat(this.listAll.slice(this.start, this.end));
						this.start = this.end;
						// 延迟 120 毫秒隐藏加载动画，为了跟组件里面的 100 毫秒定位有个平缓过度
						setTimeout(() => {
							this.loading = false;
						}, 120);
					}, 1000)
				} else {
					this.loading = false;
				}
			},
			// 进入精品课程
			gotoJP(e) {
				uni.navigateTo({
					url: 'jingpingClass?class=' + e,
				});
			},
		},
		async onLoad() {
			this.$http.getLunImgs({}).then(res => {
				this.info = res.data
			});
			this.$http.getIndexChr({}).then(res => {
				this.chrList = res.data
			})
			this.$http.lookUserMsgs({
				uid: uni.getStorageSync('uid')
			}).then(res => {
				console.log("userMsgs", res.data);
				if (res.data != 0) {
					this.saveUserMsgs(res.data)
				}
			})
			await this.getClassList();
			await this.getList();
		}
	}
</script>

<style>
	.contents {
		width: 100%;
		background: rgba(1, 1, 1, .1);
	}

	.Top {
		width: 100%;
		height: 300rpx;
	}

	swiper image {
		width: 100%;
		margin-left: 15rpx;
		height: 100%;
	}

	.Body {
		width: 94%;
		margin-top: 15rpx;
		height: 180rpx;
		margin-left: 3%;
		background: rgba(0, 0, 0, .1);
		box-shadow: 0rpx 5rpx 8rpx 8rpx rgba(1, 1, 1, .3);
		border-radius: 90rpx;

	}

	.BodyMsg {
		margin-left: 77rpx;
		width: 80%;
		height: 90%;
		margin-top: 15rpx;
		display: flex;
		justify-content: space-between;
	}

	.BodyCh {
		position: relative;
		width: 25%;
		top: 10rpx;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	.BodyCh image {
		position: absolute;
		top: 10rpx;
		width: 76%;
		height: 100rpx;
		border-radius: 10rpx;
	}

	.BodyCh text {
		position: absolute;
		bottom: 0rpx;
		width: 80%;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		text-align: center;
	}

	.Bottom {
		margin-top: 35rpx;
		/* margin-left: -10rpx; */
		width: 100%;
		min-height: 800rpx;
	}
</style>
