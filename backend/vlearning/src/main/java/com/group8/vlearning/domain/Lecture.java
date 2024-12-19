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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @ManyToOne
    @JoinColumn(name = "chapter_id")
    @JsonIgnoreProperties(value = { "title", "course", "course", "active", "lectures" })
    private Chapter chapter;

    private boolean active;

    private Instant createdAt; // Thời gian tạo bài giảng

    private Instant updatedAt; // Thời gian cập nhật bài giảng

    // Hàm xử lý trước khi tạo
    @jakarta.persistence.PrePersist
    public void handleBeforeCreate() {
        this.createdAt = Instant.now();
    }

    // Hàm xử lý trước khi cập nhật
    @jakarta.persistence.PreUpdate
    public void handleBeforeUpdate() {
        this.updatedAt = Instant.now();
    }
}
