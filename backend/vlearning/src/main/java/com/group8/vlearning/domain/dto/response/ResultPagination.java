package com.group8.vlearning.domain.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultPagination {
    private Object result;

    private Meta meta;

    @Getter
    @Setter
    public static class Meta {
        // số trang hiện tại
        private int page;

        // số lượng phần tử tối đa mỗi trang
        private int size;

        // tổng số trang
        private int totalPage;

        // tổng số phần tử
        private long totalElement;
    }
}
