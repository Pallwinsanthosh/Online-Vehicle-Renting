package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Bike;
import com.example.demo.model.User;
import com.example.demo.service.BikeService;

@CrossOrigin
@RestController
public class BikeController {

    @Autowired
    private BikeService bikeService;

    @GetMapping("/bike")
    public List<Bike> getALLBikes() {
        return bikeService.getALLBikes();
    }

    @PostMapping("/bikes")
    public Bike addBike(@RequestBody Bike bike) {
        return bikeService.saveBike(bike);
    }
    
    @GetMapping("/bike/email/{email}")
    public List<Bike> getBikesByEmail(@PathVariable String email) {
        return bikeService.getBikesByEmail(email);
    }
//         @PutMapping("/user/{email}")
// public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User updatedUser) {
//     Optional<User> userOptional = bikeService.getBikesByEmail(email);
//     if (userOptional.isPresent()) {
//         User user = userOptional.get();
//         user.setName(updatedUser.getName());
//         user.setEmail(updatedUser.getEmail()); // Update email
//         user.setPassword(updatedUser.getPassword());
//         // Do not set phone field[]
//         User updated = bikeService.saveBike(user);
//         return ResponseEntity.ok(updated);
//     } else {
//         return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
//     }
    @DeleteMapping("/aa/{email}")
    public void delete(@PathVariable String email)
    {
        bikeService.deletevehicle(email);
    }

}