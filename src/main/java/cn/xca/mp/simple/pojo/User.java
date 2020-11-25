package cn.xca.mp.simple.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("t_user")
public class User {
	/*@Override
	public String toString() {
		return "User [id=" + id + ", userName=" + userName + ", password=" + password + ", name=" + name + ", age=" + age
				+ ", email=" + email + "]";
	}
	public User(Long id, String userName, String password, String name, Integer age, String email) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.name = name;
		this.age = age;
		this.email = email;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}*/
	@TableId(type=IdType.AUTO)
	private Long id;
	/*public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}*/
	@TableField("user_name")
	private String userName;
	private String password;
	private String name;
	private Integer age;
	private String email;
}
