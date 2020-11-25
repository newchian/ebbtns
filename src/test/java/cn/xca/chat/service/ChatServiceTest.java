package cn.xca.chat.service;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.xca.chat.dao.MessageDAO;
import com.xca.chat.pojo.Message;
import com.xca.chat.pojo.User;
import cn.hutool.core.date.DateUtil;
import io.socket.client.IO;
import io.socket.client.Socket;
import lombok.extern.slf4j.Slf4j;

@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class ChatServiceTest {
	@Autowired
	private MessageDAO messageDAO;
	@Test
	public void socketIOClientLaunch() {
		// 服务端socket.io连接通信地址
		String url = "http://127.0.0.1:8889";
		try {
			IO.Options options = new IO.Options();
			options.transports = new String[] { "websocket" };
			options.reconnectionAttempts = 2;
			// 失败重连的时间间隔
			options.reconnectionDelay = 1000;
			// 连接超时时间(ms)
			options.timeout = 500;
			// userId: 唯一标识 传给服务端存储
			final Socket socket = IO.socket(url + "?userId=1", options);

			socket.on(Socket.EVENT_CONNECT, args1 -> socket.send("hello..."));

			// 自定义事件`connected` -> 接收服务端成功连接消息
			socket.on("connected", objects -> {
				log.debug("服务端:" + objects[0].toString());
				System.out.println("来自服务端:" + objects[0].toString());
			});

			// 自定义事件`push_data_event` -> 接收服务端消息
			socket.on("push_data_event", objects -> log.debug("服务端:" + objects[0].toString()));

			// 自定义事件`myBroadcast` -> 接收服务端广播消息
			socket.on("myBroadcast", objects -> {
				log.debug("服务端：" + objects[0].toString());
				System.out.println("服务端：" + objects[0].toString());
			});

			socket.connect();

			while (true) {
				Thread.sleep(3000);
				// 自定义事件`push_data_event` -> 向服务端发送消息
				socket.emit("push_data_event", "发送数据 " + DateUtil.now());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Test
	public void testSave() {
		Message message = Message.builder()
				.id(ObjectId.get())
				.msg("你好")
				.sendDate(new Date())
				.status(1)
				.from(new User(1001L, "Tom1世"))
				.to(new User(1002L, "Tom2世"))
				.build();
		this.messageDAO.saveMessage(message);
		message = Message.builder()
				.id(ObjectId.get())
				.msg("你也好")
				.sendDate(new Date())
				.status(1)
				.to(new User(1001L, "Tom1世"))
				.from(new User(1002L, "Tom2世"))
				.build();
		this.messageDAO.saveMessage(message);
		message = Message.builder()
				.id(ObjectId.get())
				.msg("我在这写下开发即时通讯呢")
				.sendDate(new Date())
				.status(1)
				.from(new User(1001L, "Tom1世"))
				.to(new User(1002L, "Tom2世"))
				.build();
		this.messageDAO.saveMessage(message);
		message = Message.builder()
				.id(ObjectId.get())
				.msg("那很好啊!")
				.sendDate(new Date())
				.status(1)
				.to(new User(1001L, "Tom1世"))
				.from(new User(1002L, "Tom2世"))
				.build();
		this.messageDAO.saveMessage(message);
		System.out.println("ok");
	}
	@Test
	public void qureryList() {
		List<Message> list = this.messageDAO.findListByFromAndTo(1001L, 1002L, 1, 10);
		for(Message message:list)
			System.out.println(message);
	}
	@Test
	public void zsgc1() {
		
	}
}
