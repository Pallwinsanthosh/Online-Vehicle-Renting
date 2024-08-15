package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import com.example.demo.model.UserDetails;
import com.example.demo.repository.UserDetailsRepo;

@Service
public class UserDetailsService {
    @Autowired
    public UserDetailsRepo userDetailsRepo;

    public UserDetails saveUserdetails(UserDetails user) {
        return userDetailsRepo.save(user);
    }
    
     public Optional<UserDetails> findUserByEmail(String email) {
        return userDetailsRepo.findByEmail(email); // Assuming userRepository has a findByEmail method
    }


}
