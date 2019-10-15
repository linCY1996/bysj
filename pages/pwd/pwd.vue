<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row">
                <text class="title" style="width: 41%;">邮箱：</text>
                <m-input type="text" focus clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
			<view class="input-row">
			    <text class="title" style="width: 41%;">新密码：</text>
			    <m-input type="password" focus clearable v-model="pass" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row">
			    <text class="title" style="width: 41%;">重新输入：</text>
			    <m-input type="password" focus clearable v-model="passagain" placeholder="再次输入"></m-input>
			</view>
        </view>

        <view class="btn-row">
            <button type="primary" class="primary" @tap="findPassword">提交</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                email: '',
				pass:'', 
				passagain:''
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
				this.$http.lostpass({
					email:this.email,
					pass:this.pass,
					passagain:this.passagain
				}).then(res => {
					console.log("res", res);
					uni.showToast({
					    icon: 'none',
					    title: res.data,
					    duration: 3000
					});
					if (res.data == '修改成功') {
						uni.navigateTo({
							url: '../login/login'
						});
					}
				})
                
            }
        }
    }
</script>

<style>

</style>
