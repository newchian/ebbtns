package cn.xca.repo;

import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.xca.MyApplication;
import cn.xca.entity.domainmodel.Contract;
import cn.xca.entity.domainmodel.Product;
import cn.xca.repository.domainmodel.Accessing;
import cn.xca.repository.domainmodel.RevenueRecognitionRepo;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes=MyApplication.class)
public class DomainModelTest2 {
	//springboot测试，测试用具使用final手动装配，但null指针，console不println
	@Autowired
	private RevenueRecognitionRepo revenueRecognitionRepo;
	private Product word;
  private Product calc;
  private Product db;
  //private final long revenue = 0;
  private Date whenSigned;
  private Date after65;
  @Autowired
	private Accessing accessing;
	private Contract wordContract;
	private Contract calcContract;
	private Contract dbContract;
	@Before // 在测试开始前初始化工作
  public void setup() {
		revenueRecognitionRepo.deleteAll();
		word = Product.newWordProcessor("Thinking Word");
	  calc = Product.newSpreadsheet("Thinking Calc");
	  db = Product.newDatabase("Thinking DB");
	  whenSigned = new Date();
	  after65 = DateUtils.addDays(whenSigned,65);
		wordContract = new Contract(word, 136, whenSigned, accessing);
		calcContract = new Contract(calc, 184, whenSigned, accessing);
		dbContract = new Contract(db, 234, whenSigned, accessing);
  }
	@Test
	public void revenueRecognition() {
		wordContract.calculateRecognitions();
		System.out.println(wordContract.recognizedRevenue(new Date()));
		revenueRecognitionRepo.deleteAll();
		calcContract.calculateRecognitions();
		System.out.println(calcContract.recognizedRevenue(after65));
		revenueRecognitionRepo.deleteAll();
		dbContract.calculateRecognitions();
		System.out.println(dbContract.recognizedRevenue(after65));
	}
}
