/**
 * 包含所有action 的type 常量名称的模块
 */

ActionTypes={};
// 验证成功
ActionTypes.AUTH_SUCCESS = 'AUTH_SUCCESS';
// 请求出错
ActionTypes.ERROR_MSG = 'ERROR_MSG';
//接收用户
ActionTypes.RECEIVE_USER = 'RECEIVE_USER';
// 重置用户
ActionTypes.RESET_USER = 'RESET_USER';

ActionTypes.RECEIVE_MSG_LIST = 'RECEIVE_MSG_LIST'; // 接收消息列表
ActionTypes.RECEIVE_MSG = 'RECEIVE_MSG'; // 接收一条消息
ActionTypes.MSG_READ = 'MSG_READ'; // 标识消息已阅读
ActionTypes.RECEIVE_USER_LIST = 'RECEIVE_USER_LIST';

ActionTypes.AUTH_DIALOG_SUCCESS = 'AUTH_DIALOG_SUCCESS'; // 对话验证成功
ActionTypes.OPEN_CLOSE_CHAT = 'OPEN_CLOSE_CHAT'; // 打开关闭聊天连接
ActionTypes.DISPLAY_CONNECTED_USER = 'DISPLAY_CONNECTED_USER'; // 只要有人上线就刷新用户列表
ActionTypes.UNDISPLAY_DISCONNECTED_USER = 'UNDISPLAY_DISCONNECTED_USER';	//// 只要有人下线就刷新用户列表
ActionTypes.RECEIVE_DLG = 'RECEIVE_DLG'; // 接收对话
	
	