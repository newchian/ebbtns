package cn.xca.entity.transactionscript;

import java.math.BigDecimal;
import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract {
	@Id
	private ObjectId id;
	private Product product;
	private BigDecimal revenue;
	private Date dateSigned;
}
