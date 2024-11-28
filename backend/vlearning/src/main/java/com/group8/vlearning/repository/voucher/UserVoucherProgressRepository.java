package com.group8.vlearning.repository.voucher;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group8.vlearning.domain.UserVoucherProgress;

@Repository
public interface UserVoucherProgressRepository extends JpaRepository<UserVoucherProgress, Long> {

}
