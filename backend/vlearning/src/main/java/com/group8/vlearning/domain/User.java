package com.group8.vlearning.domain;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.group8.vlearning.util.constant.RoleEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Email không được để trống")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    @OneToOne(cascade = CascadeType.ALL)
    // chỉ rõ rằng cột profile_id trong bảng User trỏ đến cột id của bảng Profile
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    @Valid // validate profile khi validate user
    private UserProfile profile;

    // những lĩnh vực người dùng quan tâm
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "users_fields", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "field_id"))
    @JsonIgnore
    private List<Field> fields;

    // những kĩ năng người dùng quan tâm
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "users_skills", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @JsonIgnore
    private List<Skill> skills;

    @OneToMany(mappedBy = "ownBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Course> ownCourses;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "purchased_courses", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    @JsonIgnore
    private List<Course> purchasedCourses;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "favorite_courses", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    @JsonIgnore
    private List<Course> favoriteCourses;

    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch =
    // FetchType.LAZY)
    // @JsonIgnore
    // private List<UserVoucherProgress> voucherProgresses;

    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch =
    // FetchType.LAZY)
    // @JsonIgnore
    // private List<UserAchievementProgress> achievementProgresses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CommentReaction> reactions;

    // @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // @JoinTable(name = "notification_user", joinColumns = @JoinColumn(name =
    // "user_id"), inverseJoinColumns = @JoinColumn(name = "notification_id"))
    // @JsonIgnore
    // private List<Notification> userNotifications;

    // // danh sách những người user đang theo dõi
    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch =
    // FetchType.LAZY)
    // @JsonIgnore
    // private List<UserFollowing> followings;

    // // danh sách những followers của user
    // @OneToMany(mappedBy = "userFollowing", cascade = CascadeType.ALL, fetch =
    // FetchType.LAZY)
    // @JsonIgnore
    // private List<UserFollowing> followers;

    private boolean active;

    private boolean protect;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    private Instant createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    private Instant updatedAt;

    @PrePersist
    public void handleBeforeCreate() {
        // gán thời gian hiện tại
        this.createdAt = Instant.now();
        this.setProtect(false);
        this.setActive(true);
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedAt = Instant.now();
    }

}
