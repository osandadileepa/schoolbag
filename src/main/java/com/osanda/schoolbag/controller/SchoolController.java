package com.osanda.schoolbag.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.osanda.schoolbag.model.School;
import com.osanda.schoolbag.service.SchoolService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "${spring.data.rest.base-path}/search/")
public class SchoolController {

	private final SchoolService schoolService;

	@GetMapping(value = "school")
	public ResponseEntity<?> searchSchoolsBySearchParams(@RequestParam(name = "criteria") String searchWord) {

		try {

			List<School> searcResult = this.schoolService.getSchoolsByNameAndAddress(searchWord);

			return ResponseEntity.ok(searcResult);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Eror get search results");
		}

	}// searchSchoolsBySearchParams()

}// SchoolController()
