
<template>
	<view class="content">
		<goodsList></goodsList>
	</view>
</template>

<script>
	import goodsList from "@/components/orderStatus/orderStatus.vue"
	export default {
		components:{
			goodsList
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
	}
</style>
