package cn.xca.repository.domainmodel;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import cn.xca.entity.domainmodel.RevenueRecognition;

@Component 
public class DbAccessing implements Accessing {
	@Autowired
	private RevenueRecognitionRepo revenueRecognitionRepo;
	@Override
	public void insert(RevenueRecognition revenueRecognition) {
		revenueRecognitionRepo.save(revenueRecognition);
	}
	@Override
	public long recognizedRevenue(Date asOf) {
		return revenueRecognitionRepo.findAll().stream().filter((r)->(r.isRecognizableBy(asOf))).mapToLong((r)->r.getAmount()).sum();
	}

}
