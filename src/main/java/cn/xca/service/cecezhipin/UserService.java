package cn.xca.service.cecezhipin;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.xca.entity.cecezhipin.User;
import cn.xca.repository.cecezhipin.UserRepository;
import cn.xca.repository.cecezhipin.UserRepository2;

@Component
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserRepository2 userRepository2;
	public User register(User user) {
		return userRepository2.save(user);
	}
	public User findByName(String name) {
		return userRepository.findByName(name);
	}
	public User findByUsernameAndPassword(String username, String md5DigestAsHexPwd) {
		return userRepository.findByNameAndPwd(username, md5DigestAsHexPwd);
	}
	public User update(String id, User user) {
		Optional<User> opt = userRepository2.findById(id);
		User user2 = opt.get();
		user2.setCompany(user.getCompany());
		user2.setHeader(user.getHeader());
		user2.setInfo(user.getInfo());
		user2.setPost(user.getPost());
		user2.setSalary(user.getSalary());
		userRepository2.deleteById(id);
		userRepository2.insert(user2);
		user2.setPassword("");
		return user2;
	}
	public User findById(String userId) {
		return userRepository.findById(userId);
	}
	public List<User> findByType(String type) {
		return userRepository2.findByType(type);
	}
	public List<User> find() {
		return userRepository2.findAll();
	}
}
