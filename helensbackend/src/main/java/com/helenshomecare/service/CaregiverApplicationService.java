package com.helenshomecare.service;

import com.helenshomecare.dto.CaregiverApplicationRequest;
import com.helenshomecare.dto.CaregiverApplicationStatusUpdate;
import com.helenshomecare.entity.CaregiverApplication;
import com.helenshomecare.enums.CaregiverApplicationStatus;
import com.helenshomecare.enums.County;
import com.helenshomecare.repository.CaregiverApplicationRepository;
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

    @Transactional
    public CaregiverApplication updateStatus(Long id, CaregiverApplicationStatusUpdate update) {
        CaregiverApplication application = getById(id);
        application.setStatus(update.getStatus());
        return repository.save(application);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Caregiver application not found: " + id);
        }
        repository.deleteById(id);
    }
}