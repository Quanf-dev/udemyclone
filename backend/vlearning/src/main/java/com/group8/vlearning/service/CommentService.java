package com.group8.vlearning.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Comment;
import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.dto.response.ResultPagination;
import com.group8.vlearning.repository.comment.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserService userService;

    public Comment handleCreateComment(Comment comment) {

        // user
        if (this.userService.handleFetchUser(comment.getUser().getId()) != null) {
            User user = this.userService.handleFetchUser(comment.getUser().getId());
            comment.setUser(user);
        } else {
            comment.setUser(null);
        }

        // parent
        if (this.handleFetchComment(comment.getParent().getId()) != null) {
            Comment parent = this.handleFetchComment(comment.getParent().getId());
            comment.setParent(parent);
        } else {
            comment.setParent(null);
        }

        return this.commentRepository.save(comment);
    }

    public Comment handleFetchComment(Long id) {
        return this.commentRepository.findById(id).isPresent() ? this.commentRepository.findById(id).get() : null;
    }

    public ResultPagination handleFetchSeveralComments(Specification<Comment> spec, Pageable pageable) {
        Page<Comment> page = this.commentRepository.findAll(spec, pageable);

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

    public void handleDeleteComment(Long id) {
        this.commentRepository.deleteById(id);
    }
}
