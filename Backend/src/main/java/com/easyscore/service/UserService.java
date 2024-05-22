package com.easyscore.service;

import com.easyscore.model.Rol;
import com.easyscore.model.User;
import com.easyscore.repository.RolRepository;
import com.easyscore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolRepository rolRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    public void addRoleToUser(String username, String roleName) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Rol role = rolRepository.findByNombre(roleName);
            if (role == null) {
                role = new Rol();
                role.setNombre(roleName);
                rolRepository.save(role);
            }
            user.getRoles().add(role);
            userRepository.save(user);
        }
    }
}

