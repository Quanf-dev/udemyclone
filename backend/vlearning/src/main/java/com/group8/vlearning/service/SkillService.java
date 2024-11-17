package com.group8.vlearning.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Field;
import com.group8.vlearning.domain.Skill;
import com.group8.vlearning.repository.SkillRepository;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private FieldService fieldService;

    public Skill handleCreateSkill(Skill skill) {

        Field field = this.fieldService.handleFetchField(skill.getField().getId());

        if (field != null) {
            skill.setField(field);
        } else {
            skill.setField(null);
        }

        return this.skillRepository.save(skill);
    }
}
