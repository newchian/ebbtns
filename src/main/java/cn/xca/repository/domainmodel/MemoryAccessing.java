package cn.xca.repository.domainmodel;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import cn.xca.entity.domainmodel.RevenueRecognition;

public class MemoryAccessing implements Accessing {
	private final List<RevenueRecognition> revenueRecognitions = new ArrayList<>();
	@Override
	public void insert(RevenueRecognition revenueRecognition) {
		revenueRecognitions.add(revenueRecognition);
	}
	@Override
	public long recognizedRevenue(Date asOf) {
		return revenueRecognitions.stream().filter((r)->(r.isRecognizableBy(asOf))).mapToLong((r)->r.getAmount()).sum();
	}

}
