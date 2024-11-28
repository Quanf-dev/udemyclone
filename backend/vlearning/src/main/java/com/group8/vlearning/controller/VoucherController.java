package com.group8.vlearning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Voucher;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.VoucherService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/v1")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/voucher")
    public ResponseEntity<ResponseDTO<Voucher>> createVoucher(@RequestBody Voucher voucher) {

        ResponseDTO<Voucher> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create voucher success!");
        res.setData(this.voucherService.handleCreateVoucher(voucher));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

}
