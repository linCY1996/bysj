import httpRequest from '../common/api';

export default {
	//登录
	login: l => httpRequest.Get('/login', l),
	// 获取轮播图
	getLunImgs: l => httpRequest.Get('/lunimgs', l),
	
	//用户注册
	register: l => httpRequest.Get('/register', l),
	
	//忘记密码
	lostpass: l => httpRequest.Get('/updatePass', l), 
	
	//获取课程列表
	getClassList: l=> httpRequest.Get('/showMoreMsgs', l),
	
	//获取首页子级栏目得入口信息展示
	getIndexChr: l=> httpRequest.Get('/get/indexchr', l),
	
	//查询对应入口得课程信息需
	lookDetailClass: l => httpRequest.Get('/find/detailclass', l), 
	
	//加入购物车
	insertIntoCart: l => httpRequest.Get('/insertGoods/cart', l),
	
	//查询用户信息
	lookUserMsgs: l => httpRequest.Get('/look/userMsgs', l),
	
	//查询商品详情信息
	lookGoodsDetailMsgs: l => httpRequest.Get('/look/goodsDetailMsgs', l),
	
	//查询详情页底部多图展示
	lookGoodDetailArrayImgs: l =>httpRequest.Get('/look/goodsDetailArrayImgs', l),
	
	//操作收藏商品
	controlSaveGoods: l => httpRequest.Get('/control/savegoods', l),
	
	//通过用户id去查对应商品是否被收藏
	lookGoodsIsSaved: l => httpRequest.Get('/userid/looksavegoods', l),
	
	//查询指定商品得全部评价
	lookGoodsAllCommand: l=> httpRequest.Get('/look/goodscommand', l),
	
	//获取侧边栏所有信息
	getSlideAll: l => httpRequest.Get('/get/slidebar', l)
}