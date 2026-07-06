package com.doctorsystem.service;

import com.doctorsystem.dto.AppointmentRequest;
import com.doctorsystem.entity.Appointment;
import com.doctorsystem.entity.Doctor;
import com.doctorsystem.entity.User;
import com.doctorsystem.repository.AppointmentRepository;
import com.doctorsystem.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public Appointment bookAppointment(AppointmentRequest request, User patient) {
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDate(LocalDate.parse(request.getAppointmentDate()));
        appointment.setStatus(Appointment.Status.PENDING);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getMyAppointments(User patient) {
        return appointmentRepository.findByPatient(patient);
    }

    public Appointment cancelAppointment(Long id, User patient) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        if (!appointment.getPatient().getId().equals(patient.getId())) {
            throw new RuntimeException("Not your appointment");
        }
        appointment.setStatus(Appointment.Status.CANCELLED);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getDoctorAppointments(User doctorUser) {
        Doctor doctor = doctorRepository.findByUser(doctorUser)
                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
        return appointmentRepository.findByDoctor(doctor);
    }

    public Appointment updateStatus(Long id, String status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(Appointment.Status.valueOf(status.toUpperCase()));
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}
