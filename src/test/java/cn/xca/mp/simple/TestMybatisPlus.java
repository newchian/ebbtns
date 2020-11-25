package cn.xca.mp.simple;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.baomidou.mybatisplus.core.MybatisSqlSessionFactoryBuilder;

import cn.xca.mp.simple.mapper.ProductMapper;
import cn.xca.mp.simple.mapper.UserMapper;
import cn.xca.mp.simple.pojo.Product;
import cn.xca.mp.simple.pojo.User;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestMybatisPlus {
	@Autowired
	UserMapper userMapper;
	@Autowired
	ProductMapper productMapper;
	final String resource = "mybatis-config.xml";
	InputStream inputStream;
	SqlSession sqlSession;
	@Before
	public void before() throws IOException{
		inputStream = Resources.getResourceAsStream(resource);
	  // 这里使用的是MP中的MybatisSqlSessionFactoryBuilder
		sqlSession = new MybatisSqlSessionFactoryBuilder().build(inputStream).openSession();
	}
	@Test
	public void testUserList() {
		UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
		// 可以调用BaseMapper中定义的方法
		List<User> list = userMapper.selectList(null);
		for(User user : list) {
			System.out.println(user);
		}
	}
	@Test
	public void insertUsers() {
//		UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
		User user = new User(null, "x", "x", "x", 25, "x");
		userMapper.insert(user);
		User selectById = userMapper.selectById(user.getId());
		System.out.println("id是:" + selectById.getId());
	}
	@Test
	public void viewProducts() {
//		ProductMapper productMapper = sqlSession.getMapper(ProductMapper.class);
		Random r = new Random(47);
		for(int i=0; i<19;i++) {
			Product product = new Product(null, "产品" + r.nextInt(20), new BigDecimal(12.3), new BigDecimal(12.6),"买点" + r.nextInt(20), 1l, "大类" + r.nextInt(20), "../image/1" + r.nextInt(20)+".png",6, new Date(), new Date(), "小明" + r.nextInt(20), "小明" + r.nextInt(20));
			System.out.println("插入前产品是:" + product);
			System.out.println("正在插入:" + productMapper.insert(product));
			System.out.println("插入后产品id是:" + product.getId());
		}
	}
	@Test
	public void findProducts() {
//		ProductMapper productMapper = sqlSession.getMapper(ProductMapper.class);
		List<Product> list = productMapper.selectList(null);
		for(Product product : list) {
			System.out.println(product);
		}
	}
}
