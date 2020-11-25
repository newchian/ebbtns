package com.xca.chat.dao.impl;

import java.util.Date;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.xca.chat.dao.MessageDAO;
import com.xca.chat.pojo.Message;

@Component
public class MessageDAOImpl implements MessageDAO {
	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public List<Message> findListByFromAndTo(Long fromId,
			Long toId,
			Integer page,
			Integer rows) {
		//源向目的发
		Criteria criteriaFrom = new Criteria().andOperator(
				Criteria.where("from.id").is(fromId),
				Criteria.where("to.id").is(toId)
		);
	  //目的向源发
		Criteria criteriaTo = new Criteria().andOperator(
				Criteria.where("from.id").is(toId),
				Criteria.where("to.id").is(fromId)
		);
		Criteria criteria = new Criteria().orOperator(criteriaFrom,
				criteriaTo);
		PageRequest pageRequest = PageRequest.of(page-1, rows,
				Sort.by(Sort.Direction.ASC, "sendDate"));
		Query query = Query.query(criteria).with(pageRequest);
		/*
		 * Query: {
		 *  "$or" : [{ "$and" : [{ "from.id" : { "$numberLong" : "1001"}}, { "to.id" : { "$numberLong" : "1002"}}]}, { "$and" : [{ "from.id" : { "$numberLong" : "1002"}}, { "to.id" : { "$numberLong" : "1001"}}]}]
		 *  }, 
		 * Fields: {}, 
		 * Sort: {"sendDate" : -1}
		 */
		//System.out.println(query);
		return this.mongoTemplate.find(query, Message.class);
	}

	@Override
	public Message findMessageById(String id) {
		return this.mongoTemplate.findById(new ObjectId(id), Message.class);
	}

	@Override
	public UpdateResult updateMessageState(ObjectId id, Integer status) {
		Query query = Query.query(Criteria.where("id").is(id));
		Update update = Update.update("status", status);
		if(status.intValue() == 1) {
			update.set("send_date", new Date());
		}else if(status.intValue() == 2) {
			update.set("read_date", new Date());
		}
		return this.mongoTemplate.updateFirst(query,update,Message.class);
	}

	@Override
	public Message saveMessage(Message message) {
		message.setSendDate(new Date());
		message.setStatus(1);
		return this.mongoTemplate.save(message);
	}

	@Override
	public DeleteResult deleteMessage(String id) {
		return this.mongoTemplate.remove(Query.query(Criteria.where("id").is(id)), Message.class);
	}

}
