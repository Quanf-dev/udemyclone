package com.group8.vlearning.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.dto.request.StripeRequest;
import com.group8.vlearning.domain.dto.response.StripeResponse;
import com.group8.vlearning.service.CourseService;
import com.group8.vlearning.service.StripeService;
import com.group8.vlearning.util.error.CustomException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.net.Webhook;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/v1")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private CourseService courseService;

    private String endpointSecret = "whsec_A8Lt9R8YBu2jsxObm54qK7PouOuxokir";

    @PostMapping("/checkout")
    public ResponseEntity<StripeResponse> checkoutProduct(@RequestBody StripeRequest productRequest) {
        StripeResponse stripeResponse = stripeService.checkoutProducts(productRequest);
        return ResponseEntity.ok().body(stripeResponse);
    }

    @GetMapping("/success")
    public String success() {
        return "payment success";
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook2(@RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) throws CustomException {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Invalid signature");
        }
        // Handle the event
        if ("checkout.session.completed".equals(event.getType())) {
            Session session = (Session) event.getData().getObject();

            // Lấy metadata từ session
            Long productId = Long.parseLong(session.getMetadata().get("productId"));
            Long userId = Long.parseLong(session.getMetadata().get("userId"));
            System.out.println(">>>>>>>>>>>>>>>>>>" + productId + "," + userId);

            this.courseService.handlePurchaseCourse(userId, productId);
        }
        return ResponseEntity.ok().build();
    }

}
