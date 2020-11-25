package cn.xca.repository.cecezhipin;

import org.springframework.data.mongodb.repository.MongoRepository;

import cn.xca.entity.cecezhipin.Chat;

public interface ChatRepository extends MongoRepository<Chat, String>{
	
}
