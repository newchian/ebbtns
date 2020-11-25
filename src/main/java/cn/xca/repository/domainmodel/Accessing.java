package cn.xca.repository.domainmodel;

import java.util.Date;

import cn.xca.entity.domainmodel.RevenueRecognition;

public interface Accessing {
	void insert(RevenueRecognition revenueRecognition);
	long recognizedRevenue(Date asOf);
}
