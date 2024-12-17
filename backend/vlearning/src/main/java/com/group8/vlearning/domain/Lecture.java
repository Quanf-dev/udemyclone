package com.group8.vlearning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "lectures")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Tên bài giảng không được để trống")
    private String title;

    @Column(columnDefinition = "MEDIUMTEXT")
    @NotBlank(message = "Tài liệu không được để trống")
    private String file;

    private boolean active;

    // @Column(nullable = false)
    // private int duration; // Thời lượng bài giảng (phút)

    @Column(nullable = false, updatable = false)
    private Instant createdAt; // Thời gian tạo bài giảng

    private Instant updatedAt; // Thời gian cập nhật bài giảng

    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;

    // Hàm kích hoạt hoặc vô hiệu hóa bài giảng
    public void toggleActive() {
        this.active = !this.active;
    }

    // Hàm kiểm tra trạng thái của bài giảng
    public boolean isActive() {
        return active;
    }

    // Hàm kiểm tra xem bài giảng có khớp từ khóa tìm kiếm không
    public boolean matchesKeyword(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return false;
        }
        String lowerKeyword = keyword.toLowerCase();
        return (title != null && title.toLowerCase().contains(lowerKeyword)) ||
                (file != null && file.toLowerCase().contains(lowerKeyword));
    }

    // Hàm xử lý trước khi tạo
    @jakarta.persistence.PrePersist
    public void handleBeforeCreate() {
        this.createdAt = Instant.now();
        this.active = true;
    }

    // Hàm xử lý trước khi cập nhật
    @jakarta.persistence.PreUpdate
    public void handleBeforeUpdate() {
        this.updatedAt = Instant.now();
    }
}
