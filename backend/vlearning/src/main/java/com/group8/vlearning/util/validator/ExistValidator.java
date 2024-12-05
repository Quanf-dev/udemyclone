package com.group8.vlearning.util.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.group8.vlearning.domain.User;
import com.group8.vlearning.service.UserService;
import com.group8.vlearning.util.error.CustomException;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistValidator implements ConstraintValidator<Exist, Object> {

    @Autowired
    private UserService userService;

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        if (value instanceof User user) {
            try {
                user = this.userService.handleFetchUser(user.getId());
            } catch (CustomException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            if (user == null)
                return false;
            else
                return true;
        }
        return false;

    }

}
