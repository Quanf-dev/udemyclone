package com.group8.vlearning.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.dto.request.StripeRequest;
import com.group8.vlearning.domain.dto.response.StripeResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class StripeService {

        @Value("${stripe.secretKey}")
        private String stripeSecretKey;

        @Value("${domain-name}")
        private String domainName;

        public StripeResponse checkoutProducts(StripeRequest productRequest) {
                Stripe.apiKey = stripeSecretKey;

                SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData
                                .builder()
                                .setName(productRequest.getName())
                                .build();

                // Create new line item with the above product data and associated price
                SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency(productRequest.getCurrency() != null ? productRequest.getCurrency()
                                                : "VND")
                                .setUnitAmount(productRequest.getAmount())
                                .setProductData(productData)
                                .build();

                // Create new line item with the above price data
                SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                                .setQuantity(productRequest.getQuantity())
                                .setPriceData(priceData)
                                .build();

                SessionCreateParams params = SessionCreateParams.builder()
                                .setMode(SessionCreateParams.Mode.PAYMENT)
                                .setSuccessUrl("http://localhost:5173/success")
                                .setCancelUrl(domainName + "/v1/cancel")
                                .addLineItem(lineItem)
                                .putMetadata("productId", productRequest.getProductId() + "") // Thêm ID sản phẩm vào
                                                                                              // metadata
                                .putMetadata("userId", productRequest.getUserId() + "") // Thêm tên sản phẩm nếu cần
                                .build();

                Session session = null;

                try {
                        session = Session.create(params);
                } catch (StripeException e) {
                        return StripeResponse.builder()
                                        .status("Failed")
                                        .message(e.getMessage())
                                        .sessionId(null)
                                        .sessionUrl(null)
                                        .build();
                }

                return StripeResponse.builder()
                                .status("Success")
                                .message("Payment session created")
                                .sessionId(session.getId())
                                .sessionUrl(session.getUrl())
                                .build();
        }
}
