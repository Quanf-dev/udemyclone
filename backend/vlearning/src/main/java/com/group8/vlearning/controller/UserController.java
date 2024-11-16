package com.group8.vlearning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public ResponseEntity<ResponseDTO<User>> createUser(@RequestBody @Valid User user) {

        ResponseDTO<User> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Completed create user!");
        res.setData(user);
        res.setData(this.userService.handleCreateUser(user));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

}
