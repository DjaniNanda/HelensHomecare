package com.helenshomecare.dto;

import com.helenshomecare.enums.ClientStatus;
import com.helenshomecare.enums.County;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClientRequest {

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

    private String carePlan;

    private String notes;

    private ClientStatus status;

    // Optional: link to an existing assessment
    private Long assessmentId;
}
