package com.osanda.schoolbag.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.osanda.schoolbag.model.School;
import com.osanda.schoolbag.repository.SchoolRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchoolService {

	private final SchoolRepository schoolRepository;

	public List<School> getSchoolsByNameAndAddress(String searchKeyword) {

		if (searchKeyword == null) {
			return new ArrayList<>();
		}

		log.info("Searching for schools in key word : " + searchKeyword);

		List<School> nameList = this.schoolRepository.findByNameContainsIgnoreCase(searchKeyword);

		if (nameList == null) {

			List<School> streetList = this.schoolRepository.findByAdStreetContainsIgnoreCase(searchKeyword);

			if (streetList == null) {

				List<School> stateList = this.schoolRepository.findByAdStateContainsIgnoreCase(searchKeyword);

				if (stateList == null) {

					List<School> subrbrList = this.schoolRepository.findByAdSuburbContainsIgnoreCase(searchKeyword);

					if (subrbrList != null) {
						return subrbrList;
					}

				} else {
					return stateList;
				}

			} else {
				return streetList;
			}

		} else {
			return nameList;
		}

		return new ArrayList<>();

	}// getSchoolsByNameAndAddress()

}// SchoolService {}
