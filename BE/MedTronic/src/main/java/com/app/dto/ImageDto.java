package com.app.dto;

import org.springframework.web.multipart.MultipartFile;

public class ImageDto {
	private int id;
	private MultipartFile thumbnail;
	
	public ImageDto() {
		// TODO Auto-generated constructor stub
	}
	
	public ImageDto(int id, MultipartFile thumbnail) {
		super();
		this.id = id;
		this.thumbnail = thumbnail;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public MultipartFile getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(MultipartFile thumbnail) {
		this.thumbnail = thumbnail;
	}
	
}
