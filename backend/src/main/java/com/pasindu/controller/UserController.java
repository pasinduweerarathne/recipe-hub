package com.pasindu.controller;

import com.pasindu.model.User;
import com.pasindu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/profile")
    public User findUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        return userService.findUserByJwt(jwt);
    }

}
