package com.easyscore.service;



import com.easyscore.jwt.model.JwtRequest;
import com.easyscore.jwt.model.JwtResponse;
import com.easyscore.jwt.service.JwtUserDetailsService;
import com.easyscore.jwt.util.JwtUtil;
import com.easyscore.model.User;
import com.easyscore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public JwtResponse authenticate(JwtRequest jwtRequest) throws Exception {
        authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(jwtRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails);

        return new JwtResponse(token);
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (Exception e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}

