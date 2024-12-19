package com.group8.vlearning.repository.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.group8.vlearning.domain.Chapter;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long>, JpaSpecificationExecutor<Chapter> {

}
