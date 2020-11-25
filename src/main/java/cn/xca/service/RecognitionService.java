package cn.xca.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.xca.entity.transactionscript.Contract;
import cn.xca.entity.transactionscript.RevenueRecognition;
import cn.xca.repository.transactionscript.Gateway;

@Component
public class RecognitionService {
	@Autowired
	private Gateway db;
	public BigDecimal recognizedRevenue(String contractNumber, Date asOf) {
		BigDecimal result = BigDecimal.valueOf(.00);
		List<RevenueRecognition> rrList = db.findRecognitionsFor(contractNumber, asOf);
		for(RevenueRecognition rr:rrList){
			result = result.add(rr.getAmount());
		}
		return result;		
	}
	public void calculateRevenueRecognitions(String contractNumber) {
		Contract c = db.findContract(contractNumber);
		BigDecimal totalRevenue = c.getRevenue();
		Date recognitionDate = c.getDateSigned();//待确认的日期
		String type = c.getProduct().getType();
		if (type.equals("S")){
			BigDecimal result = BigDecimal.valueOf(totalRevenue.doubleValue()/3);
			db.saveRevenueRecognition(new RevenueRecognition(c, result, recognitionDate));
			db.saveRevenueRecognition(new RevenueRecognition(c, result, DateUtils.addDays(recognitionDate,60)));
			db.saveRevenueRecognition(new RevenueRecognition(c, result, DateUtils.addDays(recognitionDate,90)));
		}else if (type.equals("W")){
			db.saveRevenueRecognition(new RevenueRecognition(c, totalRevenue,recognitionDate));
		}else if (type.equals("D")) {
			BigDecimal result = BigDecimal.valueOf(totalRevenue.doubleValue()/3);
			db.saveRevenueRecognition(new RevenueRecognition(c, result, recognitionDate));
			db.saveRevenueRecognition(new RevenueRecognition(c, result, DateUtils.addDays(recognitionDate,30)));
			db.saveRevenueRecognition(new RevenueRecognition(c, result, DateUtils.addDays(recognitionDate,60)));
		}
	}
}
