package com.xca.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xca.chat.pojo.Message;
import com.xca.chat.service.MessageService;

@RestController
@RequestMapping("msg")
@CrossOrigin
public class MessageController {
	@Autowired
	MessageService messageService;
	@GetMapping
	public List<Message> queryMessages(
			@RequestParam("toId") Long fromId,
			@RequestParam("fromId")Long toId,
			@RequestParam(value="page", defaultValue="1")Integer page,
			@RequestParam(value="rows", defaultValue="10")Integer rows) {
		return this.messageService.queryMessages(fromId, toId, page, rows);
	}
}
