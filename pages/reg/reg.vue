<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">用户名：</text>
                <m-input type="text" focus clearable v-model="account" placeholder="请输入用户名"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">邮箱：</text>
                <m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
			<view class="input-row">
			    <text class="title">Tel：</text>
			    <m-input type="text" clearable v-model="phone" placeholder="请输入电话号码"></m-input>
			</view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">注册</button>
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
                account: '',
                password: '',
                email: '',
				phone:'',
            }
        },
        methods: {
            register() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length > 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '用户名最多5个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }
				if (!(/^1\d{10}$/).test(this.phone)) {
					uni.showToast({
					    icon: 'none',
					    title: '电话号码不合法'
					});
					return;
				}
				uni.showLoading({
					title: '注册中',
					mask: true
				});
				this.$http.register({
						username:this.account,
						pass: this.password,
						email: this.email,
						tel: this.phone
				}).then(res => {
					console.log(res);
					uni.hideLoading()
					if(res.data == '添加成功') {
						uni.showToast({
							title: '注册成功',
							icon:'none'
						});
					}else {
						uni.showToast({
							title: '注册失败',
							icon:'none'
						});
					}
				})
                // uni.showToast({
                //     title: '注册成功'
                // });
                // uni.navigateBack({
                //     delta: 1
                // });
            }
        }
    }
</script>

<style>
	.input-row .title {
		font-size: 30rpx;
		width: 23%;
	}
	.m-input-input {
		font-size: 30rpx;
	}
</style>
