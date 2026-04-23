package com.helenshomecare.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Standard error response")
public record ApiError(

        @Schema(description = "HTTP status code", example = "404")
        int status,

        @Schema(description = "Short error category", example = "NOT_FOUND")
        String error,

        @Schema(description = "Human-readable message", example = "Client not found: 42")
        String message,

        @Schema(description = "Request path that triggered the error", example = "/api/admin/clients/42")
        String path,

        @Schema(description = "Timestamp of the error")
        LocalDateTime timestamp,

        @Schema(description = "Field-level validation errors — only present on 400 validation failures")
        List<FieldViolation> violations
) {
    // Convenience constructor — no violations
    public ApiError(int status, String error, String message, String path) {
        this(status, error, message, path, LocalDateTime.now(), null);
    }

    // Convenience constructor — with violations
    public ApiError(int status, String error, String message, String path, List<FieldViolation> violations) {
        this(status, error, message, path, LocalDateTime.now(), violations);
    }

    @Schema(description = "A single field validation violation")
    public record FieldViolation(
            @Schema(example = "email") String field,
            @Schema(example = "must be a well-formed email address") String message,
            @Schema(example = "not-an-email") Object rejectedValue
    ) {}
}