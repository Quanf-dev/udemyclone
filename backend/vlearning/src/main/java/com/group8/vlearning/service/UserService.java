package com.group8.vlearning.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.UserProfile;
import com.group8.vlearning.domain.dto.response.ResultPagination;
import com.group8.vlearning.repository.ProfileRepository;
import com.group8.vlearning.repository.UserRepository;
import com.group8.vlearning.util.error.CustomException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private PasswordEncoder encoder;

    @Value("${storage-default-path}")
    private String defaultPath;

    public User handleCreateUser(User user) {
        String passwordEncoded = encoder.encode(user.getPassword());
        user.setPassword(passwordEncoded);
        return this.userRepository.save(user);
    }

    public User handleFetchUserByLoginName(String loginName) throws CustomException {
        if (!this.userRepository.findTop1ByEmail(loginName).isPresent()) {
            throw new CustomException("User not found!");
        }

        return this.userRepository.findTop1ByEmail(loginName).get();
    }

    public User handleFetchUser(Long id) throws CustomException {

        if (this.userRepository.findById(id).isPresent() == false) {
            throw new CustomException("User not found!");
        }

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
        this.fileService.deleteFolder(defaultPath + "/user/" + id);
        this.userRepository.deleteById(id);
    }

    public User handleUpdateUser(User user) throws CustomException {
        User userDB = this.handleFetchUser(user.getId());

        // role
        if (user.getRole() != null) {
            userDB.setRole(user.getRole());
        }

        // fullname
        UserProfile profileDB = userDB.getProfile();

        if (user.getProfile().getFullName() != null && !user.getProfile().getFullName().equals("")) {
            profileDB.setFullName(user.getProfile().getFullName());
        }

        // bio
        if (user.getProfile().getBio() != null && !user.getProfile().getBio().equals("")) {
            profileDB.setBio(user.getProfile().getBio());
        }

        // avatar
        if (user.getProfile().getAvatar() != null && !user.getProfile().getAvatar().equals("")) {
            profileDB.setAvatar(user.getProfile().getAvatar());
        }

        // background
        if (user.getProfile().getBackground() != null && !user.getProfile().getBackground().equals("")) {
            profileDB.setBackground(user.getProfile().getBackground());
        }

        // address
        if (user.getProfile().getAddress() != null && !user.getProfile().getAddress().equals("")) {
            profileDB.setAddress(user.getProfile().getAddress());
        }

        // phone
        if (user.getProfile().getPhone() != null && !user.getProfile().getPhone().equals("")) {
            profileDB.setPhone(user.getProfile().getPhone());
        }

        this.profileRepository.save(profileDB);

        return this.userRepository.save(userDB);
    }

    public void handleActiveUser(long id, boolean isActive) throws CustomException {
        User user = this.handleFetchUser(id);
        user.setActive(isActive);
        this.userRepository.save(user);
    }

}
