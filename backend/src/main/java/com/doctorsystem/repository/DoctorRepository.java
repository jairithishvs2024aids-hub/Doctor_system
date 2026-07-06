package com.doctorsystem.repository;

import com.doctorsystem.entity.Doctor;
import com.doctorsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUser(User user);
}
