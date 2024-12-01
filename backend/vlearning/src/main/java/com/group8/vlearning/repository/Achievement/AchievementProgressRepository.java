package com.group8.vlearning.repository.Achievement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group8.vlearning.domain.UserAchievementProgress;

@Repository
public interface AchievementProgressRepository extends JpaRepository<UserAchievementProgress, Long> {

}
