package com.doctorsystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "doctors")
@Data
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specialization;

    private String phone;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
