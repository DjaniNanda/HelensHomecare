package com.helenshomecare.dto;

import com.helenshomecare.enums.County;
import com.helenshomecare.enums.Shift;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CaregiverApplicationRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "County is required")
    private County county;

    @NotBlank(message = "City is required")
    private String city;

    @NotEmpty(message = "At least one available day is required")
    private List<String> availableDays;

    @NotNull(message = "Shift preference is required")
    private Shift shift;
}