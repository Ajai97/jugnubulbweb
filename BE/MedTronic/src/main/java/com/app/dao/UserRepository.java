package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query ("from User where email=?1 and password=?2")
	public List<User> getUser(String email, String password);
	
	@Query ("from User where email=?1")
	public List<User> findByEmail(String email);
}
