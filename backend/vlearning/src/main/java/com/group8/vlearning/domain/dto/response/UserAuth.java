package com.group8.vlearning.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAuth {

    private Long id;

    private String email;

    private String fullName;

    private String avatar;

    private String role;

    private boolean active;

    private String accessToken;
}
