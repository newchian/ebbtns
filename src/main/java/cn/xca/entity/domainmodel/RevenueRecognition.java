package cn.xca.entity.domainmodel;

import java.util.Date;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RevenueRecognition {
	@Id
	private String Id;
	private long amount;
  private Date date;
	public RevenueRecognition(long amount, Date date) {
    this.amount = amount;
    this.date = date;
	}
	public boolean isRecognizableBy(Date asOf) {
		return asOf.after(date) || asOf.equals(date);
	}	
}
