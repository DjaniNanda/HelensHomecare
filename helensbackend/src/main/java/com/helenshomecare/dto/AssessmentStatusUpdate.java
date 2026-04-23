package com.helenshomecare.dto;

import com.helenshomecare.enums.AssessmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssessmentStatusUpdate {

    @NotNull(message = "Status is required")
    private AssessmentStatus status;
}
