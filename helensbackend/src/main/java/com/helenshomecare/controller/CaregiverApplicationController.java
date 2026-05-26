package com.helenshomecare.controller;

import com.helenshomecare.dto.CaregiverApplicationRequest;
import com.helenshomecare.entity.CaregiverApplication;
import com.helenshomecare.service.CaregiverApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Public endpoint — no authentication required.
 * POST /api/caregiver-applications
 */
@RestController
@RequestMapping("/api/caregiver-applications")
@RequiredArgsConstructor
public class CaregiverApplicationController {

    private final CaregiverApplicationService caregiverApplicationService;

    @PostMapping
    public ResponseEntity<?> submit(@Valid @RequestBody CaregiverApplicationRequest request) {
        CaregiverApplication saved = caregiverApplicationService.submit(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Application submitted successfully. We will be in touch within one business day.",
                "id", saved.getId()
        ));
    }
}