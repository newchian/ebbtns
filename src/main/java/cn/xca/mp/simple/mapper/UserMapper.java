package cn.xca.mp.simple.mapper;

import java.util.List;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import cn.xca.mp.simple.pojo.User;

public interface UserMapper extends BaseMapper<User> {
	List<User> findAll();
}
