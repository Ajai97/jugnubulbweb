package com.app.dto;


public class OrdersDTO {
	private int orderId;
	private ProductDTO productdto;
	private UserDTO buyerdto ;
	private int amount;
	private char isOrderd;
	private String date;
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public ProductDTO getProductdto() {
		return productdto;
	}
	public void setProductdto(ProductDTO productdto) {
		this.productdto = productdto;
	}
	public UserDTO getBuyerdto() {
		return buyerdto;
	}
	public void setBuyerdto(UserDTO buyerdto) {
		this.buyerdto = buyerdto;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public char getIsOrderd() {
		return isOrderd;
	}
	public void setIsOrderd(char isOrderd) {
		this.isOrderd = isOrderd;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	

}
