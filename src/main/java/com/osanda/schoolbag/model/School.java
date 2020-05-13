package com.osanda.schoolbag.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/***
 * 
 * model includes the basic information relevant to a new school
 * 
 * @author Osanda Wedamulla
 *
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "school")
public class School extends BaseModel {

	private static final long serialVersionUID = -114769811185254887L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private Integer studentSize;

	private String adStreet;
	private String adSuburb;
	private String adPostcode;
	private String adState;

	private Boolean active = true;

}
