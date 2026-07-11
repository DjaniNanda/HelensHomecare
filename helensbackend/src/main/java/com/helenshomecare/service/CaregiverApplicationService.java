package com.helenshomecare.service;

import com.helenshomecare.dto.CaregiverApplicationRequest;
import com.helenshomecare.dto.CaregiverApplicationStatusUpdate;
import com.helenshomecare.entity.CaregiverApplication;
import com.helenshomecare.entity.Employee;
import com.helenshomecare.enums.CaregiverApplicationStatus;
import com.helenshomecare.enums.County;
import com.helenshomecare.enums.EmployeeStatus;
import com.helenshomecare.repository.CaregiverApplicationRepository;
import com.helenshomecare.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CaregiverApplicationService {

    private final CaregiverApplicationRepository repository;
    private final EmployeeRepository employeeRepository;
    private final EmailService emailService;

    @Transactional
    public CaregiverApplication submit(CaregiverApplicationRequest request) {
        CaregiverApplication application = CaregiverApplication.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .county(request.getCounty())
                .city(request.getCity())
                .availableDays(request.getAvailableDays())
                .role(request.getRole())
                .shift(request.getShift())
                .status(CaregiverApplicationStatus.PENDING)
                .build();

        CaregiverApplication saved = repository.save(application);
        log.info("New caregiver application submitted: id={}, name={}", saved.getId(), saved.getFullName());
        emailService.sendCaregiverApplicationEmails(saved);
        return saved;
    }

    public List<CaregiverApplication> getAll() {
        return repository.findAllByOrderBySubmittedAtDesc();
    }

    public CaregiverApplication getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Caregiver application not found: " + id));
    }

    public List<CaregiverApplication> filter(CaregiverApplicationStatus status, County county) {
        if (status != null && county != null) return repository.findByStatusAndCounty(status, county);
        if (status != null) return repository.findByStatus(status);
        if (county != null) return repository.findByCounty(county);
        return getAll();
    }

    /**
     * Update status. When transitioning to HIRED → auto-create Employee.
     */
    @Transactional
    public CaregiverApplication updateStatus(Long id, CaregiverApplicationStatusUpdate update) {
        CaregiverApplication application = getById(id);

        boolean isTransitionToHired =
                application.getStatus() != CaregiverApplicationStatus.HIRED
                        && update.getStatus() == CaregiverApplicationStatus.HIRED;

        application.setStatus(update.getStatus());
        CaregiverApplication saved = repository.save(application);

        if (isTransitionToHired) {
            convertToEmployee(saved);
        }

        return saved;
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Caregiver application not found: " + id);
        }
        repository.deleteById(id);
    }

    // ─── Private helpers ──────────────────────────────────────────────────────

    private void convertToEmployee(CaregiverApplication application) {
        // Avoid duplicate conversion
        if (employeeRepository.findByCaregiverApplication(application).isPresent()) {
            log.warn("Employee already exists for caregiver application id={}", application.getId());
            return;
        }

        Employee employee = Employee.builder()
                .fullName(application.getFullName())
                .phoneNumber(application.getPhoneNumber())
                .email(application.getEmail())
                .city(application.getCity())
                .availableDays(application.getAvailableDays() == null
                        ? new java.util.ArrayList<>()
                        : new java.util.ArrayList<>(application.getAvailableDays()))
                .assignedZones(application.getCounty() == null
                        ? new java.util.ArrayList<>()
                        : new java.util.ArrayList<>(List.of(application.getCounty())))
                .shift(application.getShift())
                .status(EmployeeStatus.ACTIVE)
                .caregiverApplication(application)
                .build();

        Employee saved = employeeRepository.save(employee);
        log.info("Caregiver application id={} hired — auto-created Employee id={}", application.getId(), saved.getId());
    }
}