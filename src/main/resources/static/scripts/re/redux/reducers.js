/**
 * 包含多个用于生成新的状态state的浓缩器reducer函数的模块
 */

(global=> {
const { combineReducers } = Redux;
const {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ,
  AUTH_DIALOG_SUCCESS,
  OPEN_CLOSE_CHAT,
  DISPLAY_CONNECTED_USER,
  UNDISPLAY_DISCONNECTED_USER,
  RECEIVE_DLG
} = ActionTypes;

/*const dialog = (state = {chatId: 'Tom1世', pwd: '123456', login: false},action)=> {
	return state;
};*/

const initUser = {
	//userId: '', // 用户id
	username: '', // 用户名
  type: '', // 类型
  msg: '', // 错误提示信息
  redirectTo: '' // 需要自动跳转的路由path
};

//初始chat 对象
const initChat = {
    chatMsgs: [], // 消息数组[{from: id1, to: id2}{}]
    users: {}, // 所有用户的集合对象{id1: user1, id2: user2}
    unReadCount: 0 // 未读消息的数量
};

const initUserList = [];

//管理聊天相关信息数据的reducer
function chat(state = initChat, action) {
	switch (action.type) {
	case RECEIVE_MSG:
            var { chatMsg, userId } = action.payload;
            console.log("chat的RECEIVE_MSG case: ", chatMsg);
            return {
                chatMsgs: [ ...state.chatMsgs, chatMsg ],
                users: state.users,
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userId ? 1 : 0)
            };
	case RECEIVE_MSG_LIST:
            var { chatMsgs, users, userId, msgType, names } = action.payload;
            console.log("接收消息列表RECEIVE_MSG_LIST: ", chatMsgs);
            return {
                chatMsgs,
                users,
                msgType,
                names,
                dialogArr: [],
                unReadCount: chatMsgs.reduce((preTotal, msg) => { // 别人发给我的未读消息
                    return preTotal + (!msg.read && msg.to === userId ? 1 : 0)
                }, 0)
            };
	case MSG_READ:
						var { count, from, to } = action.payload;
            return {
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        // msg.read = true // 不能直接修改状态
                        return { ...msg, read: true }
                    } else {
                        return msg
                    }
                }),
                users: state.users,
                unReadCount: state.unReadCount - count
            };
	case DISPLAY_CONNECTED_USER:
  	return { ...state, names: [ ...state.names, action.payload ] };
	case UNDISPLAY_DISCONNECTED_USER:
		return { ...state, names: state.names.filter(e=> e !== action.payload) };
	case RECEIVE_DLG:
		console.log("接收对话: " + action.payload);
		var { /*content,*/from } = action.payload;
		// 只要在前面的状态里提供dialogArr这个数组那么这一次就不会出现Uncaught TypeError: state.dialogArr is not iterable了。
		return { ...state, /*...action.payload,*/from, dialogArr: [ ...state.dialogArr, action.payload ] };//state.dialogArr is not iterable
	default:
    return state;
	}
}

function userList(state = initUserList, action) {
  switch (action.type) {
  case RECEIVE_USER_LIST:
  	console.log("接收用户列表RECEIVE_USER_LIST: ", action.payload);
    return action.payload;
  default:
    return state;
  }
}

function user(state = initUser, action) {
	let redirectTo;
	switch (action.type) {  
  case AUTH_SUCCESS: // 认证成功
    redirectTo = getRedirectPath(action.payload);
    console.log("认证成功: ", { ...action.payload, redirectTo });
    return { ...action.payload, redirectTo };
  case ERROR_MSG: // 错误信息提示
  	console.log("错误信息提示: ",{ ...state, msg: action.payload });
    return { ...state, msg: action.payload };
  case RECEIVE_USER: // 接收用户
  	console.log("接收用户: ", action.payload);
    return action.payload;
  case RESET_USER: // 重置用户
  	console.log("重置用户: ", { ...initUser, msg: action.payload });
    return { ...initUser, msg: action.payload };
  case AUTH_DIALOG_SUCCESS: // 对话认证成功
  	redirectTo = "/dialog";
  	return { ...action.payload, redirectTo };
  case OPEN_CLOSE_CHAT: // 打开聊天连接了
  	return { ...state, online: action.payload };
  default:
    return state;
  }
}

global.Reducers={};

global.Reducers.combinedReducers = combineReducers({
  user,
  //dialog,
  userList,
  chat
});
})(this);

