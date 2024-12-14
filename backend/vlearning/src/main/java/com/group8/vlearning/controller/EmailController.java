package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.dto.request.LoginReq;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.EmailService;

import java.net.http.HttpRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/v1")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Value("${verify-code-validity-in-seconds}")
    private Long codeExpireTime;

    @PostMapping("/email/register")
    public ResponseEntity<ResponseDTO<String>> sendEmailRegister(@RequestBody LoginReq userRegister) {

        String encoded = this.emailService.sendEmailFromTemplateSync(userRegister.getLoginName(),
                "Xác thực đăng ký để bắt đầu sử dụng VLearning", "register", userRegister.getLoginName());

        ResponseCookie responseCookie = ResponseCookie.from("code", encoded)
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(codeExpireTime)
                .build();

        ResponseDTO<String> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Send email success");
        res.setData(encoded);

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(res);
    }

    @GetMapping("/email/getcode")
    public String getMethodName(@CookieValue(name = "code") String code) {
        return code;
    }

}
