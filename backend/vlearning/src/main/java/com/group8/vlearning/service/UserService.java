package com.group8.vlearning.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.dto.response.ResultPagination;
import com.group8.vlearning.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User handleCreateUser(User user) {
        return this.userRepository.save(user);
    }

    public User handleFetchUser(Long id) {
        return this.userRepository.findById(id).isPresent() ? this.userRepository.findById(id).get() : null;
    }

    public ResultPagination handleFetchSeveralUser(Specification<User> spec, Pageable pageable) {

        Page<User> page = this.userRepository.findAll(spec, pageable);

        ResultPagination.Meta meta = new ResultPagination.Meta();
        meta.setPage(pageable.getPageNumber() + 1);
        meta.setSize(pageable.getPageSize());
        meta.setTotalPage(page.getTotalPages());
        meta.setTotalElement(page.getTotalElements());

        ResultPagination resultPagination = new ResultPagination();
        resultPagination.setResult(page.getContent());
        resultPagination.setMeta(meta);

        return resultPagination;
    }

    public void handleDeleteUser(long id) {
        this.userRepository.deleteById(id);
    }
    public boolean handleUserExists(Long id) {
        return this.userRepository.existsById(id);
    }

    //  Cập nhật thông tin người dùng
    public User handleUpdateUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setActive(updatedUser.isActive());
            return userRepository.save(existingUser);
        }
        return null;
    }
     // Kích hoạt hoặc vô hiệu hóa tài khoản
    public User handleActivateUser(Long id, boolean isActive) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setActive(isActive);
            return userRepository.save(user);
        }
        return null;
    }
     // cập nhật mật khẩu người dùng 
    public boolean handleChangePassword(Long id, String oldPassword, String newPassword) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (encoder.matches(oldPassword, user.getPassword())) {
                user.setPassword(encoder.encode(newPassword));
                userRepository.save(user);
                return true; 
            }
        }
        return false; 
    }

    
}
