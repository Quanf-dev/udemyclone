package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Field;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.FieldService;
import com.group8.vlearning.util.error.CustomException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/v1")
public class FieldController {

    @Autowired
    private FieldService fieldService;

    @PostMapping("/field")
    public ResponseEntity<ResponseDTO<Field>> createField(@RequestBody Field field) {

        ResponseDTO<Field> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create field success!");
        res.setData(this.fieldService.handleCreateField(field));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/field/{id}")
    public ResponseEntity<ResponseDTO<Field>> fetchField(@PathVariable long id) throws CustomException {

        if (this.fieldService.handleFetchField(id) == null) {
            throw new CustomException("Field not found!");
        }

        ResponseDTO<Field> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch field success!");
        res.setData(this.fieldService.handleFetchField(id));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/fields")
    public ResponseEntity<ResponseDTO<List<Field>>> fetchSeveralFields() {

        ResponseDTO<List<Field>> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch field success!");
        res.setData(this.fieldService.handleFetchSeveralFields());

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/field/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteField(@PathVariable long id) throws CustomException {

        if (this.fieldService.handleFetchField(id) == null) {
            throw new CustomException("Field not found!");
        }

        this.fieldService.handleDeleteField(id);

        ResponseDTO<Object> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete field success!");

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}
