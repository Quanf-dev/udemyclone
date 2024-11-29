package com.group8.vlearning.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.UserVoucherProgress;
import com.group8.vlearning.domain.Voucher;
import com.group8.vlearning.repository.UserRepository;
import com.group8.vlearning.repository.voucher.UserVoucherProgressRepository;
import com.group8.vlearning.repository.voucher.VoucherRepository;
import com.group8.vlearning.util.constant.ProgressEnum;

@Service
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private UserVoucherProgressRepository userVoucherProgressRepository;

    @Autowired
    private UserRepository userRepository;

    public Voucher handleCreateVoucher(Voucher voucher) {

        this.voucherRepository.save(voucher);

        List<User> users = this.userRepository.findAll();
        for (User user : users) {
            UserVoucherProgress pro = new UserVoucherProgress();
            pro.setUser(user);
            pro.setVoucher(voucher);
            pro.setProgress(0);
            pro.setStatus(ProgressEnum.INCOMPLETE);

            this.userVoucherProgressRepository.save(pro);
        }

        return voucher;
    }

    public Voucher handleFetchVoucher(Long id) {
        return this.voucherRepository.findById(id).isPresent() ? this.voucherRepository.findById(id).get() : null;
    }

    public List<Voucher> handleFetchSeveralsVoucher() {
        return this.voucherRepository.findAll();
    }

    public void handleDeleteVoucher(Long id) {
        this.voucherRepository.deleteById(id);
    }
}
