package com.helenshomecare.dto;

import com.helenshomecare.enums.County;
import com.helenshomecare.enums.EmployeeStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class EmployeeRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "City is required")
    private String city;

    @NotNull(message = "At least one assigned zone is required")
    private List<County> assignedZones;

    private String availability;

    private String notes;

    private EmployeeStatus status;

    // Optional: link to original "Looking for Work" assessment
    private Long assessmentId;
}
