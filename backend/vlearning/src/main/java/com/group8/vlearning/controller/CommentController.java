package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Comment;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/v1")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/comment")
    public ResponseEntity<ResponseDTO<Comment>> createComment(@RequestBody Comment comment) {

        ResponseDTO<Comment> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Upload comment success!");
        res.setData(this.commentService.handleCreateComment(comment));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

}
