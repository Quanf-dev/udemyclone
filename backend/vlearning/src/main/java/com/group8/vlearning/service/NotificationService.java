package com.group8.vlearning.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group8.vlearning.domain.Notification;
import com.group8.vlearning.domain.User;
import com.group8.vlearning.domain.dto.request.CreateNotificationReq;
import com.group8.vlearning.repository.NotificationRepository;
import com.group8.vlearning.repository.UserRepository;
import com.group8.vlearning.util.error.CustomException;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    // public Notification handleCreateNotification(CreateNotificationReq
    // reqNotification) {

    // Notification notification = reqNotification.getNotification();
    // this.notificationRepository.save(notification);

    // for (User user : reqNotification.getUsers()) {
    // // nếu người dùng tồn tại
    // if (this.userRepository.findById(user.getId()).isPresent()) {
    // User userInDB = this.userRepository.findById(user.getId()).get();
    // List<Notification> newList;

    // // nếu người dùng chưa có thông báo trước đó
    // if (userInDB.getUserNotifications().isEmpty()) {
    // newList = new ArrayList();
    // }
    // // nếu đã có thông báo khác trước đó
    // else {
    // newList = userInDB.getUserNotifications();
    // }

    // newList.add(notification);
    // userInDB.setUserNotifications(newList);

    // this.userRepository.save(userInDB);
    // }
    // }

    // return notification;
    // }

    public Notification handleFetchNotification(Long id) throws CustomException {
        if (!this.notificationRepository.findById(id).isPresent()) {
            throw new CustomException("Notification not found!");
        }

        return this.notificationRepository.findById(id).get();
    }

    public List<Notification> handleFetchSeveralNotifications() {
        return this.notificationRepository.findAll();
    }

    public void handleDeleteNotification(Long id) throws CustomException {
        if (!this.notificationRepository.findById(id).isPresent()) {
            throw new CustomException("Notification not found!");
        }

        this.notificationRepository.deleteById(id);
    }
}
