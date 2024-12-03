package com.group8.vlearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Skill;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.FieldService;
import com.group8.vlearning.service.SkillService;
import com.group8.vlearning.util.error.CustomException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/v1")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @Autowired
    private FieldService fieldService;

    @PostMapping("/skill")
    public ResponseEntity<ResponseDTO<Skill>> createSkill(@RequestBody Skill skill) throws CustomException {

        if (this.fieldService.handleFetchField(skill.getField().getId()) == null) {
            throw new CustomException("Field not found!");
        }

        ResponseDTO<Skill> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create skill success!");
        res.setData(this.skillService.handleCreateSkill(skill));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/skill/{id}")
    public ResponseEntity<ResponseDTO<Skill>> fetchSkill(@PathVariable Long id) throws CustomException {

        if (this.skillService.handleFetchSkill(id) == null) {
            throw new CustomException("Skill not found!");
        }

        ResponseDTO<Skill> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch skill success!");
        res.setData(this.skillService.handleFetchSkill(id));

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/skills")
    public ResponseEntity<ResponseDTO<List<Skill>>> fetchSeveralSkills() {
        ResponseDTO<List<Skill>> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch several skills success!");
        res.setData(this.skillService.handleFetchSeveralSkills());

        return ResponseEntity.ok().body(res);
    }

    @DeleteMapping("/skill/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteSkill(@PathVariable long id) throws CustomException {

        if (this.skillService.handleFetchSkill(id) == null) {
            throw new CustomException("Skill not found!");
        }

        this.skillService.handleDeleteSkill(id);

        ResponseDTO<Object> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete skill success!");

        return ResponseEntity.ok().body(res);
    }

}
