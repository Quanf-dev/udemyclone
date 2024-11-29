package com.group8.vlearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Voucher;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.VoucherService;
import com.group8.vlearning.util.error.CustomException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

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

    @GetMapping("/voucher/{id}")
    public ResponseEntity<ResponseDTO<Voucher>> fetchVoucher(@PathVariable Long id) throws CustomException {
        if (this.voucherService.handleFetchVoucher(id) == null) {
            throw new CustomException("Voucher not found!");
        }

        ResponseDTO<Voucher> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch voucher success!");
        res.setData(this.voucherService.handleFetchVoucher(id));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/vouchers")
    public ResponseEntity<ResponseDTO<List<Voucher>>> fetchSeveralVouchers() {
        ResponseDTO<List<Voucher>> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch several vouchers success!");
        res.setData(this.voucherService.handleFetchSeveralsVoucher());

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/voucher/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteVoucher(@PathVariable Long id) throws CustomException {
        if (this.voucherService.handleFetchVoucher(id) == null) {
            throw new CustomException("Voucher not found!");
        }

        this.voucherService.handleDeleteVoucher(id);

        ResponseDTO<Object> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete voucher success!");

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
