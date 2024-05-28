package com.easyscore.controller;



import com.easyscore.dto.UserDto;
import com.easyscore.model.User;
import com.easyscore.service.UserService;
import com.easyscore.jwt.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public User createUser(@RequestBody UserDto userDto) {
        return userDetailsService.save(userDto);
    }

    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody UserDto userDto) {
        return userService.findByUsername(username)
                .map(user -> {
                    user.setUsername(userDto.getUsername());
                    user.setPassword(userDto.getPassword());
                    user.setEmail(userDto.getEmail());
                    user.setNumeroTelefono(userDto.getNumeroTelefono());
                    User updatedUser = userService.save(user); // Cambié a userService.save(user)
                    return ResponseEntity.ok(updatedUser);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        return userService.findByUsername(username)
                .map(user -> {
                    userService.deleteByUsername(username);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
