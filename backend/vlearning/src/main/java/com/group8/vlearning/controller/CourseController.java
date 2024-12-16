package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Course;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.domain.dto.response.ResultPagination;
import com.group8.vlearning.service.CourseService;
import com.group8.vlearning.util.error.CustomException;
import com.turkraft.springfilter.boot.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/v1")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/course")
    public ResponseEntity<ResponseDTO<Course>> createCourse(@RequestBody Course course) throws CustomException {

        ResponseDTO<Course> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create course success");
        res.setData(this.courseService.handleCreateCourse(course));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<ResponseDTO<Course>> fetchCourse(@PathVariable Long id) throws CustomException {

        ResponseDTO<Course> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Create course success");
        res.setData(this.courseService.handleFetchCourse(id));

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/courses")
    public ResponseEntity<ResponseDTO<ResultPagination>> fetchSeveralCourses(Pageable pageable,
            @Filter Specification<Course> spec) {

        ResponseDTO<ResultPagination> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch several courses success");
        res.setData(this.courseService.handleFetchSeveralCourses(pageable, spec));

        return ResponseEntity.ok().body(res);
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteCourse(@PathVariable Long id) throws CustomException {

        this.courseService.handleDeleteCourse(id);

        ResponseDTO<Object> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete courses success");

        return ResponseEntity.ok().body(res);
    }
}
