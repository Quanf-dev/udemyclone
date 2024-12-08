package com.group8.vlearning.domain;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.group8.vlearning.util.constant.CourseApproveEnum;

import jakarta.persistence.Column;
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
@Table(name = "courses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Tên khóa học không được để trống")
    private String title;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    private String image;

    @ManyToOne()
    @JoinColumn(name = "own_by")
    @JsonIgnoreProperties(value = { "password", "role", "fields", "skills", "ownCourses",
            "purchasedCourses", "favoriteCourses", "voucherProgresses", "achievementProgresses", "comments",
            "reactions", "userNotifications", "followings", "followers", "active", "protect", "createdAt",
            "updatedAt" })
    private User ownBy;

    @Enumerated(EnumType.STRING)
    private CourseApproveEnum status;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Chapter> chapters;

    @ManyToOne
    @JoinColumn(name = "field_id")
    private Field field;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "courses_skills", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private List<Skill> skills;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Comment> comments;

    private boolean active;

    @ManyToMany(mappedBy = "purchasedCourses", fetch = FetchType.LAZY)
    // @JsonIgnoreProperties(value = { "skills", "purchasedUser" })
    @JsonIgnore
    private List<User> purchasedUser;

    @ManyToMany(mappedBy = "favoriteCourses", fetch = FetchType.LAZY)
    // @JsonIgnoreProperties(value = { "skills", "purchasedUser" })
    @JsonIgnore
    private List<User> favoriteUser;

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

    // Hàm tính số lượng bài giảng trong khóa học
    public int getLectureCount() {
        return chapters.stream()
                .mapToInt(chapter -> chapter.getLectures() == null ? 0 : chapter.getLectures().size())
                .sum();
    }

    // Hàm kiểm tra xem một người dùng đã mua khóa học hay chưa
    public boolean isPurchasedByUser(User user) {
        return purchasedUser != null && purchasedUser.contains(user);
    }

    // Hàm kiểm tra xem khóa học có khớp với từ khóa tìm kiếm hay không
    public boolean matchesKeyword(String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return (title != null && title.toLowerCase().contains(lowerKeyword)) ||
                (description != null && description.toLowerCase().contains(lowerKeyword));
    }
}
