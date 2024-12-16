package com.group8.vlearning.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Course;
import com.group8.vlearning.domain.Field;
import com.group8.vlearning.domain.Skill;
import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.dto.response.ResultPagination;
import com.group8.vlearning.repository.SkillRepository;
import com.group8.vlearning.repository.course.CourseRepository;
import com.group8.vlearning.util.error.CustomException;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FieldService fieldService;

    @Autowired
    private SkillRepository skillRepository;

    public Course handleCreateCourse(Course course) throws CustomException {
        User user = userService.handleFetchUser(course.getOwnBy().getId());

        Field field = fieldService.handleFetchField(course.getField().getId());

        course.setOwnBy(user);
        course.setField(field);

        // this.courseRepository.save(course);

        List<Skill> DBSkill = new ArrayList<>();
        List<Skill> skills = course.getSkills();
        for (Skill skill : skills) {
            if (this.skillRepository.findById(skill.getId()).isPresent()) {
                skill = this.skillRepository.findById(skill.getId()).get();
                DBSkill.add(skill);
            }
        }

        course.setSkills(DBSkill);
        return this.courseRepository.save(course);
    }

    public Course handleFetchCourse(Long id) throws CustomException {
        if (!this.courseRepository.findById(id).isPresent()) {
            throw new CustomException("Course not found");
        }

        return this.courseRepository.findById(id).get();
    }

    public ResultPagination handleFetchSeveralCourses(Pageable pageable, Specification<Course> spec) {
        Page<Course> page = this.courseRepository.findAll(spec, pageable);

        ResultPagination.Meta meta = new ResultPagination.Meta();
        meta.setPage(pageable.getPageNumber() + 1);
        meta.setSize(pageable.getPageSize());
        meta.setTotalPage(page.getTotalPages());
        meta.setTotalElement(page.getTotalElements());

        ResultPagination resultPagination = new ResultPagination();
        resultPagination.setMeta(meta);
        resultPagination.setResult(page.getContent());

        return resultPagination;
    }

    public void handleDeleteCourse(Long id) throws CustomException {
        if (!this.courseRepository.findById(id).isPresent()) {
            throw new CustomException("Course not found");
        }
        this.courseRepository.deleteById(id);
    }

}
