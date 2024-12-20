package com.group8.vlearning.domain;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.group8.vlearning.util.constant.CommentTypeEnum;
import com.group8.vlearning.util.validator.Require;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotBlank(message = "Nội dung không được để trống")
    private String content;

    @Enumerated(EnumType.STRING)
    @Require(message = "Requires type not null")
    private CommentTypeEnum commentType;

    @ManyToOne
    @JoinColumn(name = "reply_to")
    @JsonIgnoreProperties(value = { "commentType", "ratingScore", "user", "course", "reactions", "parent", "replies",
            "createdAt", "updatedAt" })
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> replies;

    private Integer ratingScore;

    @ManyToOne
    @JoinColumn(name = "send_by")
    @JsonIgnoreProperties(value = { "email", "password", "role", "profile", "fields", "skills", "ownCourses",
            "purchasedCourses", "favoriteCourses", "voucherProgresses", "achievementProgresses", "comments",
            "reactions", "userNotifications", "followings", "followers", "active", "protect", "createdAt",
            "updatedAt" })
    @Require(message = "Requires user not null")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnoreProperties(value = { "description", "image", "ownBy", "status", "chapters", "field", "skills",
            "comments", "active", "purchasedUser", "favoriteUser", "createdAt", "updatedAt" })
    // @Require(message = "Requires course not null")
    private Course course;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CommentReaction> reactions;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    private Instant createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    private Instant updatedAt;

    @PrePersist
    public void handleBeforeCreate() {
        // gán thời gian hiện tại
        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedAt = Instant.now();
    }
}
