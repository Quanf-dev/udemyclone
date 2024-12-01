package com.group8.vlearning.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Achievement;
import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.UserAchievementProgress;
import com.group8.vlearning.repository.UserRepository;
import com.group8.vlearning.repository.Achievement.AchievementProgressRepository;
import com.group8.vlearning.repository.Achievement.AchievementRepository;
import com.group8.vlearning.util.constant.ProgressEnum;

@Service
public class AchievementService {

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private AchievementProgressRepository achievementProgressRepository;

    @Autowired
    private UserRepository userRepository;

    public Achievement handleCreateAchievement(Achievement achievement) {
        this.achievementRepository.save(achievement);

        List<User> users = this.userRepository.findAll();
        for (User user : users) {
            UserAchievementProgress pro = new UserAchievementProgress();

            pro.setUser(user);
            pro.setAchievement(achievement);
            pro.setProgress(0);
            pro.setStatus(ProgressEnum.INCOMPLETE);

            this.achievementProgressRepository.save(pro);
        }

        return achievement;
    }

    public Achievement handleFetchAchievement(Long id) {
        return this.achievementRepository.findById(id).isPresent() ? this.achievementRepository.findById(id).get()
                : null;
    }

    public List<Achievement> handleFetchSeveralAchievements() {
        return this.achievementRepository.findAll();
    }

    public void handleDeleteAchievement(Long id) {
        this.achievementRepository.deleteById(id);
    }
}
