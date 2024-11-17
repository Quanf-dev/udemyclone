package com.group8.vlearning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Skill;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.SkillService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/v1")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @PostMapping("/skill")
    public ResponseEntity<ResponseDTO<Skill>> createSkill(@RequestBody Skill skill) {

        ResponseDTO<Skill> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create skill success!");
        res.setData(this.skillService.handleCreateSkill(skill));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

}
