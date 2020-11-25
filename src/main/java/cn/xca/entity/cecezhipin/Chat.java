package cn.xca.entity.cecezhipin;

import java.util.Date;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chat {
	@Id
	private String chatId;
	private String msgId;
	private String from;
	private String to;
	private String content;
	private boolean read;
	private Long createTime;
}
