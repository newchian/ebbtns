/**
 * 对话消息列表构件
 */

(global=> {

const {connect} = ReactRedux;

class Message extends React.Component {
	/*
	得到所有聊天的最后msg 组成的数组
	[msg1, msg2, msg3..]
	// 1. 使用{}进行分组(chat_id), 只保存每个组最后一条msg: {chat_id1: lastMsg1, chat_id2:
	lastMsg2}
	// 2. 得到所有分组的lastMsg 组成数组: Object.values(lastMsgsObj) [lastMsg1, lastMsg2]
	// 3. 对数组排序(createTime, 降序)
	*/
	static getLastMsgs(chatMsgs, userId) {
    // 1. 使用{}进行分组(msgId), 只保存每个组最后一条msg: {chat_id1: lastMsg1,chat_id2: lastMsg2}
		console.log("getLastMsgs:userId=" + userId);
		const lastMsgsObj = {};
    chatMsgs.forEach(msg=> {
        msg.unReadCount = 0;
        // 判断当前msg 对应的lastMsg 是否存在
        const chatId = msg.msgId;
        const lastMsg = lastMsgsObj[chatId];
        // 不存在
        if (!lastMsg) {
            // 将msg 保存为lastMsg
            lastMsgsObj[chatId] = msg;
            // 别人发给我的未读消息
            console.log("!msg.read && userId === msg.to=" + !msg.read && userId === msg.to);
            if (!msg.read && userId === msg.to) {
                // 指定msg 上的未读数量为1
                msg.unReadCount = 1;
                console.log("msg.unReadCount=" + msg.unReadCount);
            }
        } else {// 存在
            // 如果msg 的创建时间晚于lastMsg 的创建时间, 替换
            if (msg.createTime > lastMsg.createTime) {
                lastMsgsObj[chatId] = msg;
                // 将原有保存的未读数量保存到新的lastMsg
                msg.unReadCount = lastMsg.unReadCount;
            }
            // 别人发给我的未读消息
            if (!msg.read && userId === msg.to) {
                // 指定msg 上的未读数量为1
                msg.unReadCount++;
            }
        }
    })
    // 2. 得到所有分组的lastMsg 组成数组: Object.values(lastMsgsObj) [lastMsg1, lastMsg2]
    const lastMsgs = Object.values(lastMsgsObj);
    // 3. 对数组排序(createTime, 降序)
    lastMsgs.sort(function (msg1, msg2) {
        return msg2.createTime - msg1.createTime;
    })
    return lastMsgs;
	}
	render() {
		return JSXRegistry.renderingMessage.bind(this)();
	}
}

global.Message = connect(
	state=> ({//将状态映射成属性
		user: state.user,
    chat: state.chat
	})
	//没有将分发映射成属性
)(Message);

})(this);

