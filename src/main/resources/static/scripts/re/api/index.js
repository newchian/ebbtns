/**
 * 包含n 个接口请求函数的模块每个函数返回的都是promise 对象
 */

((global,host)=> {
	global.API={};
	// 请求注册
	global.API.reqRegister = (user) => ajax(host+'/register', user, 'POST');
	// 请求登陆
	global.API.reqLogin = (user) => ajax(host+'/login', user, 'POST');
	global.API.reqUpdateUser = (user) => ajax(host+'/update', user, 'POST');
	global.API.reqUser = () => ajax('/getuser');
	//请求获取用户列表
	global.API.reqUserList = (type) => ajax('/userlist', {type});
	// 请求获取当前用户的所有聊天记录
	global.API.reqChatMsgList = () => ajax('/msglist')
	// 标识查看了指定用户发送的聊天信息
	global.API.reqReadChatMsg = (from) => ajax('/readmsg', {from}, 'POST')
})(this,'http://localhost:8081');


