package cn.xca.repository.domainmodel;

import org.springframework.data.mongodb.repository.MongoRepository;

import cn.xca.entity.domainmodel.RevenueRecognition;

public interface RevenueRecognitionRepo extends MongoRepository<RevenueRecognition, String> {

}
