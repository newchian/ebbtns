package cn.xca.repository.cecezhipin;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import cn.xca.entity.cecezhipin.User;

public interface UserRepository2 extends MongoRepository<User, String> {
	List<User> findByType(@Param("type") String type);
}
