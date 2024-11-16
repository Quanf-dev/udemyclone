package com.group8.vlearning.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDTO<T> {
    private Integer status;

    private String error;

    // message có thể là String hoặc ArrayList<String>, nghĩa là sẽ có 1 lỗi hoặc
    // nhiều lỗi
    private Object message;

    private T data;
}
