package com.group8.vlearning.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Field;
import com.group8.vlearning.repository.FieldRepository;
import com.group8.vlearning.util.error.CustomException;

@Service
public class FieldService {

    @Autowired
    private FieldRepository fieldRepository;

    public Field handleCreateField(Field field) {
        return this.fieldRepository.save(field);
    }

    public Field handleFetchField(long id) throws CustomException {

        if (!this.fieldRepository.findById(id).isPresent()) {
            throw new CustomException("Field not found");
        }

        return this.fieldRepository.findById(id).isPresent() ? this.fieldRepository.findById(id).get() : null;
    }

    public List<Field> handleFetchSeveralFields() {
        return this.fieldRepository.findAll();
    }

    public void handleDeleteField(long id) {
        this.fieldRepository.deleteById(id);
    }

}
