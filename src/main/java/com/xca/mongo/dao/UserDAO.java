package com.xca.mongo.dao;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import cn.xca.mp.simple.pojo.User;

@Component
public class UserDAO {
	@Autowired
	private MongoTemplate mongoTemplate;
	public User saveUser(User user) {
		return mongoTemplate.save(user);
	}
	public List<User> findUserListByName(String name) {
		Query query = Query.query(Criteria.where("name").is(name));
		return this.mongoTemplate.find(query, User.class);
	}
	public List<User> findUserListFor(Integer page, Integer rows) {
		Query query = new Query().limit(rows).skip((page - 1) * rows);
		return this.mongoTemplate.find(query, User.class);
	}
	public UpdateResult update(User user) {
		Query query = Query.query(Criteria.where("id").is(user.getId()));		
		Document d = Document.parse(JSON.toJSONString(user));
	//Update update = Update.update("age", user.getAge());
		Update update = Update.fromDocument(d,"id","userName", "password", "name");
		return this.mongoTemplate.updateFirst(query, update, User.class);
	}
	public DeleteResult deleteFor(Long id) {
		Query query = Query.query(Criteria.where("id").is(id));
		return this.mongoTemplate.remove(query, User.class);
	}
	public User findById(long id) {
		Query query = Query.query(Criteria.where("id").is(id));
		return this.mongoTemplate.findOne(query, User.class);
	}
	public List<User> findAll() {
		return this.mongoTemplate.findAll(User.class);
	}
}
