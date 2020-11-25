/**
 * 包含多个用于生成新的状态state的浓缩器reducer函数的模块
 */

(global=> {
const {combineReducers} = Redux;
const {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} = ActionTypes;

const dialog = (state = {chatId: 'Tom1世', pwd: '123456', login: false},action)=> {
	return state;
};

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
                chatMsgs: [...state.chatMsgs, chatMsg],
                users: state.users,
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userId ? 1 : 0)
            };
	case RECEIVE_MSG_LIST:
            var { chatMsgs, users, userId } = action.payload;
            console.log("接收消息列表RECEIVE_MSG_LIST: ", chatMsgs);
            return {
                chatMsgs,
                users,
                unReadCount: chatMsgs.reduce((preTotal, msg) => { // 别人发给我的未读消息
                    return preTotal + (!msg.read && msg.to === userId ? 1 : 0)
                }, 0)
            };
	case MSG_READ:
            const { count, from, to } = action.payload;
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
  switch (action.type) {
  case AUTH_SUCCESS: // 认证成功
    const redirectTo = getRedirectPath(action.payload);
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
  default:
    return state;
  }
}

global.Reducers={};

global.Reducers.combinedReducers = combineReducers({
  user,
  dialog,
  userList,
  chat
});
})(this);

