package cn.xca.entity.cecezhipin;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	@Id
	private String userId;
	private String username;
	private String password;
	private String type;
	private String header;
	private String post;
	private String info;
	private String company;
	private String salary;
}
