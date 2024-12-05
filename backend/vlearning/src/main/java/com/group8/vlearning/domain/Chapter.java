package com.group8.vlearning.domain;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "chapters")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Tên chương học không được để trống")
    private String title;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private boolean active;

    @OneToMany(mappedBy = "chapter", fetch = FetchType.LAZY)
    private List<Lecture> lectures;

     // Hàm tính tổng số bài giảng trong chương
     public int getLectureCount() {
        return lectures == null ? 0 : lectures.size();
    }

    // Hàm kiểm tra trạng thái của chương học
    public boolean isActive() {
        return active;
    }

    // Hàm lấy danh sách tên bài giảng
    public List<String> getLectureTitles() {
        return lectures == null
            ? List.of()
            : lectures.stream()
                      .map(Lecture::getTitle)
                      .toList();
    }

    // Hàm tìm kiếm bài giảng theo từ khóa
    public List<Lecture> searchLecturesByKeyword(String keyword) {
        if (lectures == null || keyword == null || keyword.isEmpty()) {
            return List.of();
        }
        String lowerKeyword = keyword.toLowerCase();
        return lectures.stream()
                       .filter(lecture -> lecture.getTitle() != null && lecture.getTitle().toLowerCase().contains(lowerKeyword))
                       .toList();
    }

    // Hàm kích hoạt hoặc vô hiệu hóa chương học
    public void toggleActive() {
        this.active = !this.active;
    }
}
