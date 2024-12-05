package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.CommentReaction;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.ReactionService;
import com.group8.vlearning.util.error.CustomException;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/v1")
public class ReactionController {

    @Autowired
    private ReactionService reactionService;

    @PostMapping("/reaction")
    public ResponseEntity<ResponseDTO<CommentReaction>> createReaction(@RequestBody @Valid CommentReaction reaction)
            throws CustomException {

        ResponseDTO<CommentReaction> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create reaction success!");
        res.setData(this.reactionService.handleCreateReaction(reaction));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/reaction/{id}")
    public ResponseEntity<ResponseDTO<CommentReaction>> fetchReaction(@PathVariable Long id) throws CustomException {
        ResponseDTO<CommentReaction> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch reaction success!");
        res.setData(this.reactionService.handleFetchReaction(id));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/reactions")
    public ResponseEntity<ResponseDTO<List<CommentReaction>>> fetchSeveralReactioResponseEntity() {
        ResponseDTO<List<CommentReaction>> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch several reactions success!");
        res.setData(this.reactionService.handleFetchSeveralReaction());

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/reaction/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteReaction(@PathVariable Long id) throws CustomException {

        this.reactionService.handleDeleteReaction(id);

        ResponseDTO<Object> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete reaction success!");

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
