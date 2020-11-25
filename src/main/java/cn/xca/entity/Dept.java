package cn.xca.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Entity
@Table(name="t_dept")
@Data
public class Dept {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="dept_id")
	private Integer id;
	@JsonProperty("dName")
	@Column(name="dept_name")
	private String dName;
	@Column(name="address")
	private String loc;
}
