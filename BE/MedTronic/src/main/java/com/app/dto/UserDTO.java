package com.app.dto;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserDTO {
	
	private int userId;
//	@Pattern(regexp="([A-Za-z])+(\\s[A-Za-z]+)*",message="{user.invalid.name}")
	private String userName;
	@NotNull
	private String email;
	@Pattern(regexp="[0-9]+",message="{user.invalid.mobileno}")
	@Size(min=10,message="${user.invalid.mobileno}")
	private String mobileno;
	@Pattern(regexp=".*[A-Z]+.*",message="{user.invalid.password.uppercase}")
	@Pattern(regexp=".*[0-9]+.*",message="{user.invalid.password.number}")
	@Pattern(regexp=".*[a-z]+.*",message="{user.invalid.password.lowercase}")
	private String password;
	private int question;
	private String answer;
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getQuestion() {
		return question;
	}

	public void setQuestion(int question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
}


