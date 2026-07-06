package com.doctorsystem.controller;

import com.doctorsystem.dto.DoctorRequest;
import com.doctorsystem.entity.Doctor;
import com.doctorsystem.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/api/doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @PostMapping("/api/admin/doctors")
    public ResponseEntity<Doctor> addDoctor(@RequestBody DoctorRequest request) {
        return ResponseEntity.ok(doctorService.addDoctor(request));
    }

    @PutMapping("/api/admin/doctors/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorRequest request) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, request));
    }

    @DeleteMapping("/api/admin/doctors/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted");
    }
}
