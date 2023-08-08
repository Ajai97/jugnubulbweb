 package com.app.rest;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.OrdersRepository;
import com.app.dto.OrdersDTO;
import com.app.dto.UserDTO;
import com.app.entity.Orders;
import com.app.entity.Product;
import com.app.service.EmailServiceImpl;
import com.app.service.OrdersService;
import com.app.service.ProductService;
import com.app.utility.CustomException;

@Transactional
@CrossOrigin
@RestController
@RequestMapping("/orders-api")
public class OrdersRestController {
	
	@Autowired
	private OrdersRepository ordersRepository;
	
	@Autowired
	private OrdersService ordersservice;
	
	@Autowired
	private EmailServiceImpl emailServiceImpl;
	@Autowired
	private ProductService productService;
	
	@GetMapping("/orders")
	public ResponseEntity<List<Orders>> getorders() {
		return new ResponseEntity<>(ordersRepository.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("/orders/{id}")
	public ResponseEntity<Optional<Orders>> getuser(@PathVariable int id) {
		Optional<Orders> order=ordersRepository.findById(id);
		return new ResponseEntity<>(order,HttpStatus.OK);
	}
	
	@PostMapping("/orders")
	public ResponseEntity<Orders> addOrders(@RequestBody OrdersDTO ordersdto) throws Exception {
		Orders orders=ordersservice.addOrders(ordersdto);
		return new ResponseEntity<>(orders,HttpStatus.OK);

	}
	
	@PostMapping("/myorders")
	public ResponseEntity<List<Orders>> myOrders(@RequestBody UserDTO userdto) throws Exception {
		List<Orders> orders=ordersservice.myOrders(userdto);
		return new ResponseEntity<>(orders,HttpStatus.OK);

	}
	
	@PostMapping("/placeOrder")
	public ResponseEntity<String> placeOrder(@RequestBody OrdersDTO ordersdto) throws Exception {
		ordersservice.placeOrder(ordersdto);
		  Calendar calendar = Calendar.getInstance();
		    calendar.add(Calendar.DATE, 5);
		    Date DeliveryDate = calendar.getTime();
	Product productDetails = productService.getProductInfo(ordersdto.getProductdto().getProductId());
	emailServiceImpl.sendSimpleMessage(ordersdto.getBuyerdto().getEmail(), " MedTronic : Order Shipped ", productDetails.toString()+"\n is  placed. \n "
		+"\n Expected Arriaval Date : "+ DeliveryDate	+"\n Payment will we collected in cash at your place. \n Thanks for Ordering ");
		return new ResponseEntity<>(HttpStatus.OK);

	}
	@DeleteMapping("/removeProductFromCart/{orderId}")
	public ResponseEntity<String> removeProductFromCart(@PathVariable Integer orderId ) throws CustomException{
		return new ResponseEntity<>(ordersservice.removeProductFromCart(orderId),HttpStatus.OK); 
		
	}
}
