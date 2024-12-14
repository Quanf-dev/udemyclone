package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.dto.request.LoginReq;
import com.group8.vlearning.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/v1")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/email/register")
    public String sendEmailRegister(@RequestBody LoginReq userRegister) {

        this.emailService.sendEmailFromTemplateSync(userRegister.getLoginName(),
                "Xác thực đăng ký để bắt đầu sử dụng VLearning", "register", userRegister.getLoginName());

        return "";
    }

}
