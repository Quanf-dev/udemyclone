package com.group8.vlearning.domain.dto.request;

import java.util.List;

import com.group8.vlearning.domain.Notification;
import com.group8.vlearning.domain.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateNotificationReq {

    private Notification notification;

    private List<User> users;
}
