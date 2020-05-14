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

	/***
	 * search a school by search word entered and igoring the case based on that
	 * word contain in school name or address
	 * 
	 * @author Osanda Wedamulla
	 * 
	 * @param searchKeyword
	 * @return
	 */
	public List<School> getSchoolsByNameAndAddress(String searchKeyword) {

		if (searchKeyword == null) {
			return new ArrayList<>();
		}

		log.info("Searching for schools in key word : " + searchKeyword);

		List<School> nameList = this.schoolRepository.findByNameContainsIgnoreCase(searchKeyword);

		if (nameList == null || nameList.size() == 0) {

			List<School> streetList = this.schoolRepository.findByAdStreetContainsIgnoreCase(searchKeyword);

			if (streetList == null || streetList.size() == 0) {

				List<School> stateList = this.schoolRepository.findByAdStateContainsIgnoreCase(searchKeyword);

				if (stateList == null || stateList.size() == 0) {

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
