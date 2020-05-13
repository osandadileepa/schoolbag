package com.osanda.schoolbag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.osanda.schoolbag.model.School;

@RepositoryRestResource(exported = true)
public interface SchoolRepository extends JpaRepository<School, Long> {

}
