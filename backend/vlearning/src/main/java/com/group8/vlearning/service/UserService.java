package com.group8.vlearning.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group8.vlearning.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

}
