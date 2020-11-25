package cn.xca.mp.simple.mapper;

import java.util.List;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import cn.xca.mp.simple.pojo.Product;

public interface ProductMapper extends BaseMapper<Product>{
  void createProduct(Product product);
  List<Product> findAll();
}
