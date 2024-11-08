package com.group8.vlearning.domain;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "fields")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Tên lĩnh vực không được để trống")
    private String name;

    private boolean active;

    @OneToMany(mappedBy = "field", fetch = FetchType.LAZY)
    private List<Course> courses;

    @OneToMany(mappedBy = "field", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Skill> skills;

    @ManyToMany(mappedBy = "fields", fetch = FetchType.LAZY)
    private List<User> users;
}
