package cn.xca.mp.simple.pojo;

import java.math.BigDecimal;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("t_product")
public class Product {
	@TableId(type=IdType.AUTO)
	private Long id;
	private String name;
	private BigDecimal price;
	@TableField("salePrice")
	private BigDecimal salePrice;
	@TableField("salePoint")
	private String salePoint;
	@TableField("typeId")
	private Long typeId;
	@TableField("typeName")
	private String typeName;
	private String image;
	private Integer flag;
	private Date created;
	private Date updated;
	private String creater;
	private String updater;
}
