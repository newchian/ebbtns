package cn.xca.socketio.server.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;

import cn.hutool.core.date.DateUtil;
import cn.xca.entity.cecezhipin.Chat;
import cn.xca.repository.cecezhipin.ChatRepository;
import cn.xca.socketio.server.service.ISocketIOService;
import lombok.extern.slf4j.Slf4j;

/**
 * <p>
 * socket.io服务实现类
 * </p>
 *
 */
@Slf4j
@Service(value = "socketIOService")
public class SocketIOServiceImp implements ISocketIOService {
	/**
	 * 存放已连接的客户端
	 */
	public static Map<String, SocketIOClient> clientMap = new ConcurrentHashMap<>();
	/**
	 * 自定义事件`push_data_event`,用于服务端与客户端通信
	 */
	private static final String PUSH_DATA_EVENT = "push_data_event";
	private static final String SEND_MESSAGE = "sendMsg";
	private static final String RECEIVE_MSG = "receiveMsg";
	@Autowired
	private SocketIOServer socketIOServer;
	@Autowired
	private ChatRepository chatRepository;
	/**
	 * Spring IoC容器创建之后，在加载SocketIOServiceImpl Bean之后启动
	 */
	@PostConstruct
	private void autoStartup() {
		start();
	}
	/**
	 * Spring IoC容器在销毁SocketIOServiceImpl Bean之前关闭,避免重启项目服务端口占用问题
	 */
	@PreDestroy
	private void autoStop() {
		stop();
	}
	@Override
	public void start() {
		// 监听客户端连接
		socketIOServer.addConnectListener(client -> {
			log.debug("************ 客户端： " + getIpByClient(client) + " 已连接 ************");
			// 自定义事件`connected` -> 与客户端通信 （也可以使用内置事件，如：Socket.EVENT_CONNECT）
			client.sendEvent("connected", "你成功连接上了哦...");
			String userId = getParamsByClient(client);
			if (userId != null) {
				System.out.println("连接时从客户端传来的userId：" + userId);
				clientMap.put(userId, client);
			}
			System.out.println("已维护的客户端：");
			clientMap.values().forEach(System.out::println);
			//连接时从客户端传来的userId：5fb3edd5033e604156053092
			//已维护的客户端：
			//com.corundumstudio.socketio.transport.NamespaceClient@f4f29cc
			//连接时从客户端传来的userId：5fb4cfcef08edd7bb0e30078
			//已维护的客户端：
			//com.corundumstudio.socketio.transport.NamespaceClient@37976885
			//com.corundumstudio.socketio.transport.NamespaceClient@3ef58c
			//com.corundumstudio.socketio.transport.NamespaceClient@7c6f78a4
			//com.corundumstudio.socketio.transport.NamespaceClient@7c6f78a4
			// 自定义事件`client_info_event` -> 监听客户端消息
			//在此调用socketIOServer.addEventListener会产生钉子虫仔
			/*
			 * 调用socketIOServer.addEventListener时socketIOServer保存的是事件处理器函数实例而不是
			 * 客户端，函数实例每次回调时都接收一个客户端，它有可能相同有可能不同。之前放在这个函数体内造成每次连
			 * 接时都创建一个新的事件处理器函数实例，从而导致一次事件被多个处理器处理，也就是说将接收消息事件广播
			 * 了多次！
			 */
		});
		socketIOServer.addEventListener(SEND_MESSAGE, Chat.class, (client2, data, ackSender) -> {// 所有回调函数实例接收不同(相同也是有可能的)的客户端相同的数据。
			// 客户端推送`client_info_event`事件时，onData接收object类型数据。
			String fromId = data.getFrom();
			if (fromId != null && !clientMap.containsKey(fromId)) {
				System.out.println("本次事件发生时从客户端传递给所有回调函数实例的同一个userId：" + fromId);
				clientMap.put(fromId, client2);
			}
			System.out.println("客户端数目：" + clientMap.size());
			System.out.println("keySet()：");
			clientMap.keySet().forEach(System.out::println);
			System.out.println("values()：");
			clientMap.values().forEach(System.out::println);
			String clientIp = getIpByClient(client2);
			log.debug(clientIp + " ************ 客户端：" + data);
			System.out.println(clientIp + " ************ 来自客户端：" + data);
			System.out.println(" ************ 连接时来自客户端的userId：" + getParamsByClient(client2));
			List<String> l = Arrays.asList(data.getFrom(), data.getTo()).stream().peek(System.out::println).sorted()
					.peek(System.out::println).collect(Collectors.toList());
			String msgId = String.join("_", l);
			long createTime = DateUtil.currentSeconds();
			Chat chat = new Chat(null, msgId, data.getFrom(), data.getTo(), data.getContent(), data.isRead(), createTime);
			Chat saved = chatRepository.save(chat);
			if (saved != null) {
				// 保存完成后, 向所有连接的客户端发送消息
				socketIOServer.getBroadcastOperations().sendEvent(RECEIVE_MSG, saved);// 全局发送,
																																							// 所有连接的客户端都可以收到
				log.debug(clientIp + " ************ 服务器向所有连接的客户端发送消息：" + saved);
				System.out.println(clientIp + " ************ 发自服务器：" + saved);
			}
		});
		// 监听客户端断开连接
		socketIOServer.addDisconnectListener(client -> {
			String clientIp = getIpByClient(client);
			log.debug(clientIp + " *********************** " + "客户端已断开连接");
			System.out.println(clientIp + " *********************** " + "客户端已断开连接");
			String userId = getParamsByClient(client);
			if (userId != null) {
				clientMap.remove(userId);
				client.disconnect();
				//java.lang.UnsupportedOperationException: null
			  //UnmodifiableCollection
				//socketIOServer.getAllClients().remove(client);
//				System.out.println(" ***********************null前：");
//				socketIOServer.getAllClients().stream().peek(System.out::println).forEach(c->{
//					if(c.equals(client))
//						c=null;
//				});
//				System.out.println(" ***********************null后：");
//				socketIOServer.getAllClients().stream().peek(System.out::println);
				System.out.println("socketIOServer.getAllClients()：");
				socketIOServer.getAllClients().stream().peek(System.out::println);	
			}			
		});
		// 自定义事件`client_info_event` -> 监听客户端消息
		socketIOServer.addEventListener(PUSH_DATA_EVENT, String.class, (client, data, ackSender) -> {
			// 客户端推送`client_info_event`事件时，onData接受数据，这里是string类型的json数据，还可以为Byte[],object其他类型
			String clientIp = getIpByClient(client);
			log.debug(clientIp + " ************ 客户端：" + data);
			System.out.println(clientIp + " ************ 客户端：" + data);
		});
		// 自定义事件`client_info_event` -> 监听客户端消息
		socketIOServer.addEventListener(PUSH_DATA_EVENT, String.class, (client, data, ackSender) -> {
			// 客户端推送`client_info_event`事件时，onData接受数据，这里是string类型的json数据，还可以为Byte[],object其他类型
			String clientIp = getIpByClient(client);
			log.debug(clientIp + " ************ 客户端：" + data);
			System.out.println(clientIp + " ************ 客户端：" + data);
		});

		// 启动服务
		socketIOServer.start();
		// broadcast: 默认是向所有的socket连接进行广播，但是不包括发送者自身，如果自己也打算接收消息的话，需要给自己单独发送。
		new Thread(() -> {
			int i = 0;
			while (true) {
				try {
					// 每3秒发送一次广播消息
					Thread.sleep(3000);
					socketIOServer.getBroadcastOperations().sendEvent("myBroadcast", "广播消息 " + DateUtil.now());
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}).start();
	}
	@Override
	public void stop() {
		if (socketIOServer != null) {
			socketIOServer.stop();
			socketIOServer = null;
		}
		System.out.println("socketIOServer*********************** " + "服务器已停止");
	}
	@Override
	public void pushMessageToUser(String userId, String msgContent) {
		SocketIOClient client = clientMap.get(userId);
		if (client != null) {
			client.sendEvent(PUSH_DATA_EVENT, msgContent);
		}
	}
	/**
	 * 获取客户端url中的userId参数（这里根据个人需求和客户端对应修改即可）
	 *
	 * @param client:
	 *          客户端
	 * @return: java.lang.String
	 */
	private String getParamsByClient(SocketIOClient client) {
		// 获取客户端url参数（这里的userId是唯一标识）
		Map<String, List<String>> params = client.getHandshakeData().getUrlParams();
		List<String> userIdList = params.get("userId");
		if (!CollectionUtils.isEmpty(userIdList)) {
			return userIdList.get(0);
		}
		return null;
	}
	/**
	 * 获取连接的客户端ip地址
	 *
	 * @param client:
	 *          客户端
	 * @return: java.lang.String
	 */
	private String getIpByClient(SocketIOClient client) {
		String sa = client.getRemoteAddress().toString();
		String clientIp = sa.substring(1, sa.indexOf(":"));
		return clientIp;
	}
}
