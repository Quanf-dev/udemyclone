package com.group8.vlearning.util.validator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = ExistValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME) // khi chương trình chạy thì nó cũng chạy
@Documented
public @interface Exist {

    String message() default "Empty entity";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
