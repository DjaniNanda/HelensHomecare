package com.helenshomecare.dto;

import com.helenshomecare.enums.CaregiverApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CaregiverApplicationStatusUpdate {

    @NotNull(message = "Status is required")
    private CaregiverApplicationStatus status;
}