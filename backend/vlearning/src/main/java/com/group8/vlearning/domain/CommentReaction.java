package com.group8.vlearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.group8.vlearning.util.constant.ReactionTypeEnum;
import com.group8.vlearning.util.validator.Require;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "comment_reaction")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentReaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties(value = { "email", "password", "role", "profile", "fields", "skills", "ownCourses",
            "purchasedCourses", "favoriteCourses", "voucherProgresses", "achievementProgresses", "comments",
            "reactions", "userNotifications", "followings", "followers", "active", "protect", "createdAt",
            "updatedAt" })
    @Require(message = "Requires user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    @JsonIgnoreProperties(value = { "commentType", "parent", "ratingScore", "createdAt", "updatedAt" })
    @Require(message = "Requires comment")
    private Comment comment;

    @Enumerated(EnumType.STRING)
    @Require(message = "Requires type")
    private ReactionTypeEnum reactionType;
}
