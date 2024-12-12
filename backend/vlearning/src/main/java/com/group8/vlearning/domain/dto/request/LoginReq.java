package com.group8.vlearning.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginReq {

    @NotBlank(message = "Login name không được để trống")
    private String loginName;

    @NotBlank(message = "Password không được để trống")
    private String password;
}
