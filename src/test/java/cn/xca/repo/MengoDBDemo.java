package cn.xca.repo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.commons.lang3.time.DateUtils;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mongodb.BasicDBObject;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.xca.mongo.dao.UserDAO;

import cn.xca.entity.transactionscript.Contract;
import cn.xca.entity.transactionscript.Product;
import cn.xca.entity.transactionscript.RevenueRecognition;
import cn.xca.mp.simple.pojo.User;
import cn.xca.repository.transactionscript.Gateway;
import cn.xca.service.RecognitionService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MengoDBDemo {
	@Autowired
	private UserDAO dao;
	@Autowired
	private Gateway gateway;
	@Autowired
	private RecognitionService rs;
	@Test
	public void saveDbContract() {
		Product db= gateway.findProductByType("D");
		System.out.println(db);
		System.out.println(gateway.saveContract(new Contract(ObjectId.get(),db,new BigDecimal(80.84),new Date())));
	}
	@Test
	public void dbRevenueRecognition() {
		rs.calculateRevenueRecognitions("5f7057fbc7559539e12d0a36");
		List<RevenueRecognition> list = gateway.findAllRecognitions();
		for (RevenueRecognition rr:list){
			System.out.println(rr);
		}
	}
	@Test
	public void wpRevenueRecognition() {
		rs.calculateRevenueRecognitions("5f705591cab92d3b152484a5");
		List<RevenueRecognition> list = gateway.findAllRecognitions();
		for (RevenueRecognition rr:list){
			System.out.println(rr);
		}
	}
	@Test
	public void saveWpContract() {
		Product wp= gateway.findProductByType("W");
		System.out.println(wp);
		System.out.println(gateway.saveContract(new Contract(ObjectId.get(),wp,new BigDecimal(180.84),new Date())));
	}
	@Test
	public void removeAllRevenueRecognition() {
		System.out.println(gateway.removeAllRevenueRecognition().getDeletedCount());		
	}
	@Test
	public void findAllRecognitions() {
		List<RevenueRecognition> list = gateway.findAllRecognitions();
		System.out.println(list);
		for (RevenueRecognition rr:list){
			System.out.println(rr);
		}
	}
	@Test
	public void sRevenueRecognition() {
		rs.calculateRevenueRecognitions("5f6f899ac653c0468a380e04");
		List<RevenueRecognition> list = gateway.findAllRecognitions();
		for (RevenueRecognition rr:list){
			System.out.println(rr);
		}
	}
	@Test
	public void findRecognitionsFor() {
		List<RevenueRecognition> list = gateway.findRecognitionsFor("5f6f899ac653c0468a380e04", DateUtils.addDays(new Date(),90));
		BigDecimal result = BigDecimal.valueOf(.00);
		for (RevenueRecognition rr:list){			
			result.add(rr.getAmount());
			System.out.println(rr);
			System.out.println(rr.getAmount());
			System.out.println(result);
		}
		System.out.println(result);
	}
	@Test
	public void chaRecognizedRevenue() {
		System.out.println(rs.recognizedRevenue("5f6f899ac653c0468a380e04", DateUtils.addDays(new Date(),70)).doubleValue());
	}
	@Test
	public void chaContract() {
		System.out.println(gateway.findContract("5f6f899ac653c0468a380e04"));
	}
	@Test
	public void saveSsContract() {
		Product ss= gateway.findProductByType("S");
		System.out.println(ss);
		System.out.println(gateway.saveContract(new Contract(ObjectId.get(),ss,new BigDecimal(280.84),new Date())));
	}
	@Test
	public void chaProductById() {
		System.out.println(gateway.findProductById("5f6f70d68ab99007565edfc0"));
	}
	@Test
	public void saveProduct() {
		Product p1 = new Product(ObjectId.get(),"字处理器","W"),
			p2=new Product(ObjectId.get(),"电子表格","S"),
			p3=new Product(ObjectId.get(),"数据库","D");
		System.out.println(gateway.saveProduct(p1));
		System.out.println(gateway.saveProduct(p2));
		System.out.println(gateway.saveProduct(p3));
	}
	@Test
	public void saveUser() {
		User user = new User(56712L, "kx", "kx", "kx", 25, "kx");
		System.out.println(this.dao.saveUser(user));
	}
	@Test
	public void saveManyUsers() {
		Random r = new Random(47);
		for(int i=0;i<10;i++) {
			this.dao.saveUser(new User(13545L + r.nextInt(10),
					"kx" + r.nextInt(10), 
					"kx" + r.nextInt(10),
					"kx" + r.nextInt(10),
					25 + r.nextInt(10),
					"kx" + r.nextInt(10)));
		}
		System.out.println(dao.findAll());
	}
	@Test
	public void cha() {
		List<User> list = this.dao.findUserListByName("kx");
		for(User user : list) {
			System.out.println(user);
		}		
	}
	@Test
	public void chaMany() {
		List<User> list = this.dao.findUserListFor(2, 3);
		for(User user : list) {
			System.out.println(user);
		}
	}
	@Test
	public void gaiOne() {
		User user = new User();
		user.setId(56712L);
		user.setAge(20);
		user.setEmail("nica66@163.com");
		System.out.println(this.dao.findById(56712L));
		System.out.println(JSONObject.toJSONString(dao.findById(56712L))+
				JSON.toJSONString(dao.findById(56712L)));
		System.out.println(JSONObject.toJSONString(user)+JSON.toJSONString(user));
		System.out.println(user);
		UpdateResult result = this.dao.update(user);
		System.out.println(result);
		System.out.println(this.dao.findById(56712L));
	}
	@Test
	public void shanOne() {
		DeleteResult deleteResult = this.dao.deleteFor(1352246L);
		System.out.println(deleteResult);
	}
	@Test
	public void zsgc() {
		
	}
}
