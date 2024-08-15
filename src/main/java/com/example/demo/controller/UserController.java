package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public User registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
    
    @GetMapping("/userst")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/login/{email}/{password}")
    public ResponseEntity<User> getCredential(@PathVariable String email, @PathVariable String password) {
        Optional<User> user = userService.findUser(email, password);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
    }
    
    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.findUserByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        }
    }

    @PutMapping("/user/{email}")
public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User updatedUser) {
    Optional<User> userOptional = userService.findUserByEmail(email);
    if (userOptional.isPresent()) {
        User user = userOptional.get();
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail()); // Update email
        user.setPassword(updatedUser.getPassword());
        // Do not set phone field
        User updated = userService.saveUser(user);
        return ResponseEntity.ok(updated);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
    }

}


}