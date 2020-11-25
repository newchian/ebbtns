package com.xca.chat.pojo;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@Document(collation="message") //java.lang.IllegalArgumentException: Collation not supported by server version: ServerVersion{versionList=[3, 2, 22]}
@Builder
public class Message {
	@Id
	private ObjectId id;
	private String msg;
	//1-未读，2-已读
	@Indexed
	private Integer status;
	@Field("send_date")
	@Indexed
	private Date sendDate;
	@Field("read_date")
	private Date reaDate;
	@Indexed
	private User from;
	@Indexed
	private User to;
	private String type;
	private String data;
	private String fromName;
	private String toName;
}
