package com.group8.vlearning.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Chapter;
import com.group8.vlearning.domain.Lecture;
import com.group8.vlearning.repository.course.LectureRepository;
import com.group8.vlearning.util.error.CustomException;

@Service
public class LectureService {

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private ChapterService chapterService;

    public Lecture handleCreateLecture(Lecture lecture) throws CustomException {
        Chapter chapter = this.chapterService.handleFetchChapter(lecture.getChapter().getId());

        lecture.setChapter(chapter);

        return this.lectureRepository.save(lecture);
    }

    public Lecture handleFetchLecture(Long id) throws CustomException {
        if (!this.lectureRepository.findById(id).isPresent()) {
            throw new CustomException("Lecture not found");
        }

        return this.lectureRepository.findById(id).get();
    }

    public List<Lecture> handleFetchSeveralLectures(Specification<Lecture> spec) {
        return this.lectureRepository.findAll(spec);
    }

    public void handleDeleteLecture(Long id) throws CustomException {
        if (!this.lectureRepository.findById(id).isPresent()) {
            throw new CustomException("Lecture not found");
        }

        this.lectureRepository.deleteById(id);
    }

    public Lecture handleUpdateLecture(Lecture lecture) throws CustomException {
        Lecture lectureDB = this.handleFetchLecture(lecture.getId());

        if (lecture.getTitle() != null && !lecture.getTitle().equals("")) {
            lectureDB.setTitle(lecture.getTitle());
        }

        if (lecture.getFile() != null && !lecture.getFile().equals("")) {
            lectureDB.setFile(lecture.getFile());
        }

        return this.lectureRepository.save(lectureDB);
    }
}
