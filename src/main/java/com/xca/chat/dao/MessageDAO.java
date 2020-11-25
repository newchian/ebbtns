package com.xca.chat.dao;

import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.xca.chat.pojo.Message;

public interface MessageDAO {
	List<Message> findListByFromAndTo(Long fromId, Long toId, 
			Integer page, Integer rows);
	Message findMessageById(String id);
	UpdateResult updateMessageState(ObjectId id, Integer status);
	Message saveMessage(Message message);
	DeleteResult deleteMessage(String id);
}
