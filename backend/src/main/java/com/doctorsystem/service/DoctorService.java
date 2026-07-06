package com.doctorsystem.service;

import com.doctorsystem.dto.DoctorRequest;
import com.doctorsystem.entity.Doctor;
import com.doctorsystem.entity.User;
import com.doctorsystem.repository.DoctorRepository;
import com.doctorsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor addDoctor(DoctorRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.DOCTOR);
        userRepository.save(user);

        Doctor doctor = new Doctor();
        doctor.setSpecialization(request.getSpecialization());
        doctor.setPhone(request.getPhone());
        doctor.setUser(user);
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, DoctorRequest request) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctor.setSpecialization(request.getSpecialization());
        doctor.setPhone(request.getPhone());

        User user = doctor.getUser();
        user.setName(request.getName());
        userRepository.save(user);

        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctorRepository.delete(doctor);
        userRepository.delete(doctor.getUser());
    }
}
