package cn.xca.entity.transactionscript;

import java.math.BigDecimal;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RevenueRecognition {
	private Contract contract;
	private BigDecimal amount;
	private Date recognizedOn;
}
