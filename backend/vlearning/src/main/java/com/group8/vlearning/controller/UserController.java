package com.group8.vlearning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.domain.dto.response.ResultPagination;
import com.group8.vlearning.service.UserService;
import com.group8.vlearning.util.error.CustomException;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public ResponseEntity<ResponseDTO<User>> createUser(@RequestBody @Valid User user) {

        ResponseDTO<User> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create user success!");
        res.setData(this.userService.handleCreateUser(user));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<ResponseDTO<User>> fetchUser(@PathVariable Long id) throws CustomException {

        if (this.userService.handleFetchUser(id) == null) {
            throw new CustomException("User not found!");
        }

        ResponseDTO<User> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Completed fetch user!");
        res.setData(this.userService.handleFetchUser(id));

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/users")
    public ResponseEntity<ResponseDTO<ResultPagination>> fetchSeveralUsers(@Filter Specification<User> spec,
            Pageable pageable) {

        ResponseDTO<ResultPagination> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Completed fetch several users!");
        res.setData(this.userService.handleFetchSeveralUser(spec, pageable));

        return ResponseEntity.ok().body(res);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteUser(@PathVariable long id) throws CustomException {

        if (this.userService.handleFetchUser(id) == null) {
            throw new CustomException("User not found!");
        }

        this.userService.handleDeleteUser(id);

        ResponseDTO<Object> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Completed delete user!");

        return ResponseEntity.ok().body(res);
    }

    @PutMapping("/user")
    public ResponseEntity<ResponseDTO<User>> updateUser(@RequestBody User user) throws CustomException {
        ResponseDTO<User> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Update user success!");
        res.setData(this.userService.handleUpdateUser(user));

        return ResponseEntity.ok().body(res);
    }

}
