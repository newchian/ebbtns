/**
 * 包含所有action creator 函数的模块
 */

const {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ,
    RECEIVE_USER_LIST
} = ActionTypes;
const {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqChatMsgList,
    reqReadChatMsg,
    reqUserList
} = API;

(global=> {
	global.Actions={};
	// 同步错误消息
	const errorMsg = (payload) => ({ type: ERROR_MSG, payload});
	// 同步成功响应
	const authSuccess = (payload) => ({ type: AUTH_SUCCESS, payload});
	// 同步接收用户
	const receiveUser = (payload) => ({type: RECEIVE_USER, payload});
	// 同步重置用户
	global.Actions.resetUser = (payload) => ({type: RESET_USER, payload});
	//同步用户列表
	const receiveUserList = (payload) => ({ type: RECEIVE_USER_LIST, payload });
	//接收消息列表的同步action
	const receiveMsgList = (payload) => ({type: RECEIVE_MSG_LIST, payload});
	// 接收消息的同步action
	const receiveMsg = (payload) => ({type: RECEIVE_MSG, payload});
	// 阅读了消息的同步action
	const msgRead = (payload) => ({type: MSG_READ, payload});

	/*
	初始化客户端socketio
	1. 连接服务器
	2. 绑定用于接收服务器返回chatMsg 的监听
	*/
	const initIo = (dispatch, userId)=> {
		const url = 'ws://127.0.0.1:8889';
		if (!io.socket) {
	    io.socket = io(url + "?userId=" + userId);
	    io.socket.on('connected', chatMsg=> {
	    	console.log("connected: " + userId + "：" + chatMsg);
	    });
	    io.socket.on('receiveMsg', (chatMsg) => {
	    	console.log("userId: ",userId);
	    	console.log("receiveMsg: ",chatMsg,);
	      console.log("receiveMsg: chatMsg.from === userId || chatMsg.to === userId：", chatMsg.from === userId || chatMsg.to === userId);
	      if (chatMsg.from === userId || chatMsg.to === userId) {
	        console.log("receiveMsg: ",'chatMsg.from === userId || chatMsg.to === userId');
	        dispatch(receiveMsg({chatMsg, userId}));//dispatch(receiveMsg({chatMsg, isToMe: chatMsg.to === userId}));
	      }
	    });
	  }
	}
	/*
	获取当前用户相关的所有聊天消息列表
	(在注册/登陆/获取用户信息成功后调用)
	*/
	async function getMsgList(dispatch, userId, connected) {
		console.log("getMsgList: connected=" + connected);
		//if(!connected){
		initIo(dispatch, userId);
    //}
    const response = await reqChatMsgList();
    const result = response.data;
    if (result.code === 0) {
        const { chatMsgs, users } = result.bo;
        dispatch(receiveMsgList({ chatMsgs, users, userId }));
    }
	}
	//global.Actions.getMsgList = getMsgList;
	/*
	发送消息的异步action
	*/
	global.Actions.sendMsg = ({ from, to, content }) => {
	    return async dispatch => {
	        io.socket.emit('sendMsg', { from, to, content });
	    };
	};
	/*
	更新读取消息的异步action
	*/
	global.Actions.readMsg = (userId) => {
	    return async (dispatch, getState) => {
	        const response = await reqReadChatMsg(userId);
	        const result = response.data;
	        if (result.code === 0) {
	            const count = result.bo;
	            const from = userId;
	            const to = getState().user.userId;
	            dispatch(msgRead({ from, to, count }));
	        }
	    };
	};
	//异步获取用户列表
	global.Actions.getUserList = (type) => {
	    return async dispatch=> {
	        const response = await reqUserList(type)
	        const result = response.data
	        if (result.code === 0) {
	            dispatch(receiveUserList(result.bo))
	        }
	    }
	}
	/*
	异步获取用户
	*/
	global.Actions.getUser = () => {
		return async dispatch=> {
			const response = await reqUser();
			const result = response.data;
			if (result.code === 0) {
				console.log("getUser: getMsgList: connected=" + result.connected);
				getMsgList(dispatch, result.bo.userId, result.connected);
				dispatch(receiveUser(result.bo));
			} else {
				dispatch(resetUser(result.msg));
			}
		}
	}
	/*
	 * 异步聊天对话框登录法
	 * 
	 */
	global.Actions.loginingDialog = ({ chatId, pwd }) => {
		if (!chatId || !pwd) {
      return errorMsg('聊天id或密码必须输入');
    }
		return async dispatch => {
			 
		};
	}
	/*
	 * 异步注册
	 */
	global.Actions.register = ({ username, password, password2, type })=> {
    // 进行前台表单验证, 如果不合法返回一个同步action 对象, 显示提示信息
    if (!username || !password || !type) {
        return errorMsg('用户名密码必须输入');
    }
    if (password !== password2) {
        return errorMsg('密码和确认密码不同');
    }
    return async dispatch=> {
        // 异步ajax 请求, 得到响应
        const response = await reqRegister({ username, password, type });
        // 得到响应体数据
        const result = response.data;
        // 如果是正确的
        if (result.code === 0) {
            // 分发成功的action
        		console.log("register: getMsgList: connected=" + result.connected);
        		getMsgList(dispatch, result.bo.userId, result.connected);
            dispatch(authSuccess(result.bo));
        } else {
            // 分发提示错误的action
            dispatch(errorMsg(result.msg));
        }
    };
	};

	/*
	 * 异步登陆
	 */
	global.Actions.login = ({ username, password })=> {
		//console.log(!username,!password);
		if (!username || !password) {
			return errorMsg('用户密码必须输入');
    }
    return async dispatch=> {
    	const response = await reqLogin({ username, password });
    	const result = response.data;
    	if (result.code === 0) {
    		console.log("login: getMsgList: connected=" + result.connected);
    		getMsgList(dispatch, result.bo.userId, result.connected);
    		dispatch(authSuccess(result.bo));
    	} else {
    		dispatch(errorMsg(result.msg));
    	}
    };
	};
	
	/*
	 * 异步更新用户
	 */
	global.Actions.updateUser = (user)=> {
	    return async dispatch=> {
	        // 发送异步ajax 请求
	        const response = await reqUpdateUser(user);
	        const result = response.data;
	        if (result.code === 0) { // 更新成功
	        	  console.log("updateUser functon:", JSON.stringify(result.bo));
	            dispatch(receiveUser(result.bo));
	        } else { // 失败
	            dispatch(resetUser(result.msg));
	        }
	    };
	};
	
})(this);




