package com.easyscore.controller;

import com.easyscore.dto.UserDto;
import com.easyscore.jwt.service.BlacklistTokenService;
import com.easyscore.jwt.service.JwtUserDetailsService;
import com.easyscore.jwt.util.JwtUtil;
import com.easyscore.jwt.model.JwtRequest;
import com.easyscore.jwt.model.JwtResponse;
import com.easyscore.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BlacklistTokenService blacklistTokenService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody UserDto user) throws Exception {
        user.setRol("USER"); // Rol USER por default
        ResponseEntity<?> response = ResponseEntity.ok(userDetailsService.save(user));
        emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String username = jwtUtil.getUsernameFromToken(token);
        blacklistTokenService.blacklistToken(token, username);
        return ResponseEntity.ok("Su sesión se ha cerrado con éxito");
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
