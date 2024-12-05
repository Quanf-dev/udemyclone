package com.group8.vlearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group8.vlearning.domain.Notification;
import com.group8.vlearning.domain.dto.request.CreateNotificationReq;
import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.NotificationService;
import com.group8.vlearning.util.error.CustomException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/v1")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/notification")
    public ResponseEntity<ResponseDTO<Notification>> createNotification(@RequestBody CreateNotificationReq req) {

        ResponseDTO<Notification> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Create notification success!");
        res.setData(this.notificationService.handleCreateNotification(req));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/notification/{id}")
    public ResponseEntity<ResponseDTO<Notification>> fetchNotification(@PathVariable Long id) throws CustomException {

        ResponseDTO<Notification> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch notification success!");
        res.setData(this.notificationService.handleFetchNotification(id));

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/notifications")
    public ResponseEntity<ResponseDTO<List<Notification>>> fetchSeveralNotifications() {

        ResponseDTO<List<Notification>> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Fetch notification success!");
        res.setData(this.notificationService.handleFetchSeveralNotifications());

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/notification/{id}")
    public ResponseEntity<ResponseDTO<Object>> deleteNotifications(@PathVariable Long id) throws CustomException {

        this.notificationService.handleDeleteNotification(id);

        ResponseDTO<Object> res = new ResponseDTO<>();

        res.setStatus(HttpStatus.OK.value());
        res.setMessage("Delete notification success!");

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
