package lianshou;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

import org.apache.commons.lang3.time.DateUtils;
import org.junit.Test;

import cn.hutool.core.date.DateUtil;
import cn.xca.entity.cecezhipin.Chat;

public class BasePatternsTest {
	private BigDecimal[] allocate(BigDecimal amount, int by) {
		BigDecimal lowResult = amount.divide(BigDecimal.valueOf(by), BigDecimal.ROUND_HALF_EVEN) ;
		BigDecimal highResult = lowResult.add(BigDecimal.valueOf(0.01));
		BigDecimal[] results = new BigDecimal[by];
    int remainder = (int) amount.longValue() % by;
    for(int i = 0; i < remainder; i++) results[i] = highResult;
    for(int i = remainder; i < by; i++) results[i] = lowResult;
    return results;
  }
	@Test
	public void testZaxiang() {
//		List<String> l = Arrays.asList("bbb","aaa").stream().peek(System.out::println).sorted().peek(System.out::println).collect(java.util.stream.Collectors.toList());
//		System.out.println(String.join("_", l));
//		System.out.println(DateUtil.currentSeconds());
//		System.out.println(DateUtil.offsetDay(new Date(), 1).getTime() / 1000);
//		System.out.println(DateUtil.currentSeconds() < DateUtil.offsetDay(new Date(), 1).getTime() / 1000);
		
	}
	@Test
	public void testAllocate() {
		BigDecimal[] allocate = allocate(BigDecimal.valueOf(123),3);
		System.out.println(allocate[0].doubleValue());
		System.out.println(allocate[1].doubleValue());
		System.out.println(allocate[2].doubleValue());
	}
	@Test
	public void testBigDecimalAdd() {
		BigDecimal result = BigDecimal.valueOf(0);
		int z = 0;
		for(int i=0; i<10;i++){
			z+=i;
			result=result.add(BigDecimal.valueOf(i));
		}
		System.out.println(result.longValue()+":"+z);
	}
	@Test
	public void testBigDecimal() {
		//System.out.println(BigDecimal.valueOf(280.84).divide(BigDecimal.valueOf(3.00)));
		System.out.println(BigDecimal.valueOf(280.84).longValue());
		System.out.println(BigDecimal.valueOf(280.84).doubleValue());
		System.out.println(BigDecimal.valueOf(BigDecimal.valueOf(280.84).doubleValue()/3));
		BigDecimal result;
		result = BigDecimal.valueOf(.00).add(BigDecimal.valueOf(13.2));//不改动原对象而是返回一个新对象
		System.out.println(result);
		result = BigDecimal.valueOf(0);
		result.add(BigDecimal.valueOf(13));
		System.out.println(result.longValue());
		//MoneyUtils
	}
	@Test
	public void testDate() {
		System.out.println(new Date().getTime());
		System.out.println(60*24*60*60*1000);
		System.out.println(new Date());
		System.out.println(new Date(new Date().getTime()+60*24*60*60*1000));
		System.out.println(DateUtils.addDays(new Date(), 60));
		System.out.println(DateUtils.addDays(new Date(), 60).after(new Date()));
		System.out.println(DateUtils.isSameDay(DateUtils.addDays(new Date(), 60), new Date()));
		System.out.println(DateUtils.isSameDay(DateUtils.addDays(new Date(), 60), DateUtils.addDays(new Date(), 60)));
		System.out.println(DateUtils.isSameDay(new Date(), new Date()));
	}
}
