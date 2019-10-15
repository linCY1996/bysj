let host = 'http://127.0.0.1:6933/api' //演示服

var httpRequest = {
	//post请求 url：请求路径，请求header，params请求参数，app全局变量
	Post: function(url, params, header, app) {
		let promise = new Promise(function(resolve, reject) {
			wx.request({
				url: host+url,
				data: params,
				header:header,
				method: 'POST',
				success: function(res) {
					//自行处理返回结果
					resolve(res);
				},
				fail:function(err){
					reject(err)
				}
			})
		});
		return promise;
	},
	//get请求
	Get: function(url, params, app) {
		let promise = new Promise(function(resolve, reject) {
			wx.request({
				url: host+url,
				data: params,
				method: 'GET',
				success: function(res) {
					//返回结果自行处理
					resolve(res);

				},
				fail:function(err){
					reject(err)
				}	
			})
		});
		return promise;
	}


}

export default httpRequest