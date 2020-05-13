package com.osanda.schoolbag.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.osanda.schoolbag.model.School;

@RepositoryRestResource(exported = true)
public interface SchoolRepository extends JpaRepository<School, Long> {

	List<School> findByName(String name);

	List<School> findByAdStreet(String Street);

	List<School> findByAdState(String state);

	List<School> findByAdSuburb(String suburb);

}
