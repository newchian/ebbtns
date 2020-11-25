package lianshou.poeaa;

import java.util.Date;

import org.apache.commons.lang3.time.DateUtils;
import org.junit.Test;

import cn.xca.entity.domainmodel.Contract;
import cn.xca.entity.domainmodel.Product;
import cn.xca.repository.domainmodel.MemoryAccessing;

public class DomainModelTest {
	private final Product word = Product.newWordProcessor("Thinking Word");
  private final Product calc = Product.newSpreadsheet("Thinking Calc");
  private final Product db = Product.newDatabase("Thinking DB");
  //private final long revenue = 0;
  private final Date whenSigned = new Date();
  private final Date after65 = DateUtils.addDays(whenSigned,65);
	private final Contract wordContract = new Contract(word, 136, whenSigned, new MemoryAccessing());
	private final Contract calcContract = new Contract(calc, 184, whenSigned, new MemoryAccessing());
	private final Contract dbContract = new Contract(db, 234, whenSigned, new MemoryAccessing());
	@Test
	public void revenueRecognition() {
		wordContract.calculateRecognitions();
		System.out.println(wordContract.recognizedRevenue(new Date()));
		calcContract.calculateRecognitions();
		System.out.println(calcContract.recognizedRevenue(after65));
		dbContract.calculateRecognitions();
		System.out.println(dbContract.recognizedRevenue(after65));
	}
}
