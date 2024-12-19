package com.group8.vlearning.controller.course;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Chapter;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.ChapterService;
import com.group8.vlearning.util.error.CustomException;
import com.turkraft.springfilter.boot.Filter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/v1")
public class ChapterController {

    @Autowired
    private ChapterService chapterService;

    @PostMapping("/chapter")
    public ResponseEntity<ResponseDTO<Chapter>> createChapter(@RequestBody Chapter chapter) throws CustomException {
        ResponseDTO<Chapter> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create chapter success");
        res.setData(this.chapterService.handleCreateChapter(chapter));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/chapter/{id}")
    public ResponseEntity<ResponseDTO<Chapter>> fetchChapter(@PathVariable Long id) throws CustomException {
        ResponseDTO<Chapter> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch chapter success");
        res.setData(this.chapterService.handleFetchChapter(id));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/chapters")
    public ResponseEntity<ResponseDTO<List<Chapter>>> fetchSeveralChapter(@Filter Specification<Chapter> spec)
            throws CustomException {
        ResponseDTO<List<Chapter>> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch chapter success");
        res.setData(this.chapterService.handleFetchSeveralChapters(spec));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/chapter/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteChapter(@PathVariable Long id) throws CustomException {
        ResponseDTO<Object> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete chapter success");
        this.chapterService.handleDeleteChapter(id);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PutMapping("/chapter")
    public ResponseEntity<ResponseDTO<Chapter>> updateChapter(@RequestBody Chapter chapter) throws CustomException {
        ResponseDTO<Chapter> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Update chapter success");
        res.setData(this.chapterService.handleUpdateChapter(chapter));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
