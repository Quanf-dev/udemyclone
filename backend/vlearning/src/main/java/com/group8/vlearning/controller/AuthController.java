package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.dto.request.LoginReq;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.domain.dto.response.UserAuth;
import com.group8.vlearning.service.UserService;
import com.group8.vlearning.util.error.CustomException;
import com.group8.vlearning.util.security.SecurityUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/v1")
public class AuthController {

        @Autowired
        private AuthenticationManagerBuilder authenticationManagerBuilder;

        @Autowired
        private SecurityUtil securityUtil;

        @Autowired
        private UserService userService;

        @PostMapping("/login")
        public ResponseEntity<ResponseDTO<UserAuth>> postMethodName(@RequestBody LoginReq userLogin)
                        throws CustomException {

                // Nạp input gồm username/password vào Security
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                userLogin.getLoginName(), userLogin.getPassword());

                // xác thực người dùng
                Authentication authentication = authenticationManagerBuilder.getObject()
                                .authenticate(authenticationToken);

                // lưu thông tin vào context
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // response custom
                User user = this.userService.handleFetchUserByLoginName(userLogin.getLoginName());

                UserAuth userAuth = new UserAuth(
                                user.getId(),
                                user.getEmail(),
                                user.getProfile() != null ? (user.getProfile().getFullName() != null
                                                ? user.getProfile().getFullName()
                                                : "") : "",
                                user.getProfile() != null ? (user.getProfile().getAvatar() != null
                                                ? user.getProfile().getAvatar()
                                                : "") : "",
                                user.getRole().getRoleValue(),
                                null);

                ResponseDTO<UserAuth> res = new ResponseDTO<>();
                res.setStatus(HttpStatus.OK.value());
                res.setMessage("Login success");

                // create token
                String accessToken = this.securityUtil.createAccessToken(userAuth);
                userAuth.setAccessToken(accessToken);
                res.setData(userAuth);

                return ResponseEntity.ok(res);
        }

}
