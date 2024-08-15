package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
// import com.example.demo.model.User;
import com.example.demo.model.UserDetails;
import com.example.demo.service.UserDetailsService;
import java.util.Optional;
@CrossOrigin
@RestController
public class UserDetailsController {
    @Autowired
    public UserDetailsService userDetailsService;

    @PostMapping("/usersdetails")
    public UserDetails registerUser(@RequestBody UserDetails user) {
        return userDetailsService.saveUserdetails(user);
    }
    
        @GetMapping("/userdetails/{email}")
    public ResponseEntity<UserDetails> getUserByEmail(@PathVariable String email) {
        Optional<UserDetails> user = userDetailsService.findUserByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        }
    }
    
}
