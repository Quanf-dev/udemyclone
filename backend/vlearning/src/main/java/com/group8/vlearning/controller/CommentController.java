package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Comment;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.domain.dto.response.ResultPagination;
import com.group8.vlearning.service.CommentService;
import com.group8.vlearning.service.UserService;
import com.group8.vlearning.util.constant.CommentTypeEnum;
import com.group8.vlearning.util.error.CustomException;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/v1")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping("/comment")
    public ResponseEntity<ResponseDTO<Comment>> createComment(@RequestBody @Valid Comment comment)
            throws CustomException {
        if (this.userService.handleFetchUser(comment.getUser().getId()) == null) {
            throw new CustomException("User not found!");
        }

        if (comment.getCommentType() == CommentTypeEnum.REPLY) {
            if (this.commentService.handleFetchComment(comment.getParent().getId()) == null) {
                throw new CustomException("Parent not found!");
            }
        }

        ResponseDTO<Comment> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Upload comment success!");
        res.setData(this.commentService.handleCreateComment(comment));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/comment/{id}")
    public ResponseEntity<ResponseDTO<Comment>> fetchComment(@PathVariable Long id) throws CustomException {

        if (this.commentService.handleFetchComment(id) == null) {
            throw new CustomException("Comment not found!");
        }

        ResponseDTO<Comment> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch comment success!");
        res.setData(this.commentService.handleFetchComment(id));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/comments")
    public ResponseEntity<ResponseDTO<ResultPagination>> fetchSeveralComments(Pageable pageable,
            @Filter Specification<Comment> spec) {

        ResponseDTO<ResultPagination> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch several comments success!");
        res.setData(this.commentService.handleFetchSeveralComments(spec, pageable));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteComment(@PathVariable Long id) throws CustomException {

        if (this.commentService.handleFetchComment(id) == null) {
            throw new CustomException("Comment not found!");
        }
        this.commentService.handleDeleteComment(id);

        ResponseDTO<Object> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete comment success!");

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
