package com.xca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xca.service.ProductCrudService;

import cn.xca.mp.simple.pojo.Product;

@RestController
public class SayHelloController {
	@Autowired
	private ProductCrudService productService;
	@GetMapping("/sayhello")
	public String sayHello() {
		return "say hello~~";
	}
	@CrossOrigin
	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String login(String name, String password) {
		System.out.println("名字:" + name + "密码：" + password);
		if ("xiaoming".equals(name) && "123456".equals(password)) {
			return "success";
		}
		return "error";
	}
	@GetMapping("/fetchproducts")
	public List<Product> products() {
		return productService.fetchAll();
	}
	@GetMapping("/fetchproductbyid/{id}")
	public Product product(@PathVariable("id")Integer id) {
		return productService.fetchBy(id);
	}
	@PutMapping("updateproduct")
	public String update(@RequestBody Product product){
		productService.udateProduct(product);
		return "success";
	}
	@DeleteMapping("deleteproduct/{id}")
	public String delete(@PathVariable("id")Integer id) {
		productService.deleteBy(id);
		return "success";
	}
	@PostMapping("addproduct")
	public String add(@RequestBody Product product){
		productService.save(product);
		return "success";
	}
	@GetMapping("/pageinfo")
	public PageInfo<Product> pageInfo(Integer pageNum, Integer pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		List<Product> list = productService.fetchAll();		
		return new PageInfo<>(list);		
	}
}
