package cn.xca.entity.domainmodel;

import java.math.BigDecimal;

import org.apache.commons.lang3.time.DateUtils;

public class ThreeWayRecognitionStrategy implements RecognitionStrategy {
	private int firstRecognitionOffset;
	private int secondRecognitionOffset;
	public ThreeWayRecognitionStrategy(int firstRecognitionOffset, int secondRecognitionOffset) {
		this.firstRecognitionOffset = firstRecognitionOffset;
    this.secondRecognitionOffset = secondRecognitionOffset;
	}
	@Override
	public void calculateRevenueRecognitions(Contract contract) {
		 long[] allocation = new long[3];
		 for(int i=0;i<3;i++)
			 allocation[i] = contract.getRevenue()/3;
     contract.addRevenueRecognition(new RevenueRecognition
           (allocation[0], contract.getWhenSigned()));
     contract.addRevenueRecognition(new RevenueRecognition
           (allocation[1], DateUtils.addDays(contract.getWhenSigned(), firstRecognitionOffset)));
     contract.addRevenueRecognition(new RevenueRecognition
           (allocation[2], DateUtils.addDays(contract.getWhenSigned(), secondRecognitionOffset)));
	}
	private BigDecimal[] allocate(BigDecimal amount, int by) {
		BigDecimal lowResult = amount.divide(BigDecimal.valueOf(by), BigDecimal.ROUND_HALF_EVEN) ;
		BigDecimal highResult = lowResult.add(BigDecimal.valueOf(0.01));
		BigDecimal[] results = new BigDecimal[by];
    int remainder = (int) amount.longValue() % by;
    for(int i = 0; i < remainder; i++) results[i] = highResult;
    for(int i = remainder; i < by; i++) results[i] = lowResult;
    return results;
  }

}
