package com.group8.vlearning.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Chapter;
import com.group8.vlearning.domain.Course;
import com.group8.vlearning.repository.course.ChapterRepository;
import com.group8.vlearning.util.error.CustomException;

@Service
public class ChapterService {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private CourseService courseService;

    public Chapter handleCreateChapter(Chapter chapter) throws CustomException {
        Course course = this.courseService.handleFetchCourse(chapter.getCourse().getId());
        chapter.setCourse(course);
        return this.chapterRepository.save(chapter);
    }

    public Chapter handleFetchChapter(Long id) throws CustomException {
        if (!this.chapterRepository.findById(id).isPresent()) {
            throw new CustomException("Chapter not found");
        }

        return this.chapterRepository.findById(id).get();
    }

    public List<Chapter> handleFetchSeveralChapters(Specification<Chapter> spec) {
        return this.chapterRepository.findAll(spec);
    }

    public void handleDeleteChapter(Long id) throws CustomException {
        if (!this.chapterRepository.findById(id).isPresent()) {
            throw new CustomException("Chapter not found");
        }

        this.chapterRepository.deleteById(id);
    }

    public Chapter handleUpdateChapter(Chapter chapter) throws CustomException {
        Chapter chapterDB = this.handleFetchChapter(chapter.getId());

        if (chapter.getTitle() != null && !chapter.getTitle().equals("")) {
            chapterDB.setTitle(chapter.getTitle());
        }

        return this.chapterRepository.save(chapterDB);
    }
}
