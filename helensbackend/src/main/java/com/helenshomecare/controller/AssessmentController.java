package com.helenshomecare.controller;

import com.helenshomecare.dto.AssessmentRequest;
import com.helenshomecare.entity.Assessment;
import com.helenshomecare.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Public endpoint — no authentication required.
 * POST /api/assessments  → submit free assessment form
 */
@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;

    @PostMapping
    public ResponseEntity<?> submit(@Valid @RequestBody AssessmentRequest request) {
        Assessment saved = assessmentService.submit(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Assessment submitted successfully. We will contact you shortly.",
                "id", saved.getId()
        ));
    }
}
