package com.group8.vlearning.repository.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group8.vlearning.domain.CommentReaction;

@Repository
public interface ReactionRepository extends JpaRepository<CommentReaction, Long> {

}
