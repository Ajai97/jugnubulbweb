package com.app.utility;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHndlerGlobal {
	@Autowired
	Environment env;
	@ExceptionHandler({MethodArgumentNotValidException.class,ConstraintViolationException.class})
	public ResponseEntity<Errorinfo> exceptionHandler(Exception e){
		Errorinfo erinfo=new Errorinfo();
		erinfo.setErMessage(env.getProperty(e.getMessage())+e.getMessage());
//		erinfo.setErMessage("Mobile number is wrong");
		erinfo.setErCode(HttpStatus.BAD_REQUEST.value());
		return new ResponseEntity<>(erinfo,HttpStatus.BAD_REQUEST);
		
	}
	
	@ExceptionHandler(CustomException.class)
	public ResponseEntity<Errorinfo> CustomExceptionHandler(Exception e){
		Errorinfo erinfo=new Errorinfo();
		erinfo.setErMessage(env.getProperty(e.getMessage()));
//		erinfo.setErMessage("Mobile number is wrong");
		erinfo.setErCode(HttpStatus.BAD_REQUEST.value());
		return new ResponseEntity<>(erinfo,HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Errorinfo> generalExceptionHandler(Exception e){
		Errorinfo erinfo=new Errorinfo();
		erinfo.setErMessage(e.getMessage());
//		erinfo.setErMessage("Mobile number is wrong");
		erinfo.setErCode(HttpStatus.BAD_REQUEST.value());
		return new ResponseEntity<>(erinfo,HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
}
