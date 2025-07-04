import https from './request.js';
	
//设置个对象，就不用一个个暴露了，直接暴露对象
let apiFun = {};

/* 获取列表 */
//查询列表，详情就是get
/* /api/getlist是请求接口地址，有http.js里面的Ip加上，如：http:192.168.0.1:9090//api/getlist  */
// apiFun.getActiveList = function(params) {
// 	return https.get('/api/activitys/getactivities', params)
// }
//用户注册
apiFun.register = function(params) {
	return https.post('/api/v1/user/sign/up', params)
}
//用户登录
apiFun.login = function(params) {
	return https.post('/api/v1/user/sign/in', params)
						
}
// //用户修改 这些函数是应用于各个路由的页面组件
// apiFun.userEdit = function(url,params) {
// 	console.log('进入useredit函数')
// 	return https.put('/api/v1/user/', params)
						
// }


//暴露出这个对象
export default apiFun;
