package com.group8.vlearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group8.vlearning.domain.UserProfile;

@Repository
public interface ProfileRepository extends JpaRepository<UserProfile, Long> {

}
