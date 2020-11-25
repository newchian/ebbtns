package com.xca.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import cn.xca.mp.simple.pojo.User;

@Component
public class PersonDAO {
	@Autowired
	private MongoTemplate mongoTemplate;
	public User saveUser(User user) {
		return this.mongoTemplate.save(user);
	}
}
