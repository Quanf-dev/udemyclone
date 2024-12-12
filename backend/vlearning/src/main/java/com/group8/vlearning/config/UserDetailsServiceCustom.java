package com.group8.vlearning.config;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.group8.vlearning.service.UserService;

@Component("userDetailsService")
public class UserDetailsServiceCustom implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String loginName) throws UsernameNotFoundException {
        try {
            com.group8.vlearning.domain.User user;
            user = this.userService.handleFetchUserByLoginName(loginName);

            return new User(user.getEmail(), user.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getRoleValue())));
        } catch (Exception e) {
            return null;
        }
    }

}
