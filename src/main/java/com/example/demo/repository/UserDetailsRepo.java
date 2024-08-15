package com.example.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.UserDetails;

public interface UserDetailsRepo extends JpaRepository<UserDetails,Integer>{
        Optional<UserDetails> findByEmail(String email);

}
