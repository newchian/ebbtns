package cn.xca.mp.simple;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import cn.xca.mp.simple.mapper.UserMapper;
import cn.xca.mp.simple.pojo.User;

//@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class TestSpringMP {
	@Autowired
	private UserMapper userMapper;
	@Test
	public void testSelectList() {
		List<User> users = this.userMapper.selectList(null);
		for (User user : users) {
			System.out.println(user);
		}
	}
}
