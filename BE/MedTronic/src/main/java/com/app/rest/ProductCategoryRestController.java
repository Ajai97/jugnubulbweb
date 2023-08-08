package com.app.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.ProductCategory;
import com.app.service.ProductCategoryService;

@CrossOrigin
@RestController
@RequestMapping("/productCategory-api")
public class ProductCategoryRestController {
	
	@Autowired
	ProductCategoryService productCategoryService;
	
	@GetMapping("/all-categories")
	public ResponseEntity<List<ProductCategory>> findAllCategory() {
		return new ResponseEntity<>(productCategoryService.findAllCategory(),HttpStatus.OK);
	}
}
