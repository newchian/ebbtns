package com.xca.chat.websocket;

import java.util.HashMap;
import java.util.Map;

import javax.security.auth.kerberos.KerberosKey;

import org.apache.commons.lang3.time.FastDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xca.chat.dao.MessageDAO;
import com.xca.chat.pojo.Message;
import com.xca.chat.pojo.Message.MessageBuilder;
import com.xca.chat.pojo.User;
import com.xca.chat.pojo.UserData;

import cn.xca.chatr.MessageUtil;
import net.bytebuddy.asm.Advice.Exit;

@Component
public class MessageHandler extends TextWebSocketHandler {
	@Autowired
	private MessageDAO messageDAO;
	private static final ObjectMapper MAPPER = new ObjectMapper();
	private static final Map<Long, WebSocketSession> SESSIONS = new HashMap<>();
	private static int onlineCount = 0;
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Long uid = (Long) session.getAttributes().get("uid");
		System.out.println(uid);
		SESSIONS.put(uid, session);
		MessageBuilder buildr = Message.builder()
				//.from(null/*UserData.USER_MAP.get(s.getAttributes().get("uid"))*/)
				//.to(null)
				.data(getNames())
				.type(MessageUtil.TYPE_USER);
		broadcastAllUsers(buildr);
		incrCount();
	}
	private String getNames() {
		String names = "";
		if (SESSIONS.size() > 0) {
			for (Long k : SESSIONS.keySet()) {
				WebSocketSession s = SESSIONS.get(k);
				Object key = s.getAttributes().get("uid");
				//System.out.println(key);
				String username = UserData.USER_MAP.get(key).getUserName();
				names += username + ",";
			}
		}	
		//System.out.println("uids: "+names);
		return names.substring(0, names.length() - 1);
	}
	private void broadcastAllUsers(MessageBuilder builder)throws Exception {
		for (Long k : SESSIONS.keySet()) {
			WebSocketSession s = SESSIONS.get(k);
			Message message = builder
					.from(UserData.USER_MAP.get(k)/*UserData.USER_MAP.get(s.getAttributes().get("uid"))*/)
					.to(UserData.USER_MAP.get(k))
					.fromName(UserData.USER_MAP.get(k).getUserName())
					.build();
			if(message.getToName()==null){
				message.setToName(UserData.USER_MAP.get(k).getUserName());
			}
			s.sendMessage(new TextMessage(MAPPER.writeValueAsString(message)));
		}
	}
	@Override
	protected void handleTextMessage(WebSocketSession session, 
			TextMessage textMessage) throws Exception {
		Long uid = (Long) session.getAttributes().get("uid");
		JsonNode jsonNode = MAPPER.readTree(textMessage.getPayload());
		/*Long toId = jsonNode.get("toId").asLong();
		String msg = jsonNode.get("data").asText();*/
		String fromName = jsonNode.get("fromName").asText();
		String toName = jsonNode.get("toName").asText();
		String content = jsonNode.get("content").asText();
		MessageBuilder buildr = Message.builder()
				.data(content)
				.type(MessageUtil.TYPE_MESSAGE);
		// 2. 判定是否有接收人
		if (toName == null || toName.isEmpty()) {
			return;
		}
		if ("all".equals(toName)) {
			buildr.toName(toName);
			broadcastAllUsers(buildr);
		} else {
			boolean isOnline = false;
			for (Long k : SESSIONS.keySet()) {
				if(toName.equalsIgnoreCase(UserData.USER_MAP.get(k).getUserName())) {
					isOnline = true;
				}
			}
			if (isOnline) {
				for (Long k : SESSIONS.keySet()) {
					User to = UserData.USER_MAP.get(k);
					if(toName.equalsIgnoreCase(to.getUserName())||
							fromName.equalsIgnoreCase(to.getUserName())){
						WebSocketSession s = SESSIONS.get(k);
						User from = UserData.USER_MAP.get(uid);
						Message message = buildr
								.from(from)
								.to(to)
								.fromName(from.getUserName())
								.toName(to.getUserName())
								.build();
						s.sendMessage(new TextMessage(MAPPER.writeValueAsString(message)));
					}
						
				}
			}
		}
		/*Message message = Message.builder()
				.from(UserData.USER_MAP.get(uid))
				.to(UserData.USER_MAP.get(toId))
				.data(msg)
				.build();
		message = this.messageDAO.saveMessage(message);
		WebSocketSession toSession = SESSIONS.get(toId);
		if(toSession != null && toSession.isOpen()) {
			toSession.sendMessage(
					new TextMessage(MAPPER.writeValueAsString(message)));
			this.messageDAO.updateMessageState(message.getId(), 2);
		}*/
	}
	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		exception.printStackTrace();
		System.out.println("服务异常");
	}
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		decrCount();
		System.out.println("客户端关闭了一个连接 , 当前在线人数 : " + getOnlineCount());
	}
	public synchronized void incrCount() {
		onlineCount++;
	}
	public synchronized void decrCount() {
		onlineCount--;
	}
	public int getOnlineCount() {
		return onlineCount;
	}
}
