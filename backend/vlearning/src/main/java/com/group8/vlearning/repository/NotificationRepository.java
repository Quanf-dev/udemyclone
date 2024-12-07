package com.group8.vlearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group8.vlearning.domain.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

}