package com.group8.vlearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Achievement;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.AchievementService;
import com.group8.vlearning.util.error.CustomException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/v1")
public class AchievementController {

    @Autowired
    private AchievementService achievementService;

    // @PostMapping("/achievement")
    // public ResponseEntity<ResponseDTO<Achievement>>
    // createAchievement(@RequestBody Achievement achievement) {

    // ResponseDTO<Achievement> res = new ResponseDTO<>();

    // res.setStatus(HttpStatus.CREATED.value());
    // res.setMessage("Create achievement success!");
    // res.setData(this.achievementService.handleCreateAchievement(achievement));

    // return ResponseEntity.status(HttpStatus.CREATED).body(res);
    // }

    @GetMapping("/achievement/{id}")
    public ResponseEntity<ResponseDTO<Achievement>> fetchAchievement(@PathVariable Long id) throws CustomException {

        if (this.achievementService.handleFetchAchievement(id) == null) {
            throw new CustomException("Achievement not found!");
        }

        ResponseDTO<Achievement> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch achievement success!");
        res.setData(this.achievementService.handleFetchAchievement(id));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/achievements")
    public ResponseEntity<ResponseDTO<List<Achievement>>> fetchSeveralAchievements() {
        ResponseDTO<List<Achievement>> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch several achievements success!");
        res.setData(this.achievementService.handleFetchSeveralAchievements());

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/achievement/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteAchievement(@PathVariable Long id) throws CustomException {

        if (this.achievementService.handleFetchAchievement(id) == null) {
            throw new CustomException("Achievement not found!");
        }

        this.achievementService.handleDeleteAchievement(id);

        ResponseDTO<Object> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete achievement success!");

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
