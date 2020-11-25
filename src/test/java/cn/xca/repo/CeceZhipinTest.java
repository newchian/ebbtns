package cn.xca.repo;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.DigestUtils;

import cn.xca.entity.cecezhipin.Chat;
import cn.xca.entity.cecezhipin.User;
import cn.xca.repository.cecezhipin.ChatRepository;
import cn.xca.repository.cecezhipin.UserRepository;
import cn.xca.repository.cecezhipin.UserRepository2;
import cn.xca.service.cecezhipin.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CeceZhipinTest {
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRopository;
	@Autowired
	private UserRepository2 userRopository2;
	@Autowired
	private ChatRepository chatRepository;
	//User(userId=5f79968e05ff274facc7bc08, username=kx8, password=kx5, type=kx3, header=kx1, post=kx1, info=kx9, company=kx8, salary=kx0) 
	//User(userId=5f79968e05ff274facc7bc09, username=kx2, password=kx7, type=kx8, header=kx8, post=kx1, info=kx9, company=kx9, salary=kx8)
	@Test
	public void userList() {
		List<User> shenshens = userService.findByType("dashen"),
				banbans = userService.findByType("laoban");
		shenshens.stream()/*.map(u->{
			u.setPassword("");
			return u;
		})*/.forEach(System.out::println);
		System.out.println("*******************************************************");
		banbans.stream().forEach(System.out::println);
		/*
		 * 
		 * 
User(userId=5f7a116a55dfb96270ce87a2, username=小强, password=1234, type=dashen, header=, post=, info=, company=, salary=)
User(userId=5f7a12bbebdfc33c298d20d3, username=花花花, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7a14c8d85e8a241961c65e, username=烂烂烂烂, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7a17fde7508d0853ca3c8c, username=和花花花花, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7a94b75300710749e82969, username=xf, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7a9fab77fccd2e575407fb, username=xff, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7aaf3777fccd2e575407fc, username=xl, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7ab16e5cec2d35b21bbf81, username=xll, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7abaf85cec2d35b21bbf82, username=xlll, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7abba45cec2d35b21bbf83, username=ll, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7abdb55cec2d35b21bbf84, username=llll, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7acc6ffbb68209d1ae48ff, username=hhhhh, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7acf9a7928120d70f33d9e, username=hhyyyy, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7ae4136f2c5329913e9072, username=g, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7ae58b6e32e873bf599175, username=gg, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7aea2618f13f25372c9550, username=ggg, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7aeb65ff1aa462babdcc27, username=gggg, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b011645a69966c4dcc817, username=ggggg, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b02d2225c5217ee74f026, username=咕咕咕咕咕咕, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b25b582f80b480c183b2d, username=GGGGGG1234, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b2cde82f80b480c183b2e, username=ggfjghgt, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b2f5082f80b480c183b2f, username=让他让他让他, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b313c2f28bb0c38fe47db, username=erererewrere, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b32c1bc1a157dfd203dd1, username=发过给发个非官方个非官方, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b35c6aa49cd0ff9d9eace, username=电饭锅好好干几个, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b37e30e31756141688429, username=大幅度的观点, password=81dc9bdb52d04dc20036dbd8313ed055, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b40b9f48a87545dbd33aa, username=问额外企鹅王, password=c4ca4238a0b923820dcc509a6f75849b, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b42e333af853746a86882, username=二二尔特让他让他他发个方法, password=c4ca4238a0b923820dcc509a6f75849b, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b47156dc2c610eb648b0f, username=去, password=c4ca4238a0b923820dcc509a6f75849b, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b48ecfd93a403c0c1aaba, username=让, password=c4ca4238a0b923820dcc509a6f75849b, type=dashen, header=null, post=null, info=null, company=null, salary=null)
User(userId=5f7b4adfa22dde2f29dcd9ae, username=附带, password=c4ca4238a0b923820dcc509a6f75849b, type=dashen, header=头像3, post=问问, info=问问, company=null, salary=null)
User(userId=5fa6b23c732ca66ed170e35d, username=刘刘, password=202cb962ac59075b964b07152d234b70, type=dashen, header=头像1, post=大大bb, info=顶顶顶顶, company=null, salary=null)
User(userId=5fb4cfcef08edd7bb0e30078, username=shenshen, password=202cb962ac59075b964b07152d234b70, type=dashen, header=头像8, post=j, info=j, company=null, salary=null)
User(userId=5fb503c5f08edd7bb0e30079, username=shenshen2, password=202cb962ac59075b964b07152d234b70, type=dashen, header=头像9, post=k, info=kkkkk, company=null, salary=null)
*******************************************************
User(userId=5fa6b1f4732ca66ed170e35c, username=红红, password=202cb962ac59075b964b07152d234b70, type=laoban, header=null, post=null, info=null, company=null, salary=null)
User(userId=5fa6ff83732ca66ed170e35e, username=贾贾, password=202cb962ac59075b964b07152d234b70, type=laoban, header=null, post=null, info=null, company=null, salary=null)
User(userId=5fa804722f7e295d79e1494f, username=芳芳, password=202cb962ac59075b964b07152d234b70, type=laoban, header=null, post=null, info=null, company=null, salary=null)
User(userId=5fb25931537960726ec0169d, username=banban, password=202cb962ac59075b964b07152d234b70, type=laoban, header=头像18, post=大生意, info=大职位, company=大公司, salary=34k)
User(userId=5fb28d6c537960726ec0169e, username=banban2, password=202cb962ac59075b964b07152d234b70, type=laoban, header=头像4, post=gggg, info=dfddff, company=ffff, salary=34k)
User(userId=5fb387b35799dd2d15b0532a, username=banban3, password=202cb962ac59075b964b07152d234b70, type=laoban, header=头像4, post=f, info=f, company=f, salary=5)
User(userId=5fb39026905a8c0ff39ecd87, username=banban4, password=202cb962ac59075b964b07152d234b70, type=laoban, header=头像4, post=j, info=j, company=j, salary=3)
User(userId=5fb3a364905a8c0ff39ecd88, username=banban5, password=202cb962ac59075b964b07152d234b70, type=laoban, header=头像4, post=j, info=j, company=j, salary=5)
User(userId=5fb3b2a18a0b653544fd985b, username=banban6, password=202cb962ac59075b964b07152d234b70, type=laoban, header=头像4, post=l, info=l, company=l, salary=8)
User(userId=5fb3e74a8a0b653544fd985c, username=banban7, password=202cb962ac59075b964b07152d234b70, type=laoban, header=头像4, post=p, info=p, company=p, salary=6)
User(userId=5fb3edd5033e604156053092, username=banban8, password=202cb962ac59075b964b07152d234b70, type=laoban, header=头像4, post=l, info=l, company=l, salary=7)
		 * 
		 * 
		 * 
		 */
	}
	@Test
	public void chat() {
		/*		Chat c2 = new Chat(null,strJoin("5f7a94b75300710749e82969", "5f7a9fab77fccd2e575407fb"),"5f7a94b75300710749e82969", "5f7a9fab77fccd2e575407fb", "你好1", false, 32158L),
				c3 = new Chat(null,strJoin("5f7a9fab77fccd2e575407fb", "5f7aaf3777fccd2e575407fc"),"5f7a9fab77fccd2e575407fb", "5f7aaf3777fccd2e575407fc", "你好2", false, 32158L),
				c4 = new Chat(null,strJoin("5f7abaf85cec2d35b21bbf82", "5f7a94b75300710749e82969"),"5f7abaf85cec2d35b21bbf82", "5f7a94b75300710749e82969", "你好3", false, 32158L),
				c5 = new Chat(null,strJoin("5f7abaf85cec2d35b21bbf82", "5f7a9fab77fccd2e575407fb"),"5f7abaf85cec2d35b21bbf82", "5f7a9fab77fccd2e575407fb", "你好4", false, 32158L);
		Chat saved = chatRepository.save(chat);
		Optional<Chat> finded = chatRepository.findById("897799");
		System.out.println("saved=" + saved);
		System.out.println("finded=" + finded);
		Assert.assertTrue(saved.equals(finded.get()));*/
		//List<Chat> saveds = chatRepository.saveAll(Arrays.asList(c2,c3,c4,c5));
		//saveds.forEach(System.out::println);
		/*System.out.println("*****************************************************");
		Chat probe = new Chat();
		probe.setFrom("5f7a94b75300710749e82969");
		probe.setTo("5f7a94b75300710749e82969");
		List<Chat> findeds = chatRepository.findAll(Example.of(probe, ExampleMatcher.matchingAny()));
		ExampleMatcher matcher = ExampleMatcher.matchingAny()
				.withMatcher("from",ExampleMatcher.GenericPropertyMatchers.ignoreCase())
				.withMatcher("to",ExampleMatcher.GenericPropertyMatchers.ignoreCase())
				.withIgnorePaths("chatId", "content","read","createTime"); 
		System.out.println("probe： " + probe);
		List<Chat> findeds = chatRepository.findAll(Example.of(probe,matcher));
		findeds.forEach(System.out::println);*/
		
		/*chatRepository.deleteAll();
		chatRepository.saveAll(Arrays.asList(c2,c3,c4,c5));*/
		String idF = "5fb4cfcef08edd7bb0e30078",
				idF2 = "5fb503c5f08edd7bb0e30079";
		String idT = "5fb25931537960726ec0169d";
		String joined = strJoin(idF, idT),
				joined2 = strJoin(idF2, idT);
		Chat c6 = new Chat(null,joined,idF, idT, "你好a", false, 321584L),
			c7 = new Chat(null,joined,idF, idT, "你好b", false, 3215865L),
			c8 = new Chat(null,joined,idF, idT, "你好c", false, 3215834L),
			c9 = new Chat(null,joined2,idF2, idT, "你好d", false, 3215875L),
			c10 = new Chat(null,joined2,idF2, idT, "你好e", false, 3215846L);		
		chatRepository.saveAll(Arrays.asList(c6,c7,c8,c9,c10)).forEach(System.out::println);
		System.out.println("*****************************************************");
		chatRepository.findAll().forEach(System.out::println);
		
/*		System.out.println("*****************************************************");
		List<Chat> m = chatRepository.findAll().stream().peek(System.out::println).map(c-> {						
			if(c.isRead()!=false){
				chatRepository.delete(c);
			  c.setRead(false);
			  return chatRepository.save(c);
			} else
			  return c;
		}).collect(Collectors.toList());
		System.out.println("*****************************************************");
		m.forEach(System.out::println);*/
		
		/*chatRepository.findAll().forEach(System.out::println);
		System.out.println("*****************************************************");
		Chat finder1 = new Chat(null,null,"5f7a94b75300710749e82969", "5f7a9fab77fccd2e575407fb", null, false, null);
		Chat finder4 = new Chat(null,null,"5f7abaf85cec2d35b21bbf82", "5f7a9fab77fccd2e575407fb", null, false, null);
		ExampleMatcher matcher = ExampleMatcher.matchingAll()
				.withMatcher("from",ExampleMatcher.GenericPropertyMatchers.caseSensitive())
				.withMatcher("to",ExampleMatcher.GenericPropertyMatchers.caseSensitive())
				.withIgnorePaths("chatId", "msgId", "content", "createTime"); 
		List<Chat> deleted1 = chatRepository.findAll(Example.of(finder1, matcher));
		List<Chat> deleted4 = chatRepository.findAll(Example.of(finder4, matcher));
		deleted1.forEach(System.out::println);
		deleted4.forEach(System.out::println);
		System.out.println("更新前deleted1长度：" + deleted1.size());
		System.out.println("更新前deleted4长度：" + deleted4.size());
		List<Chat> updated1 = deleted1.stream().map(c-> new Chat(c.getChatId(),c.getMsgId(),c.getFrom(),c.getTo(),
				c.getContent(),true,//更新为指定的值也就是已读
				c.getCreateTime())
		).collect(Collectors.toList());
		List<Chat> updated4 = deleted4.stream().map(c-> new Chat(c.getChatId(),c.getMsgId(),c.getFrom(),c.getTo(),
				c.getContent(),true,//更新为指定的值也就是已读
				c.getCreateTime())
		).collect(Collectors.toList());
		System.out.println("*****************************************************");
		chatRepository.deleteAll(deleted1);
		chatRepository.deleteAll(deleted4);
		chatRepository.saveAll(updated1).forEach(System.out::println);
		chatRepository.saveAll(updated4).forEach(System.out::println);
		System.out.println("更新后updated1长度：" + chatRepository.saveAll(updated1).size());
		System.out.println("更新后updated4长度：" + chatRepository.saveAll(updated4).size());
		System.out.println("*****************************************************");
		chatRepository.findAll().forEach(System.out::println);*/
		
		/*
		 *     from=5f7a94b75300710749e82969, to=5f7a9fab77fccd2e575407fb
		 * from=5f7a94b75300710749e82969, to=xxxxxxxxxxxxxxxx
		 *     from=xxxxxxxxxxxxxxxxx, to=5f7a9fab77fccd2e575407fb
		 * 
		Chat(chatId=897799, from=小强, to=小燕, content=你好, read=false, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133c7, from=5f7a94b75300710749e82969, to=5f7a9fab77fccd2e575407fb, content=你好1, read=false, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133c8, from=5f7a9fab77fccd2e575407fb, to=5f7aaf3777fccd2e575407fc, content=你好2, read=false, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133c9, from=5f7abaf85cec2d35b21bbf82, to=5f7a94b75300710749e82969, content=你好3, read=false, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133ca, from=5f7abaf85cec2d35b21bbf82, to=5f7a9fab77fccd2e575407fb, content=你好4, read=false, createTime=32158)
		*****************************************************
		Chat(chatId=897799, from=小强, to=小燕, content=你好, read=false, createTime=32158)
		    Chat(chatId=5fb0067b3f7b8143096133c7, from=5f7a94b75300710749e82969, to=5f7a9fab77fccd2e575407fb, content=你好1, read=false, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133c8, from=5f7a9fab77fccd2e575407fb, to=5f7aaf3777fccd2e575407fc, content=你好2, read=false, createTime=32158)
		    Chat(chatId=5fb0067b3f7b8143096133c9, from=5f7abaf85cec2d35b21bbf82, to=5f7a94b75300710749e82969, content=你好3, read=false, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133ca, from=5f7abaf85cec2d35b21bbf82, to=5f7a9fab77fccd2e575407fb, content=你好4, read=false, createTime=32158)
		*****************************************************
		Chat(chatId=897799, from=小强, to=小燕, content=你好, read=true, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133c7, from=5f7a94b75300710749e82969, to=5f7a9fab77fccd2e575407fb, content=你好1, read=true, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133c8, from=5f7a9fab77fccd2e575407fb, to=5f7aaf3777fccd2e575407fc, content=你好2, read=true, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133c9, from=5f7abaf85cec2d35b21bbf82, to=5f7a94b75300710749e82969, content=你好3, read=true, createTime=32158)
		Chat(chatId=5fb0067b3f7b8143096133ca, from=5f7abaf85cec2d35b21bbf82, to=5f7a9fab77fccd2e575407fb, content=你好4, read=true, createTime=32158)
		*/
	}
	private String strJoin(String idF, String idT) {
		return String.join("_", Arrays.asList(idF, idT).stream().sorted().collect(Collectors.toList()));
	}
	@Test
	public void updateUser() {		
		User user1 = userRopository2.findById("5f79968e05ff274facc7bc08").get();
		User user2 = userRopository2.findById("5f79968e05ff274facc7bc09").get();
		System.out.println("更前user1="+user1);
		System.out.println("更前user2="+user2);
		User ret = userService.update(user1.getUserId().toString(), user2);
		user1 = userRopository2.findById("5f79968e05ff274facc7bc08").get();
		System.out.println("更后user1，除了userId：5f79968e05ff274facc7bc08，username：kx8，type：kx3外其他字段都和user2相同="+user1);
		System.out.println("要返回给客户端的没有password字段值的user="+ret);
	}
	@Test
	public void createManyUser() {
		System.out.println(this.userRopository2.findAll());
		userRopository2.deleteAll();
		Random r = new Random(47);
		for(int i=0;i<10;i++) {
			this.userRopository2.save(new User(null,
					"kx" + r.nextInt(10), 
					"kx" + r.nextInt(10),
					"kx" + r.nextInt(10),
					"kx" + r.nextInt(10),
					"kx" + r.nextInt(10),
					"kx" + r.nextInt(10),
					"kx" + r.nextInt(10),
					"kx" + r.nextInt(10)));
		}
		System.out.println(this.userRopository2.findAll());
	}
	@Test
	public void createAUser() {
		User user = new User();
		System.out.println(user);
		userRopository.save(user);
		System.out.println(user.getUserId());
		System.out.println(user.getUserId().toString());
		System.out.println(userRopository.findById(user.getUserId().toString()));
	}
	@Test
	public void removeAllUsers() {
		System.out.println(userRopository.removeAll());
	}
	@Test
	public void testFindUserByNameAndPwd() {
		System.out.println(userService.findByUsernameAndPassword("明明",
				DigestUtils.md5DigestAsHex("1234".getBytes())));
	}
	@Test
	public void testViewAllUser() {
		System.out.println(userRopository.findAll());
	}
	@Test
	public void testFindUserByName() {
		System.out.println(userService.findByName("小强"));
	}
	@Test
	public void testSaveUser() {
		userRopository2.deleteAll();
		System.out.println(userService.register(new User(null,"小强","1234","dashen","","","","","")));
		//System.out.println(userRopository.findAll());
	}
}
