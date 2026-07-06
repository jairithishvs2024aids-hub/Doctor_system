package com.doctorsystem.controller;

import com.doctorsystem.dto.AppointmentRequest;
import com.doctorsystem.entity.Appointment;
import com.doctorsystem.entity.User;
import com.doctorsystem.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/patient/appointments")
    public ResponseEntity<Appointment> book(@RequestBody AppointmentRequest request,
                                            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.bookAppointment(request, user));
    }

    @GetMapping("/patient/appointments")
    public ResponseEntity<List<Appointment>> myAppointments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.getMyAppointments(user));
    }

    @PutMapping("/patient/appointments/{id}/cancel")
    public ResponseEntity<Appointment> cancel(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(id, user));
    }

    @GetMapping("/doctor/appointments")
    public ResponseEntity<List<Appointment>> doctorAppointments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.getDoctorAppointments(user));
    }

    @PutMapping("/doctor/appointments/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }

    @GetMapping("/admin/appointments")
    public ResponseEntity<List<Appointment>> allAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }
}
