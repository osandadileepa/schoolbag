package com.osanda.schoolbag.model;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

/***
 * Base model that can be used to extends every other class
 * 
 * @author Osanda Wedamulla
 *
 */

@Getter
@Setter
@MappedSuperclass
public abstract class BaseModel implements Serializable {

	private static final long serialVersionUID = 5955988220665592553L;

	@CreatedBy
	@JsonIgnore
	@Column(name = "created_by", nullable = true, length = 50, updatable = false)
	private String createdBy;

	@CreatedDate
	@JsonIgnore
	@Column(name = "created_date", nullable = true, updatable = false)
	private Instant createdDate = Instant.now();

	@LastModifiedBy
	@JsonIgnore
	@Column(name = "last_modified_by", length = 50)
	private String lastModifiedBy;

	@JsonIgnore
	@LastModifiedDate
	@Column(name = "last_modified_date")
	private Instant lastModifiedDate = Instant.now();

}// BaseModel {}