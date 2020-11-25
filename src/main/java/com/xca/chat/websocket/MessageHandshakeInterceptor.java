package com.xca.chat.websocket;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Component
public class MessageHandshakeInterceptor implements HandshakeInterceptor {

	@Override
	public boolean beforeHandshake(ServerHttpRequest request, 
			ServerHttpResponse response, 
			WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		String path = request.getURI().getPath();
		String[] ss = StringUtils.split(path, '/');
		System.out.println(ss[1]);
		if(ss.length != 2)
			return false;
		if(!StringUtils.isNumeric(ss[1]))
			return false;		
		attributes.put("uid", Long.valueOf(ss[1]));
		return true;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, 
			ServerHttpResponse response, 
			WebSocketHandler wsHandler,
			Exception exception) {
		// TODO Auto-generated method stub
		
	}

}
