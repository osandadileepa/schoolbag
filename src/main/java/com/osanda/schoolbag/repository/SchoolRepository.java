package com.osanda.schoolbag.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.osanda.schoolbag.model.School;

@RepositoryRestResource(exported = true)
public interface SchoolRepository extends JpaRepository<School, Long> {

	List<School> findByNameContainsIgnoreCase(String name);

	List<School> findByAdStreetContainsIgnoreCase(String Street);

	List<School> findByAdStateContainsIgnoreCase(String state);

	List<School> findByAdSuburbContainsIgnoreCase(String suburb);

}
