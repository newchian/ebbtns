package cn.xca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.xca.entity.Dept;

public interface DeptRepository extends JpaRepository<Dept, Integer> {
	
}
