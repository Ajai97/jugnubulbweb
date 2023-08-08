package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	@Query ("from Orders where buyer_id=?1 And isRemoveFromCart ='N'")
	public List<Orders> myOrders(int buyerId);
	
	@Modifying
	@Query ("UPDATE Orders SET is_orderd = 'Y' WHERE order_id = :orderId")
	public void placeOrder(@Param("orderId") int orderId);
}
