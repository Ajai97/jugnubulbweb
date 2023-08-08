package com.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.OrdersRepository;
import com.app.dao.ProductRepository;
import com.app.dao.UserRepository;
import com.app.dto.OrdersDTO;
import com.app.dto.UserDTO;
import com.app.entity.Orders;
import com.app.entity.Product;
import com.app.entity.User;
import com.app.utility.CustomException;

@Service
public class OrdersService {
	@Autowired
	OrdersRepository ordersRepository;
	@Autowired
	ProductRepository productRepository;
	@Autowired
	UserRepository userRepository;
	
	
	public Orders addOrders(OrdersDTO ordersdto) throws CustomException {
		Orders orders=new Orders();
		
		Optional<Product> optionalproduct=productRepository.findById(ordersdto.getProductdto().getProductId());
		Product product=optionalproduct.orElseThrow(() -> new CustomException("Product.not.found"));
				
		Optional<User> optionalbuyer=userRepository.findById(ordersdto.getBuyerdto().getUserId());
		User buyer = optionalbuyer.orElseThrow(() -> new CustomException("Buyer.not.found"));
		
		orders.setProduct(product);
		orders.setBuyer(buyer);
		orders.setIsOrderd(ordersdto.getIsOrderd());
		orders.setAmount(ordersdto.getAmount());
		orders.setDate(LocalDateTime.now());
		orders.setIsRemoveFromCart('N');
		orders=ordersRepository.save(orders);
		return orders;
		
	}
	
	public List<Orders> myOrders(UserDTO userdto) throws CustomException{
		List<Orders> orders=ordersRepository.myOrders(userdto.getUserId());
		if (orders.isEmpty()) throw new CustomException("Orders.NoOrdersToDisplay");
		return orders;
	}
	
	public void placeOrder(OrdersDTO ordersdto) throws CustomException{
		ordersRepository.placeOrder(ordersdto.getOrderId());

	}

	public String removeProductFromCart(Integer orderId) {
		
		 Orders order = ordersRepository.findById(orderId).orElse(null);
	    order.setIsRemoveFromCart('Y');
	   return "Product removed from cart Successfully";
	}
	
	
}
