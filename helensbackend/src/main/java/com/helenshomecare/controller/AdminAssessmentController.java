package com.helenshomecare.controller;

import com.helenshomecare.dto.AssessmentStatusUpdate;
import com.helenshomecare.entity.Assessment;
import com.helenshomecare.enums.AssessmentStatus;
import com.helenshomecare.enums.County;
import com.helenshomecare.enums.TypeOfCare;
import com.helenshomecare.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Admin-only endpoints for assessment management.
 * All routes under /api/admin/** are secured in SecurityConfig.
 */
@RestController
@RequestMapping("/api/admin/assessments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminAssessmentController {

    private final AssessmentService assessmentService;

    /** GET /api/admin/assessments
     *  Optional query params: typeOfCare, county, status */
    @GetMapping
    public ResponseEntity<List<Assessment>> list(
            @RequestParam(required = false) TypeOfCare typeOfCare,
            @RequestParam(required = false) County county,
            @RequestParam(required = false) AssessmentStatus status) {
        return ResponseEntity.ok(assessmentService.filter(typeOfCare, county, status));
    }

    /** GET /api/admin/assessments/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<Assessment> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.getById(id));
    }

    /** PATCH /api/admin/assessments/{id}/status */
    @PatchMapping("/{id}/status")
    public ResponseEntity<Assessment> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody AssessmentStatusUpdate update) {
        return ResponseEntity.ok(assessmentService.updateStatus(id, update));
    }

    /** DELETE /api/admin/assessments/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        assessmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
