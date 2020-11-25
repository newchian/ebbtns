package cn.xca.controller.cecezhipin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cn.xca.entity.cecezhipin.Chat;
import cn.xca.entity.cecezhipin.User;
import cn.xca.repository.cecezhipin.ChatRepository;
import cn.xca.service.cecezhipin.UserService;
import static cn.xca.socketio.server.service.impl.SocketIOServiceImp.*;

@RestController
public class AuthController {
	@Autowired
	private UserService userService;
	private String userIdCookie;
	@Autowired
	private ChatRepository chatRepository;
	@PostMapping("/readmsg")
	public Map<Object, Object> readMsg(@RequestBody Chat chat, 
			HttpServletRequest request) {
		chat.setTo((String) request.getServletContext().getAttribute("userId"));
		chat.setRead(false);
		ExampleMatcher matcher = ExampleMatcher.matchingAll()
				.withMatcher("from",ExampleMatcher.GenericPropertyMatchers.caseSensitive())//不要发送人这个条件行不行？
				.withMatcher("to",ExampleMatcher.GenericPropertyMatchers.caseSensitive())
				.withIgnorePaths("chatId", "msgId", "content", "createTime"); 
		System.out.println("/readmsg：***************************************");
		System.out.println("条件：" + chat);
		List<Chat> deleteds = chatRepository.findAll(Example.of(chat, matcher));
		List<Chat> updateds = deleteds.stream().map(c-> new Chat(c.getChatId(),c.getMsgId(),c.getFrom(),c.getTo(),
				c.getContent(),true,//更新为指定的值也就是已读
				c.getCreateTime())
		).peek(System.out::println).collect(Collectors.toList());
		chatRepository.deleteAll(deleteds);
		List<Chat> saveds = chatRepository.saveAll(updateds);
		Map<Object, Object> result = new HashMap<>();
		result.put("code", 0);
		result.put("bo", saveds.size());// 更新的数量
		System.out.println("bo：saveds.size()=" + saveds.size());
		return result;		
	}
	@GetMapping("/msglist")
	public Map<Object, Object> msgList(HttpServletRequest request) {
		String userId = (String) request.getServletContext().getAttribute("userId");
		List<User> userList = userService.find();
		Map<Object, Object> result = new HashMap<>();
		Map<Object, Object> bo = new HashMap<>();
		Map<Object, Object> users = new HashMap<>();
		System.out.println("/msglist=************************************************");
		userList.forEach(u-> {
			Map<Object, Object> nameHeader = new HashMap<>();
			nameHeader.put("username", u.getUsername());
			nameHeader.put("header", u.getHeader());
			users.put(u.getUserId(), nameHeader);
			System.out.println("user=" + u);
		});
		Chat probe = new Chat();
		probe.setFrom(userId);
		probe.setTo(userId);
		ExampleMatcher matcher = ExampleMatcher.matchingAny()
				.withMatcher("from",ExampleMatcher.GenericPropertyMatchers.ignoreCase())
				.withMatcher("to",ExampleMatcher.GenericPropertyMatchers.ignoreCase())
				.withIgnorePaths("chatId", "content","read","createTime"); 
		List<Chat> chatMsgs = chatRepository.findAll(Example.of(probe, matcher));
		chatMsgs.forEach(m-> {
			System.out.println("Msg=" + m);
		});
		bo.put("users", users);
		bo.put("chatMsgs", chatMsgs);
		result.put("code", 0);
		result.put("bo", bo);
		return result;		
	}
	@GetMapping("/userlist")
	public Map<Object, Object> userList(String type) {
		List<User> users = userService.findByType(type);
		Map<Object, Object> result = new HashMap<>();
		System.out.println("/userlist:***************************");
		result.put("code", 0);
		result.put("bo", users.stream().map(u->{
			u.setPassword("");
			return u;
		}).peek(System.out::println).collect(Collectors.toList()));
		return result;		
	}
	@GetMapping("/getuser")
	public Map<Object, Object> user(HttpServletRequest request) {
		Map<Object, Object> result = new HashMap<>();
		String userId = (String) request.getServletContext().getAttribute("userId");
		if(userId == null) {
			result.put("code", 1);
			result.put("msg", "请先登陆");
			return result;
		}
		User user = userService.findById(userId);
		user.setPassword("");
		result.put("code", 0);
		result.put("bo", user);
		result.put("connected", connected(userId));
		return result;
	}
	private boolean connected(String userId) {
		if(clientMap.containsKey(userId))
			return true;
		else
			return false;
	}
	@PostMapping("/update")
	public Map<Object, Object> update(@RequestBody User user, 
			HttpServletRequest request,HttpServletResponse response) {
		Map<Object, Object> map = new HashMap<>();
		//String userId = response.getHeader("Set-Cookie");
		//System.out.println("userId:"+userId);
		System.out.println("/update: userIdCookie: "+userIdCookie);
		//Cookie hit = request.getCookies()[0];
		//String userId = (String) request.getSession().getAttribute("userId");
		String userId = (String) request.getServletContext().getAttribute("userId");
		if(userId == null){
			map.put("code", 1);
			map.put("msg", "请先登陆");
			return map;
		}
		User result = userService.update(userId, user)/*userService.update(hit.getValue(), user)*/;
		if(result!=null) {
			map.put("code", 0);  //钉子虫仔
			map.put("bo", result);
		}
		System.out.println("/update: map.get(\"code\"): "+map.get("code"));
		System.out.println("/update: map.get(\"bo\"): "+map.get("bo"));
		return map;
	}
	@PostMapping("/login")
	public Map<Object, Object> login(@RequestBody User user, 
			/*@CookieValue(name="hitCounter",defaultValue="0")Long hitCounter, */
			HttpServletRequest req,
			HttpServletResponse response) {
		Map<Object, Object> map = new HashMap<>();		
		User user2 = userService.findByUsernameAndPassword(user.getUsername(),
				DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
		if(user2!=null) {
			//hitCounter++;
			System.out.println("/login: user2=" + user2);
			System.out.println("/login: pre:req.getServletContext().getAttribute(\"userId\")" + req.getServletContext().getAttribute("userId"));
			String userId = user2.getUserId();
			req.getServletContext().setAttribute("userId",userId);
			System.out.println("/login: post:req.getServletContext().getAttribute(\"userId\")" + req.getServletContext().getAttribute("userId"));
			Cookie hit = new Cookie("userId",userId.toString());
			hit.setMaxAge(1000 * 60 * 60 * 24 * 7);
			response.addCookie(hit);
			map.put("code", 0);
			user2.setPassword("");
			map.put("bo", user2);
			map.put("connected", connected(userId));
			System.out.println("/login:" + userId + "=>" + clientMap.get(userId));
			System.out.println("/login:clientMap.keySet():");
			clientMap.keySet().forEach(System.out::println);
			System.out.println("/login:clientMap.values():");
			clientMap.values().forEach(System.out::println);
			System.out.println("/login:" + userId + " 连接上了么？" + connected(userId));
		}else {
			map.put("code", 1);
			map.put("msg", "用户名或密码错误");			
		}
		return map;
	}
	@PostMapping("/register")
	public Map<Object, Object> register(@RequestBody User user, 
			/*@CookieValue(name="hitCounter",defaultValue="0")Long hitCounter,*/
			HttpServletRequest req,
			HttpServletResponse response) {
		Map<Object, Object> map = new HashMap<>();
		if(userService.findByName(user.getUsername())!=null) {
			map.put("code", 1);
			map.put("msg", "此用户已存在");
		}else {
			user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
			//user.setUserId(null);{"code":0,"data":{"userId":{"timestamp":1601832521,"counter":16508260,"time":1601832521000,"date":"2020-10-04T17:28:41.000+0000","timeSecond":1601832521,"machineIdentifier":2993576,"processIdentifier":8257},"username":"花花","password":"","type":"dashen","header":null,"post":null,"info":null,"company":null,"salary":null}}
			//user.setUserId(ObjectId.get());{"code":0,"data":{"userId":{"timestamp":1601833676,"counter":3776116,"time":1601833676000,"date":"2020-10-04T17:47:56.000+0000","timeSecond":1601833676,"machineIdentifier":4856603,"processIdentifier":498},"username":"花大花","password":"","type":"dashen","header":null,"post":null,"info":null,"company":null,"salary":null}}
			User user2 = userService.register(user);
			map.put("code", 0);
		  // 生成一个cookie(userid: user._id), 并交给浏览器保存
			//hitCounter++;
			String userId = user2.getUserId();
			req.getServletContext().setAttribute("userId",userId);
			Cookie hit = new Cookie("userId",userId);
			System.out.println("Cookie="+hit+" "+hit.getName()+": "+hit.getValue());
			hit.setMaxAge(60 * 60 * 24 * 7);
			hit.setPath("/");//("/")表示的是访问当前工程下的所有webApp都会产生cookie
			hit.setHttpOnly(false);
			response.addCookie(hit);
			//userId=5f7b35c6aa49cd0ff9d9eace; Max-Age=604800; Expires=Mon, 12-Oct-2020 15:03:35 GMT; Path=/
			//response.addHeader("Set-Cookie", "SameSite=None");
		  String setCookie = response.getHeader("Set-Cookie");
			System.out.println("setCookie: "+setCookie);
			userIdCookie = setCookie.substring(setCookie.indexOf('=') + 1, setCookie.indexOf(';'));
			System.out.println("userId: "+userIdCookie);			
			user2.setPassword("");
			map.put("bo", user2);
			map.put("connected", connected(userId));
		}		
		return map;
	}
}
