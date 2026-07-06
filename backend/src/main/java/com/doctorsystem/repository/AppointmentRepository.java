package com.doctorsystem.repository;

import com.doctorsystem.entity.Appointment;
import com.doctorsystem.entity.Doctor;
import com.doctorsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(User patient);
    List<Appointment> findByDoctor(Doctor doctor);
}
