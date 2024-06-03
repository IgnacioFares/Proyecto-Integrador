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

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public void addRoleToUser(Long id, String roleName) {
        Optional<User> userOpt = userRepository.findById(id);
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
