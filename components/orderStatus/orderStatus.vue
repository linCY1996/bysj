<template>
	<section class="aui-flexView">
		<section class="aui-scrollView">
			<div class="aui-tab" data-ydui-tab>
				<div class="divHeight"></div>
				<div class="tab-panel">
					<block v-for="(menuList,index2) in menuLists" :key="index2">
						<div :class="[currentTab==index2 ? 'tab-panel-item tab-active' : 'tab-panel-item']">
							<block v-for="(menuList2,index3) in menuList" :key="index3">
								<div class="tab-item">
									<a href="javascript:void(0);" class="aui-well-item aui-well-item-clear">
										<div class="aui-well-item-hd">
											<img :src="menuList2.logoimg" alt="">
										</div>
										<div class="aui-well-item-bd">
											<h3>{{menuList2.dname}}</h3>
										</div>
										<span class="aui-well-item-fr">{{menuList2.zt}}</span>
									</a>
									<div class="aui-mail-product">
										<a href="javascript:;" class="aui-mail-product-item">
											<div class="aui-mail-product-item-hd">
												<img :src="menuList2.img" alt="">
											</div>
											<div class="aui-mail-product-item-bd">
												<p>{{menuList2.name}}</p>
											</div>
										</a>
									</div>
									<a href="javascript:;" class="aui-mail-payment">
										<p>
											共{{menuList2.sum}}件商品 实付款: ￥{{menuList2.pri}}
										</p>
									</a>
									<div class="aui-mail-button">
										<a href="javascript:;" :class="[menuList2.but_ddshouhuo==0 ? 'hd' : menuList2.but_ddshouhuo==2 ? '' :'aui-df-color']">等待收货</a>
										<a href="javascript:;" :class="[menuList2.but_wuliu==0 ? 'hd' : menuList2.but_wuliu==2 ? '' :'aui-df-color']">查看物流</a>
										<a href="javascript:;" :class="[menuList2.but_rebuy==0 ? 'hd' : menuList2.but_rebuy==2 ? '' :'aui-df-color']">再次购买</a>
										<a href="javascript:;" :class="[menuList2.but_pingjia==0 ? 'hd' : menuList2.but_pingjia==2 ? '' :'aui-df-color']">评价晒单</a>
										<a href="javascript:;" :class="[menuList2.but_fapiao==0 ? 'hd' : menuList2.but_fapiao==2 ? '' :'aui-df-color']">查看发票</a>
										<a href="javascript:;" :class="[menuList2.but_zhifu==0 ? 'hd' : menuList2.but_zhifu==2 ? '' :'aui-df-color']">去支付</a>
									</div>
								</div>
								<div :class="[index3+1==menuList.length ? 'hd':'divHeight']"></div>
							</block>
						</div>
					</block>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				menuLists: [
					[{
							"logoimg": '../../static/img/icon-logo.png',
							"dname": "自营Apple产品专营店",
							"zt": "已取消",
							"img": '../../static/img/pd-001.png',
							"name": "Apple 苹果 iPhone8 Plus 4G手机 深空灰 移动联通版64G裸机Apple 苹果 iPhone8 Plus 4G手机 深空灰 移动联通版64G裸机",
							"sum": "1",
							"pri": "6899.00",
							// 0=没有,1=有,2=标红
							"but_rebuy": 2,
							"but_pingjia": 1,
							"but_fapiao": 1,
							"but_zhifu": 0,
							"but_wuliu": 0,
							"but_ddshouhuo": 0,
						},
						{
							"logoimg": '../../static/img/icon-logo.png',
							"dname": "自营Apple产品专营店",
							"zt": "已取消",
							"img": '../../static/img/pd-002.png',
							"name": "Apple 苹果 iPhone8 Plus 4G手机 深空灰 移动联通版64G裸机Apple 苹果 iPhone8 Plus 4G手机 深空灰 移动联通版64G裸机",
							"sum": "1",
							"pri": "3899.00",
							"but_rebuy": 2,
							"but_pingjia": 0,
							"but_fapiao": 0,
							"but_zhifu": 0,
							"but_wuliu": 0,
							"but_ddshouhuo": 0,
						},
						{
							"logoimg": '../../static/img/icon-logo.png',
							"dname": "自营Apple产品专营店",
							"zt": "已取消",
							"img": '../../static/img/pd-003.png',
							"name": "Apple 苹果 iPhone8 Plus 4G手机 深空灰 移动联通版64G裸机Apple 苹果 iPhone8 Plus 4G手机 深空灰 移动联通版64G裸机",
							"sum": "1",
							"pri": "4899.00",
							"but_rebuy": 2,
							"but_pingjia": 1,
							"but_fapiao": 0,
							"but_zhifu": 0,
							"but_wuliu": 0,
							"but_ddshouhuo": 0,
						},
					]
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	@import '../../static/style/style.css';
</style>
