package com.xca.chat.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xca.chat.pojo.UserData;
import com.xca.chat.service.MessageService;
import com.xca.chat.pojo.Message;
import com.xca.chat.pojo.User;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {
	@Autowired
	private MessageService messageService;
	@GetMapping
	public List<Map<String, Object>> queryUsers(
			@RequestParam("fromId")Long fromId) {
		List<Map<String, Object>> result = new ArrayList<>();
		for(Entry<Long, User> userEntry: UserData.USER_MAP.entrySet()) {
			Map<String, Object> map = new HashMap<>();
			map.put("id", userEntry.getValue().getId());
			map.put("avatar", "//xxxx.jpg");
			map.put("from_user", fromId);
			map.put("info_type", null);
			map.put("to_user", map.get("id"));
			map.put("username", userEntry.getValue().getUserName());
			List<Message> messages = this.messageService.queryMessages(
					fromId, userEntry.getValue().getId(), 1, 1);
			if(messages != null && !messages.isEmpty()) {
				Message message = messages.get(0);
				map.put("chat_msg", message.getMsg());
				map.put("chat_time", message.getSendDate().getTime());
			}
			result.add(map);
		}
		return result;		
	}
}
