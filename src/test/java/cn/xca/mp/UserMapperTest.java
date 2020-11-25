package cn.xca.mp;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;

import cn.xca.mp.simple.mapper.UserMapper;
import cn.xca.mp.simple.pojo.User;
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserMapperTest {
	@Autowired
	private UserMapper userMapper;

	/*
	 * @Test public void testSelect() { List<User> userList =
	 * userMapper.selectList(null); for (User user : userList) {
	 * System.out.println(user); } }
	 */
	@Test
	public void testInsert() {
		User user = new User();
		user.setAge(20);
		user.setEmail("test@itcast.cn");
		user.setName("小明");
		user.setUserName("xiaoming");
		user.setPassword("123456");
		int result = this.userMapper.insert(user); // 返回的result是受影响的行数，并不是自增后的id
		System.out.println("result = " + result);
		System.out.println(user.getId()); // 自增后的id会回填到对象中
	}

	@Test
	public void testUpdateById() {
		User user = new User();
		user.setId(6L); // 主键
		user.setAge(21); // 更新的字段
		// 根据id更新，更新不为null的字段
		this.userMapper.updateById(user);
	}

	@Test
	public void testUpdate() {
		User user = new User();
		user.setAge(22); // 更新的字段
		// 更新的条件
		QueryWrapper<User> wrapper = new QueryWrapper<>();
		wrapper.eq("id", 6);
		// 执行更新操作
		int result = this.userMapper.update(user, wrapper);
		System.out.println("result = " + result);
	}

	@Test
	public void testUpdate2() {
		// 更新的条件以及字段
		UpdateWrapper<User> wrapper = new UpdateWrapper<>();
		wrapper.eq("id", 6).set("age", 24);
		// 执行更新操作
		int result = this.userMapper.update(null, wrapper);
		System.out.println("result = " + result);
	}
}
