package com.group8.vlearning.controller.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Lecture;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.LectureService;
import com.group8.vlearning.util.error.CustomException;
import com.turkraft.springfilter.boot.Filter;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/v1")
public class LectureController {

    @Autowired
    private LectureService lectureService;

    @PostMapping("/lecture")
    public ResponseEntity<ResponseDTO<Lecture>> createLecture(@RequestBody Lecture lecture) throws CustomException {

        ResponseDTO<Lecture> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create lecture success");
        res.setData(this.lectureService.handleCreateLecture(lecture));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/lecture/{id}")
    public ResponseEntity<ResponseDTO<Lecture>> fetchLecture(@PathVariable Long id) throws CustomException {

        ResponseDTO<Lecture> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch lecture success");
        res.setData(this.lectureService.handleFetchLecture(id));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/lectures")
    public ResponseEntity<ResponseDTO<List<Lecture>>> fetchSeveralLectures(@Filter Specification<Lecture> spec)
            throws CustomException {

        ResponseDTO<List<Lecture>> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch several lecture success");
        res.setData(this.lectureService.handleFetchSeveralLectures(spec));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/lecture/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteLecture(@PathVariable Long id) throws CustomException {
        ResponseDTO<Object> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete lecture success");
        this.lectureService.handleDeleteLecture(id);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PutMapping("/lecture")
    public ResponseEntity<ResponseDTO<Lecture>> updateLecture(@RequestBody Lecture lecture) throws CustomException {
        ResponseDTO<Lecture> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Update lecture success");
        res.setData(this.lectureService.handleUpdateLecture(lecture));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
