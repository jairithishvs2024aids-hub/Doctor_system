package com.doctorsystem;

import com.doctorsystem.entity.Doctor;
import com.doctorsystem.entity.User;
import com.doctorsystem.repository.DoctorRepository;
import com.doctorsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@hospital.com")) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@hospital.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }

        if (!userRepository.existsByEmail("dr.john@hospital.com")) {
            User drJohn = new User();
            drJohn.setName("Dr. John Smith");
            drJohn.setEmail("dr.john@hospital.com");
            drJohn.setPassword(passwordEncoder.encode("doctor123"));
            drJohn.setRole(User.Role.DOCTOR);
            userRepository.save(drJohn);

            Doctor doctor1 = new Doctor();
            doctor1.setSpecialization("Cardiology");
            doctor1.setPhone("9876543210");
            doctor1.setUser(drJohn);
            doctorRepository.save(doctor1);
        }

        if (!userRepository.existsByEmail("dr.sarah@hospital.com")) {
            User drSarah = new User();
            drSarah.setName("Dr. Sarah Johnson");
            drSarah.setEmail("dr.sarah@hospital.com");
            drSarah.setPassword(passwordEncoder.encode("doctor123"));
            drSarah.setRole(User.Role.DOCTOR);
            userRepository.save(drSarah);

            Doctor doctor2 = new Doctor();
            doctor2.setSpecialization("Dermatology");
            doctor2.setPhone("9123456789");
            doctor2.setUser(drSarah);
            doctorRepository.save(doctor2);
        }
    }
}
