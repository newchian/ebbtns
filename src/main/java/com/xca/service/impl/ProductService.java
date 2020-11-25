package com.xca.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xca.service.ProductCrudService;
import cn.xca.mp.simple.mapper.ProductMapper;
import cn.xca.mp.simple.pojo.Product;

@Service
public class ProductService implements ProductCrudService {
	@Autowired
	private ProductMapper productMapper;
	@Override
	public List<Product> fetchAll() {
		return productMapper.selectList(null);
	}
	@Override
	public Product fetchBy(Integer id) {
		return productMapper.selectById(id);
	}
	@Override
	public void udateProduct(Product product) {
		productMapper.updateById(product);
	}
	@Override
	public void deleteBy(Integer id) {
		productMapper.deleteById(id);
	}
	@Override
	public void save(Product product) {
		Random r = new Random(47);
		Product newProduct = new Product(null, product.getName(), product.getPrice(), new BigDecimal("15." + r.nextInt(15)), "高清", 1L, "手机" + r.nextInt(15), "../" + r.nextInt(15) + ".png", 1, new Date(), new Date(), "小明" + r.nextInt(15), "小明" + r.nextInt(15));
		productMapper.insert(newProduct);
	}
}
