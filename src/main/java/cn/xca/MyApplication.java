package cn.xca;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages={"cn.xca","com.xca"})
@MapperScan("cn.xca.mp.simple.mapper") //设置mapper接口的扫描包
@SpringBootApplication
public class MyApplication {
	public static void main(String[] args) {
    System.setProperty("es.set.netty.runtime.available.processors","false");
		SpringApplication.run(MyApplication.class, args);
	}
}
