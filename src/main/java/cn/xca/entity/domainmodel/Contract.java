package cn.xca.entity.domainmodel;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import cn.xca.repository.domainmodel.Accessing;

public class Contract {
	private Product product;
  private long revenue;
  private Date whenSigned;
	@Autowired
	private Accessing accessing;
	public Contract(Product product, long revenue, Date whenSigned) {
    this.product = product;
    this.revenue = revenue;
    this.whenSigned = whenSigned;
	}
	public Contract(Product product, int revenue, Date whenSigned, Accessing accessing) {
		this(product, revenue, whenSigned);
		this.accessing = accessing;
		System.out.println("this.accessHelper=" + this.accessing);
	}
	public void calculateRecognitions() {
		product.calculateRevenueRecognitions(this);
	}
	public void addRevenueRecognition(RevenueRecognition revenueRecognition) {
		/*if(revenueRecognitionRepo != null)revenueRecognitionRepo.save(revenueRecognition);
		else revenueRecognitions.add(revenueRecognition);*/
		this.accessing.insert(revenueRecognition);
	}
	public Date getWhenSigned() {
		return whenSigned;
	}
	public long getRevenue() {
		return revenue;
	}
	public long recognizedRevenue(Date asOf) {
		/*if(revenueRecognitionRepo != null)revenueRecognitions = revenueRecognitionRepo.findAll();
		return revenueRecognitions.stream().filter((r)->(r.isRecognizableBy(asOf))).mapToLong((r)->r.getAmount()).sum();*/
		return this.accessing.recognizedRevenue(asOf);
	}

}
