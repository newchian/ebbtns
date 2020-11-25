package com.xca.service;

import java.util.List;

import cn.xca.mp.simple.pojo.Product;

public interface ProductCrudService {
	List<Product> fetchAll();
	Product fetchBy(Integer id);
	void udateProduct(Product product);
	void deleteBy(Integer id);
	void save(Product product);	
}
