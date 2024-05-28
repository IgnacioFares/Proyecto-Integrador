package com.easyscore.jwt.service;

import com.easyscore.dto.UserDto;
import com.easyscore.model.Rol;
import com.easyscore.model.User;
import com.easyscore.repository.RolRepository;
import com.easyscore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (!userOpt.isPresent()) {
            throw new UsernameNotFoundException("Usuario no encontrado con el nombre de usuario: " + username);
        }
        User user = userOpt.get();
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (Rol rol : user.getRoles()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + rol.getNombre()));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    public User save(UserDto userDto) {
        User newUser = new User();
        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        newUser.setEmail(userDto.getEmail());
        newUser.setNumeroTelefono(userDto.getNumeroTelefono());

        Rol userRole = rolRepository.findByNombre("USER");
        if (userRole == null) {
            userRole = new Rol();
            userRole.setNombre("USER");
            userRole = rolRepository.save(userRole);
        }
        newUser.setRoles(Collections.singletonList(userRole));

        return userRepository.save(newUser);
    }

    public User saveAdmin(UserDto userDto) {
        User newUser = new User();
        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        newUser.setEmail(userDto.getEmail());
        newUser.setNumeroTelefono(userDto.getNumeroTelefono());

        Rol adminRole = rolRepository.findByNombre("ADMIN");
        if (adminRole == null) {
            adminRole = new Rol();
            adminRole.setNombre("ADMIN");
            adminRole = rolRepository.save(adminRole);
        }
        newUser.setRoles(Collections.singletonList(adminRole));

        return userRepository.save(newUser);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
