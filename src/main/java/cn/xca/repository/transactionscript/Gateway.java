package cn.xca.repository.transactionscript;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.mongodb.client.result.DeleteResult;

import cn.xca.entity.transactionscript.Contract;
import cn.xca.entity.transactionscript.Product;
import cn.xca.entity.transactionscript.RevenueRecognition;
@Component
public class Gateway {
	@Autowired
	private MongoTemplate mongoTemplate;
	public Product saveProduct(Product product) {
		return mongoTemplate.save(product);
	}
	public Product findProductById(String id) {
		Query query = Query.query(Criteria.where("id").is(id));
		return this.mongoTemplate.findOne(query, Product.class);
	}
	public Product findProductByType(String type) {
		Query query = Query.query(Criteria.where("type").is(type));
		return this.mongoTemplate.findOne(query, Product.class);
	}
	public Contract saveContract(Contract contract) {
		return mongoTemplate.save(contract);
	}
	public Contract findContract(String contractNumber) {
		Query query = Query.query(Criteria.where("id").is(contractNumber));
		return this.mongoTemplate.findOne(query, Contract.class);
	}
	public RevenueRecognition saveRevenueRecognition(RevenueRecognition revenueRecognition) {
		return mongoTemplate.save(revenueRecognition);
	}
	public List<RevenueRecognition> findRecognitionsFor(String contractNumber, Date asof) {
    Query query = Query.query(Criteria.where("id").is(contractNumber));
		Contract contract = mongoTemplate.findOne(query, Contract.class);
		List<RevenueRecognition> rrList = mongoTemplate.findAll(RevenueRecognition.class);
		List<RevenueRecognition> result = new ArrayList<>();
		for(RevenueRecognition rr: rrList) {
			if(contract!=null&&rr.getContract().equals(contract)&&(DateUtils.isSameDay(asof,rr.getRecognizedOn())||asof.after(rr.getRecognizedOn())))
			  result.add(rr);
		}
		return result;
	}
	public List<RevenueRecognition> findAllRecognitions() {
		return mongoTemplate.findAll(RevenueRecognition.class);
	}
	public DeleteResult removeAllRevenueRecognition() {
		/*List<RevenueRecognition> list = mongoTemplate.findAll(RevenueRecognition.class);
		for(RevenueRecognition rr : list) {
			mongoTemplate.remove(rr);
		}*/
		return mongoTemplate.remove(RevenueRecognition.class).all();
	}
}
