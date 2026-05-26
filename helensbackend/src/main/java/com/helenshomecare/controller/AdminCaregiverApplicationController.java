package com.helenshomecare.controller;

import com.helenshomecare.dto.CaregiverApplicationStatusUpdate;
import com.helenshomecare.entity.CaregiverApplication;
import com.helenshomecare.enums.CaregiverApplicationStatus;
import com.helenshomecare.enums.County;
import com.helenshomecare.service.CaregiverApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Admin-only endpoints for caregiver application management.
 * All routes under /api/admin/** are secured in SecurityConfig.
 */
@RestController
@RequestMapping("/api/admin/caregiver-applications")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminCaregiverApplicationController {

    private final CaregiverApplicationService caregiverApplicationService;

    /** GET /api/admin/caregiver-applications?status=PENDING&county=GWINNETT */
    @GetMapping
    public ResponseEntity<List<CaregiverApplication>> list(
            @RequestParam(required = false) CaregiverApplicationStatus status,
            @RequestParam(required = false) County county) {
        return ResponseEntity.ok(caregiverApplicationService.filter(status, county));
    }

    /** GET /api/admin/caregiver-applications/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<CaregiverApplication> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(caregiverApplicationService.getById(id));
    }

    /** PATCH /api/admin/caregiver-applications/{id}/status */
    @PatchMapping("/{id}/status")
    public ResponseEntity<CaregiverApplication> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody CaregiverApplicationStatusUpdate update) {
        return ResponseEntity.ok(caregiverApplicationService.updateStatus(id, update));
    }

    /** DELETE /api/admin/caregiver-applications/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        caregiverApplicationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}