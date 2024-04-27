package com.pasindu.service;

import com.pasindu.config.JwtProvider;
import com.pasindu.model.User;
import com.pasindu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Exception("User not found with ID " + userId);
        }
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        if (email == null) {
            throw new Exception("Provide a valid JWT token");
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User not found with email " + email);
        }

        return user;
    }
}
