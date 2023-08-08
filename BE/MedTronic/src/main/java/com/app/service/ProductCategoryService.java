package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ProductCategoryRepository;
import com.app.entity.ProductCategory;

@Transactional
@Service
public class ProductCategoryService {
	
	@Autowired
	ProductCategoryRepository productCategoryRepository;
	
	public List<ProductCategory> findAllCategory(){
		List<ProductCategory> categories=productCategoryRepository.findAll();
		return categories;
	}
}
