package com.group8.vlearning.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StripeRequest {
    private Long amount;
    private Long quantity;
    private String currency;
    private Long productId;
    private String name;
    private Long userId;

}
