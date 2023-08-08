package com.app.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;


public class ProductDTO {
	private int productId;
	private UserDTO userDTO;
	private String productName;
	@Size(min=10,message="{product.invalid.discription}")
	private String discription;
	private ProductCategoryDTO productCategorydto;

	@Min(value=1,message= "{product.invalid.price}")
	private int price;
	private String image;
	private Boolean isSold;
	private String date;
	private String city;
	private String tags;
	
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
	}
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public UserDTO getUserDTO() {
		return userDTO;
	}
	public void setUserDTO(UserDTO user) {
		this.userDTO = user;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getDiscription() {
		return discription;
	}
	public void setDiscription(String discription) {
		this.discription = discription;
	}

	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Boolean getIsSold() {
		return isSold;
	}
	public void setIsSold(Boolean isSold) {
		this.isSold = isSold;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public ProductCategoryDTO getProductCategorydto() {
		return productCategorydto;
	}
	public void setProductCategorydto(ProductCategoryDTO productCategorydto) {
		this.productCategorydto = productCategorydto;
	}
	@Override
	public String toString() {
		return "\n"+ ", productName=" + productName+ "\n"
				+ ", discription=" + discription 
				+ "\n"+", productCategorydto=" + productCategorydto + "\n" +", price="  + "\n" +price  +"₹";
	}
	
	
}

