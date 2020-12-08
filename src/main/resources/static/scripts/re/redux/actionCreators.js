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
    RECEIVE_USER_LIST,
    AUTH_DIALOG_SUCCESS,
    OPEN_CLOSE_CHAT,
    DISPLAY_CONNECTED_USER,
    UNDISPLAY_DISCONNECTED_USER,
    RECEIVE_DLG
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
	const authDialogSuccess = (payload) => ({type: AUTH_DIALOG_SUCCESS, payload});
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
	    	console.log("connected: OPEN_CHAT:" + OPEN_CLOSE_CHAT);
	    	dispatch({ type: OPEN_CLOSE_CHAT,  payload: true });
	    });
	    io.socket.on('disconnected', chatMsg=> {
	    	console.log("disconnected: " + userId + "：" + chatMsg);	    	
	    	//console.log("disconnected: CLOSE_CHAT:" + OPEN_CLOSE_CHAT);
	    	//dispatch({ type: OPEN_CLOSE_CHAT,  payload: false });
	    	undisplayUser();
	    });
	    io.socket.on('stop', chatMsg=> {
	    	console.log("stop: " + userId + "：" + chatMsg);	    	
	    	//console.log("stop: CLOSE_CHAT:" + OPEN_CLOSE_CHAT);
	    	//dispatch({ type: OPEN_CLOSE_CHAT,  payload: false });
	    	undisplayUser();
	    });
	    io.socket.on('displayConnectedUser', chatMsg=> {
	    	console.log("displayConnectedUser: " + userId + "：" + chatMsg);	    	
	    	dispatch({ type: DISPLAY_CONNECTED_USER,  payload: chatMsg });
	    });
	    io.socket.on('undisplayDisconnectedUser', chatMsg=> {
	    	console.log("undisplayDisconnectedUser: " + userId + "：" + chatMsg);	    	
	    	dispatch({ type: UNDISPLAY_DISCONNECTED_USER,  payload: chatMsg });
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
	    //好像这些onxxxx方法都是侦听客户端事件的而不是侦听服务器端事件的上述这些io.socket.on方法才是服务器端发生的事件的
	    io.socket.onopen = ()=> {
	    	console.log("io.socket.onopen: OPEN_CHAT:" + OPEN_CLOSE_CHAT);
	    	dispatch({ type: OPEN_CLOSE_CHAT,  payload: true });
	    };
	    //io.socket.onconnect = io.socket.onopen;
	    const undisplayUser = ()=> {//这个方法是侦听程序退出（页面卸载）过程中发生的事件的
	    	console.log("undisplayUser");
	    	io.socket.emit('undisplayUser', userId);
	    	dispatch({ type: OPEN_CLOSE_CHAT,  payload: false });
	    	io.socket.disconnect();
	    };
	    //io.socket.ondisconnect = undisplayUser;
	    document.body.onunload = undisplayUser;
	    io.socket.on('receiveDialog', (chat) => {
	    	dispatch({type: RECEIVE_DLG, payload: chat});
	    });
	  }
	}
	/*
	获取当前用户相关的所有聊天消息列表
	(在注册/登陆/获取用户信息成功后调用)
	*/
	async function getMsgList(dispatch, userId, connected, msgType='msg') {
		//console.log("getMsgList: connected=" + connected);
		console.log("getMsgList: msgType=" + msgType);
		//if(!connected){
		initIo(dispatch, userId);
    //}
    const response = await reqChatMsgList(userId, msgType);
    const result = response.data;
    if (result.code === 0) {
        const { chatMsgs, users, msgType } = result.bo;
        const { names } = result;
        dispatch(receiveMsgList({ chatMsgs, users, userId, msgType, names }));
    }
	}
	global.Actions.sendDialog = (chat)=> {//聊天对象
		return async dispatch => {
      io.socket.emit('sendDialog', chat);
		};
	}
	//global.Actions.getMsgList = getMsgList;
	/*
	发送消息的异步action
	*/
	global.Actions.sendMsg = ({ from, to, content })=> {
	    return async dispatch => {
	        io.socket.emit('sendMsg', { from, to, content });
	    };
	};
	/*
	更新读取消息的异步action
	*/
	global.Actions.readMsg = (fromId,toId) => {
	    return async (dispatch, getState) => {
	        const response = await reqReadChatMsg(fromId,toId);
	        const result = response.data;
	        if (result.code === 0) {
	            const count = result.bo;
	            const from = fromId;
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
	global.Actions.getUser = (userId) => {
		return async dispatch=> {
			const response = await reqUser(userId);
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
	global.Actions.loginingDialog = ({ username, password }) => {
		if (!username || !password) {
      return errorMsg('聊天id或密码必须输入');
    }
		return async dispatch => {
			const response = await reqLogin({ username, password });
    	const result = response.data;
    	if (result.code === 0) {
    		console.log("Actions.loginingDialog: result.code === 0：result.bo.userId：" + result.bo.userId);
    		getMsgList(dispatch, result.bo.userId, result.connected,'user');
    		dispatch(authDialogSuccess({...result.bo, names: result.names}));
    	} else {
    		dispatch(errorMsg(result.msg));
    	}
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




