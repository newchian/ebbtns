package com.xca.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xca.chat.dao.MessageDAO;
import com.xca.chat.pojo.Message;

@Component
public class MessageService {
	@Autowired
	private MessageDAO messageDAO;
	public List<Message> queryMessages(Long fromId, Long toId, Integer page, Integer rows) {
		List<Message> list = messageDAO.findListByFromAndTo(fromId, toId, page, rows);
		for (Message message: list) {
			if(message.getStatus().intValue() == 1)
			  this.messageDAO.updateMessageState(message.getId(), 2);
		}
		return list;
	}

}
