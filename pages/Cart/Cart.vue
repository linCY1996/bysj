<template>
	<view class="shoppingcar" :style="minHeight">
		<view class="dianpu" v-for="(item,index) in shopData" :key="index">
			<!-- <view class="dianpu-name" v-if="item.store_name">
				<checkBox :isselected="item.checked" @change="shopActive(item)"></checkBox>
				<view class="iconfont" style="width: 50upx;height: 50upx; margin-top: -14upx;">
					<image src="../../static/img/hudong.png" mode="scaleToFill" style="vertical-align: middle;width: 50rpx;height: 50rpx;"></image>
				</view>
				<view class="text">{{ item.store_name }}</view>
			</view> -->
			<scroll-view scroll-x="true" class="scrollView" 
			v-for="(ite,ind) in item.data"
			:key="ind"
			:id="ite.cart_id"
			:data-index="ind"
			:scroll-left="ite.scrollLeft" 
			@touchstart="touchS"
			@touchend="touchE">
				<view class="viewbox">
					<view class="shangpin" >
						<checkBox :isselected="ite.isChecked" @change="proActive(item,ite)"></checkBox>
						<view class="shangpin-info">
							<view class="img">
								<image :src="ite.goods_image_url" mode="aspectFill"></image>
							</view>
							<view class="text-info">
								<view class="title-text" @tap="toProDetail(ite.goods_id,ite.store_id)">
									<text class="name">{{ ite.goods_name }}</text>
								</view>
								<view class="jiage" @tap="toProDetail(ite.goods_id,ite.store_id)">
									<text class="danjia">￥{{ ite.goods_price }}</text>
								</view>
								<view class="numInput">
									<text class="reduce iconfont" @tap="changeCount(ite,-1,ite.cart_id)" :class="ite.goods_num == 0 ? 'numbox-disabled' : ''">-</text>
									<input type="number" v-model="ite.goods_num" :id="ite.cart_id" @input="inputCarCount" />
									<text class="plus iconfont" @tap="changeCount(ite,1,ite.cart_id)">+</text>
								</view>
							</view>
						</view>
					</view>
					<view class="hong" @tap="deletePro(ite.cart_id,ite.store_id)">删除</view>
				</view>
			</scroll-view>
		</view>
		<!-- 底部结算 -->
		<view class="bottom-jiesuan">
			<view class="info">
				<view class="allSelectText">
					<checkBox :isselected="isCheckAll" @change="allCheck"></checkBox>
					<view class="allText">全选</view>
				</view>
				<view>
					总计：<text>￥{{ allPrice }}</text>
				</view>
			</view>
			<view class="btn" @tap="jiesuan">结算</view>
		</view>
		
	</view>
</template>

<script>
	import checkBox from '@/components/custom-checkbox.vue'
	var startX=0;
	var endX=0;
export default {
	data() {
		return {
			// 全选，返回
			isCheckAll:false,
			allPrice: 0, //所有价格
			allShops: 0, //被选中的商店数量
			allCount: 0, //被选中的产品数量
			shopData:[
					{
						'data':[
							{
								cart_id:1,
								goods_name:' 香奈儿可可小姐淡香水 50ml',
								goods_name2:' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
								reduce_price:16,
								goods_price:100,
								goods_num:1,
								goods_image_url:'../../static/img/grid1.png',
								isChecked:false,
								// 滚动条
								scrollLeft:0,
							},
							{
								cart_id:2,
								goods_name:' 香奈儿可可小姐淡香水 50ml',
								goods_name2:' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
								reduce_price:16,
								goods_price:100,
								goods_num:1,
								goods_image_url:'../../static/img/grid2.png',
								isChecked:false,
								// 滚动条
								scrollLeft:0,
							}
						],
					},
					{
						'data':[
							{
								cart_id:3,
								goods_name:' 香奈儿可可小姐淡香水 50ml',
								goods_name2:' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
								reduce_price:16,
								goods_price:100,
								goods_num:1,
								goods_image_url:'../../static/img/grid3.png',
								isChecked:false,
								// 滚动条
								scrollLeft:0,
							}
						]
					}
				],
			noData:false,
			// 选中的商品信息
			activePro:[],
			// 记录商品是否是从店铺进入的
			storeEnter:false
		};
	},
	methods: {
		touchS(e){
			startX=e.mp.changedTouches[0].clientX;
		},
		touchE(e){
			endX=e.mp.changedTouches[0].clientX;
			// 手指滑动了
			if(Math.abs(endX-startX)>10){
				// 手指往右滑
				if(endX-startX>0){
					this.shopData.forEach((item) => {
						item.data.forEach((goods) => {
							if(goods.cart_id==e.currentTarget.id){
								goods.scrollLeft=0;
							}
						})
					})
				}else{
					// 手指往左滑
					this.shopData.forEach((item) => {
						item.data.forEach((goods) => {
							if(goods.cart_id==e.currentTarget.id){
								goods.scrollLeft=75;
							}else{
								goods.scrollLeft=0;
							}
						})
					})
				}
			}
		},
		// 单击结算
		jiesuan(){
			let str = ''
			this.activePro.forEach((item,index) => {
				str += item.cart_id+'|'+item.goods_num + ',';
			});
			str = str.substring(0,str.length-1)
			if(str) {
				// 跳转到支付页面
			} else {
				uni.showToast({
					title: '请先选择要购买的商品',
					icon:'none',
					mask: false,
					duration: 1500
				});
			}
			if(this.noData) {
				uni.showToast({
					title: '请先添加要购买的商品',
					icon:'none',
					mask: false,
					duration: 1500
				});
			}
		},
		
		// 点击选中与取消===店铺,(选中店铺的所有商品)
		shopActive(item) {
			!item.checked ? this._shopTrue(item) : this._shopFalse(item);
		},
		_shopTrue(item) {
			//遍历商店每一个商品，状态为false的改变为true，又在_checkTrue()方法中将商店状态改为true
			item.data.forEach((pro,index) => {
				pro.isChecked === false ? this._checkTrue(item,pro) : ''
			})
		},
		_shopFalse(item) {
			item.data.forEach((pro,index) => {
				pro.isChecked === true ? this._checkFalse(item,pro) : ''
			})
		},
		// 点击取消选中商品
		proActive(item,pro) {
			pro.isChecked ? this._checkFalse(item,pro) : this._checkTrue(item,pro)
		},
		_checkTrue(item,pro) {
			pro.isChecked = true;
			++item.checkedCount == item.data.length ? item.checked = true : ''
			//每选中一个商品，被选中的商品数加一，如果数值等于商品数，商店的全选状态为true
			item.checked ? ++this.allShops === this.shopData.length ? this.isCheckAll = true : this.isCheckAll = false : ''
			//当商店全选状态，每全选一个商店，被选中商店数加一，数值等于所有商店数，全选状态为true
			// 向选中数组中添加
			this.activePro.push(pro);
		},
		_checkFalse(item,pro) {
			pro.isChecked = false;
			//被选中的商品数减一
			--item.checkedCount
			if(item.checked) {
				item.checked = false
				--this.allShops 
			}
			this.isCheckAll = false;
			// 移除选中数组中的这一项
			this.activePro.forEach((active,activeIndex) => {
				if(pro.cart_id == active.cart_id) {
					this.activePro.splice(activeIndex,1);
				}
			});
		},
		// 全选
		allCheck() {
			this.isCheckAll = !this.isCheckAll;
			this.isCheckAll ? this.shopData.forEach((item) => {this._shopTrue(item)}) : this.shopData.forEach((item) => {this._shopFalse(item)})
		},
		changeCount(val,way,id) {
			let vm = this;
			if(way > 0) {
				val.goods_num++;
			} else {
				if(val.goods_num > 1) {
					val.goods_num--;
				}
			}
			// 更新购物车数量
			this.editCount(id,val.goods_num)
		},
		inputCarCount(e) {
			// console.log('e',e);
			let car_id = e.currentTarget.id;
			let goods_num = e.detail.value;
			this.editCount(car_id,goods_num)
		},
		// 调用更新购物车数量的接口
		editCount(id,goods_num) {
			
			
		},
		// 每次调用此方法，将初始值为0，便利价格并累加
		_totalPrice() {
			this.allPrice = 0;
			this.shopData.forEach(item => {
				let products = item.data;
				products.forEach(pros => {
					if(pros.isChecked) {
						this.allPrice += pros.goods_price * pros.goods_num;
					}
				});
			});
		},
		_totalCount() {
			this.allCount = 0;
			this.shopData.forEach(item => {
				this.allCount += item.checkedCount;
			});
		},
		// 删除商品
		deletePro(cart_id,store_id){
			console.log();
			console.log('购物车id',cart_id);
			let vm = this;
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				success: function (res) {
					if (res.confirm) {
						// 删除数组中的这一项
						if(vm.shopData) {
							vm.shopData.forEach((item,index)=>{
								console.log('item',item,vm.shopData);
								if(item.data) {
									item.data.forEach((ite,ind)=> {
										if(ite.cart_id == cart_id) {
											item.data.splice(ind,1);
										}
									});
								} 
								if(item.data.length == 0) {
									// 删除店铺名字
									vm.shopData.splice(index,1);
									item.store_id = 0;
									vm.isCheckAll = false;
								}
							});
						}	
						uni.showToast({
							title: '删除成功',
							mask: false,
							icon:'none',
							duration: 1500
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 请求购物车列表数据
		requestData() {
			
		},
		toProDetail(goods_id,store_id){
			
		}
	},
	components:{
		checkBox
	},
	// 单间商品的价格 x 数量
	filters:{
		totalprice(price,count) {
			console.log('当前项',price,count);
			return price * count;
		}
	},
	computed: {
		minHeight() {
			var systemInfo = uni.getSystemInfoSync();
			return `min-height:${systemInfo.windowHeight}px`;
		}
	},
	watch: { //深度监听所有数据，每次改变重新计算总价和总数
		shopData: {
			deep: true,
			handler(val, oldval) {
				this._totalPrice()
				this._totalCount()
			}
		}
	}
};
</script>

<style lang="scss">
		.numInput {
		overflow: hidden;
		float: right;
		text {
			float: left;
			color: #999;
			font-size: 45upx;
			line-height: 50upx;
			display: inline-block;
			width: 40upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			background-color: #F4F4F4;
			border-radius: 50%;
			margin-top: 8upx;
		}
		input {
			display: inline-block;
			width: 80upx;
			float: left;
			text-align: center;
			color: #999;
		}
		.numbox-disabled {
			color: #c0c0c0;
		}
	}
	
	.shoppingcar{
		background-color: #FAFAFA;
		padding-bottom: 98upx;
	}
	.shoppingcar .dianpu{
		background-color: #FFFFFF;
		margin-bottom: 20upx;
	}
	.shoppingcar .dianpu .dianpu-name{
		height: 70upx;
		box-sizing: border-box;
		padding: 20upx 32upx;
		border-bottom: 1px solid #FAFAFA;
		display: flex;
		margin-top: 1upx;
	}
	.shoppingcar .dianpu .select,
	.shoppingcar .dianpu .select-active{
		flex-shrink:0;
	}
	.shoppingcar .dianpu .dianpu-name .iconfont{
		font-size: 45upx;
		color: #FF6B94;
		line-height: 32upx;
		margin-right: 8upx;
	}
	.shoppingcar .dianpu .dianpu-name .text{
		font-size: 24upx;
		color: #333333;
		line-height: 31upx;
	}
	.shoppingcar .dianpu .shangpin{
		width: 750upx;
		padding: 22upx 32upx;
		display: flex;
		border-bottom: 1px solid #FAFAFA;
	}
	.shoppingcar .dianpu .shangpin .select,
	.shoppingcar .dianpu .shangpin .select-active{
		margin-top: 40upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info{
		display: flex;
		flex: 1;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .img{
		width: 108upx;
		height: 108upx;
		margin-right: 10upx;
		flex-shrink:0;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .img image{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 8upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info {
		width: 100%;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text{
		line-height: 34upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text .biaoqian{
		color: #FD395B;
		font-size: 26upx;
		margin-right: 10upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text .name{
		color: #333;
		font-size: 26upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text .bieming{
		color: #333;
		font-size: 20upx;
		margin: 0 6upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text .youhui{
		color: #FD395B;
		font-size: 24upx;
		float: right;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .jiage{
		font-size: 24upx;
		color: #999999;
		display: inline-block;
		font-weight: 600;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .jiage .danjia{
		color: #FD395B;
		margin-right: 10upx;
	}
	.shoppingcar .dianpu .jiesuan{
		padding: 30upx 30upx 30upx;
		color: #333333;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		box-sizing: border-box;
	}
	.shoppingcar .dianpu .jiesuan .yuefei,
	.shoppingcar .dianpu .jiesuan .zongji{
		font-size: 22upx;
		lighting-color: 40upx;
	}
	.shoppingcar .bottom-jiesuan{
		width: 100%;
		height: 98upx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		display: flex;
		box-shadow:0px 0px 4upx 0px rgba(0,0,0,0.1);
	}
	.shoppingcar .bottom-jiesuan .info{
		box-sizing: border-box;
		padding: 0 30upx;
		width: 510upx;
		font-size: 24upx;
		color: #333333;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
	}
	.shoppingcar .bottom-jiesuan .info view{
		line-height: 105upx;
	}
	.shoppingcar .bottom-jiesuan .info .select,
	.shoppingcar .bottom-jiesuan .info .select-active{
		display: inline-block;
		vertical-align: middle;
	}
	.shoppingcar .bottom-jiesuan .info text{
		line-height: 98upx;
		color: #FD395B;
	}
	.shoppingcar .bottom-jiesuan .btn{
		width: 240upx;
		line-height: 98upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		background-color: #FD395B;
	}
	/* 全选的文字 */
	.allSelectText {
		float: left;
		overflow: hidden;
		width: 150upx;
		.allText {
			float: left;
		}
	}
	.allSelectText > view:first-child {
		display: inline-block;
		float: left;
	} 
	.scrollView{
		width: 750upx;
	}
	.scrollView .viewbox{
		width: 900upx;
		display: flex;
		transition: all .2s ease-in 0s;
	}
	.scrollView .hong{
		width: 150upx;
		background-color: #FD395B;
		color: #FFFFFF;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	// 购物车没有数据提示
	.shoppingcar .car-no-data {
		width: 100%;
		height: 700upx;
		text-align: center;
		line-height: 700upx;
		color: #999;
		font-size: 30upx;
		vertical-align: middle;
		.iconfont {
			font-size: 40upx;
			margin-right: 20upx;
		}
	}
	
</style>
