package cn.xca.repo;

import java.util.Random;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

import cn.xca.entity.Dept;
import cn.xca.repository.DeptRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DeptRepoTest {
	@Autowired
	private DeptRepository deptRepository;
	@Test
	public void findAll() {
		System.out.println(deptRepository.findAll());
	}
	@Test
	public void addMany() {
		Random random = new Random(47);
		for(int i=0; i<15; i++){
			Dept dept = new Dept();
			int nextInt = random.nextInt(19);
			dept.setLoc("南宁"+nextInt);
			dept.setDName("业务部"+nextInt);
			deptRepository.saveAndFlush(dept);
		}
	}
	@Test
	public void contentLoads() {
		PageRequest pageRequest = PageRequest.of(0, 6);
		Page<Dept> page = deptRepository.findAll(pageRequest);
		int age = 6;
		System.out.println(age);
	}
	@Test
	public void findById() {
		Dept dept = deptRepository.findById(10).get();
		System.out.println(dept);
	}
}
