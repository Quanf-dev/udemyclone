package com.group8.vlearning.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.CommentReaction;
import com.group8.vlearning.repository.comment.ReactionRepository;
import com.group8.vlearning.util.error.CustomException;

@Service
public class ReactionService {

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    public CommentReaction handleCreateReaction(CommentReaction reaction) throws CustomException {

        if (this.userService.handleFetchUser(reaction.getUser().getId()) == null) {
            throw new CustomException("User not found!");
        } else {
            reaction.setUser(this.userService.handleFetchUser(reaction.getUser().getId()));
        }

        if (this.commentService.handleFetchComment(reaction.getComment().getId()) == null) {
            throw new CustomException("Comment not found!");
        } else {
            reaction.setComment(this.commentService.handleFetchComment(reaction.getComment().getId()));
        }

        return this.reactionRepository.save(reaction);
    }

    public CommentReaction handleFetchReaction(Long id) throws CustomException {
        if (this.reactionRepository.findById(id).isPresent() == false) {
            throw new CustomException("Reaction not found!");
        }

        return this.reactionRepository.findById(id).isPresent() ? this.reactionRepository.findById(id).get() : null;
    }

    public List<CommentReaction> handleFetchSeveralReaction() {
        return this.reactionRepository.findAll();
    }

    public void handleDeleteReaction(Long id) throws CustomException {
        if (this.reactionRepository.findById(id).isPresent() == false) {
            throw new CustomException("Reaction not found!");
        }

        this.reactionRepository.deleteById(id);
    }
}
