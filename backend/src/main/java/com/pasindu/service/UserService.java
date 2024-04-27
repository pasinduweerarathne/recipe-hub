package com.pasindu.service;


import com.pasindu.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public User findUserById(Long userId) throws Exception;

    public User findUserByJwt(String jwt) throws Exception;

}
