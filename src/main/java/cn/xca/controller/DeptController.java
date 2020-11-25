package cn.xca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cn.xca.entity.Dept;
import cn.xca.repository.DeptRepository;

@RestController
public class DeptController {
	@Autowired
	private DeptRepository deptRepository;
	@PostMapping("/savedept")
	public String save(@RequestBody Dept dept) {
		System.out.println(dept);
		Dept result = deptRepository.save(dept);
		if(result != null) {
			return "success";
		}
		return "error";
	}
	@GetMapping("/findalldepts")
	public List<Dept> findAll() {
		return deptRepository.findAll();
	}
	@GetMapping("/findpage/{page}/{size}")
	public Page<Dept> findPage(@PathVariable("page")int p, @PathVariable("size")int s) {
		return deptRepository.findAll(PageRequest.of(p, s));
	}
	@DeleteMapping("/deldept/{no}")
	public void del(@PathVariable("no")Integer no) {
		deptRepository.deleteById(no);
	}
	@GetMapping("/finddeptbyid/{no}")
	public Dept findById(@PathVariable("no")Integer no) {
		return deptRepository.findById(no).get();
	}
	@PutMapping("/update")
	public String update(@RequestBody Dept dept) {
		Dept result = deptRepository.save(dept);
		if(result != null) {
			return "success";
		}
		return "error";
	}
}
