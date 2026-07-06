package com.doctorsystem.dto;

import lombok.Data;

@Data
public class AppointmentRequest {
    private Long doctorId;
    private String appointmentDate;
}
