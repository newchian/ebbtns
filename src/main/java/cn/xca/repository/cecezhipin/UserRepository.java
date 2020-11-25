package cn.xca.repository.cecezhipin;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.mongodb.client.result.UpdateResult;

import cn.xca.entity.cecezhipin.User;

@Component
public class UserRepository {
	@Autowired
	private MongoTemplate mongoTemplate;
	public User save(User user) {
		return mongoTemplate.save(user);
	}
	public List<User> findAll() {
		return mongoTemplate.findAll(User.class);
	}
	public User findByName(String name) {
		Query query = Query.query(Criteria.where("username").is(name));
		return mongoTemplate.findOne(query, User.class);
	}
	public User findByNameAndPwd(String username, String md5DigestAsHexPwd) {		
		Query query = Query.query(Criteria.where("username")
				.is(username).andOperator(Criteria.where("password").is(md5DigestAsHexPwd)));
		return mongoTemplate.findOne(query, User.class);
	}
	public long removeAll() {
		return mongoTemplate.remove(User.class).all().getDeletedCount();
	}
	public UpdateResult update(String id, User user) {
		Query query = Query.query(Criteria.where("userId").is(id));
		Document d = Document.parse(JSON.toJSONString(user));
		Update update = Update.fromDocument(d, "userId","username","password");
		return this.mongoTemplate.updateFirst(query, update, User.class);
	}
	public  User findById(String id) {
		Query query = Query.query(Criteria.where("userId").is(id));
		return this.mongoTemplate.findOne(query, User.class);
	}
	public List<User> findByType(String type) {
		// TODO Auto-generated method stub
		return null;
	}

}
