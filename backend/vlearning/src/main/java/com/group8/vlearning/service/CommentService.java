package com.group8.vlearning.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Comment;
import com.group8.vlearning.domain.User;
import com.group8.vlearning.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserService userService;

    public Comment handleCreateComment(Comment comment) {

        if (this.userService.handleFetchUser(comment.getUser().getId()) != null) {
            User user = this.userService.handleFetchUser(comment.getUser().getId());
            comment.setUser(user);
        }

        return this.commentRepository.save(comment);
    }
}
