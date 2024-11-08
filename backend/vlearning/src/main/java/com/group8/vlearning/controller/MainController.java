package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class MainController {

    @GetMapping("/")
    public String main() {
        return "Hello world";
    }

}
