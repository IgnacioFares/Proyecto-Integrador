package com.easyscore.config;

import com.easyscore.model.Rol;
import com.easyscore.model.User;
import com.easyscore.repository.RolRepository;
import com.easyscore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.annotation.PostConstruct;

@Configuration
public class AdminConfig {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        if (!userRepository.existsByEmail("admin@example.com")) {
            User admin = new User();
            admin.setNombre("admin");
            admin.setApellido("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@example.com");
            admin.setNumeroTelefono("1234567890");

            Rol adminRole = rolRepository.findByNombre("ADMIN");
            if (adminRole == null) {
                adminRole = new Rol();
                adminRole.setNombre("ADMIN");
                rolRepository.save(adminRole);
            }

            admin.setRol(adminRole);
            userRepository.save(admin);
        }
    }
}
