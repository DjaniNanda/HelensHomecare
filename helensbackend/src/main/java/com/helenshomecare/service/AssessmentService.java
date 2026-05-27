package com.helenshomecare.service;

import com.helenshomecare.dto.AssessmentRequest;
import com.helenshomecare.dto.AssessmentStatusUpdate;
import com.helenshomecare.entity.Assessment;
import com.helenshomecare.entity.Client;
import com.helenshomecare.enums.AssessmentStatus;
import com.helenshomecare.enums.ClientStatus;
import com.helenshomecare.enums.County;
import com.helenshomecare.enums.TypeOfCare;
import com.helenshomecare.repository.AssessmentRepository;
import com.helenshomecare.repository.ClientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final ClientRepository clientRepository;
    private final EmailService emailService;

    /**
     * Public endpoint: submit a new assessment.
     */
    @Transactional
    public Assessment submit(AssessmentRequest request) {
        Assessment assessment = Assessment.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .county(request.getCounty())
                .city(request.getCity())
                .typeOfCare(request.getTypeOfCare())
                .status(AssessmentStatus.PENDING)
                .build();

        Assessment saved = assessmentRepository.save(assessment);
        log.info("New assessment submitted: id={}, type={}", saved.getId(), saved.getTypeOfCare());
        emailService.sendAssessmentEmails(saved);
        return saved;
    }

    // ─── Admin operations ─────────────────────────────────────────────────────

    public List<Assessment> getAll() {
        return assessmentRepository.findAllByOrderBySubmittedAtDesc();
    }

    public Assessment getById(Long id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found: " + id));
    }

    public List<Assessment> filter(TypeOfCare typeOfCare, County county, AssessmentStatus status) {
        if (typeOfCare != null && county != null) return assessmentRepository.findByTypeOfCareAndCounty(typeOfCare, county);
        if (typeOfCare != null && status != null) return assessmentRepository.findByTypeOfCareAndStatus(typeOfCare, status);
        if (county != null && status != null) return assessmentRepository.findByCountyAndStatus(county, status);
        if (typeOfCare != null) return assessmentRepository.findByTypeOfCare(typeOfCare);
        if (county != null) return assessmentRepository.findByCounty(county);
        if (status != null) return assessmentRepository.findByStatus(status);
        return getAll();
    }

    /**
     * Update the status of an assessment.
     * PENDING → CONTACTED: auto-create a Client (HOME_CARE or UNSURE only).
     */
    @Transactional
    public Assessment updateStatus(Long id, AssessmentStatusUpdate update) {
        Assessment assessment = getById(id);

        boolean isTransitionToContacted =
                assessment.getStatus() == AssessmentStatus.PENDING
                        && update.getStatus() == AssessmentStatus.CONTACTED;

        assessment.setStatus(update.getStatus());
        Assessment saved = assessmentRepository.save(assessment);

        if (isTransitionToContacted) {
            convertToClient(saved);
        }

        return saved;
    }

    @Transactional
    public void delete(Long id) {
        if (!assessmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Assessment not found: " + id);
        }
        assessmentRepository.deleteById(id);
    }

    // ─── Private helpers ──────────────────────────────────────────────────────

    private void convertToClient(Assessment assessment) {
        if (clientRepository.findByAssessment(assessment).isPresent()) {
            log.warn("Client already exists for assessment id={}", assessment.getId());
            return;
        }

        Client client = Client.builder()
                .fullName(assessment.getFullName())
                .phoneNumber(assessment.getPhoneNumber())
                .email(assessment.getEmail())
                .county(assessment.getCounty())
                .city(assessment.getCity())
                .status(ClientStatus.ACTIVE)
                .assessment(assessment)
                .build();

        Client saved = clientRepository.save(client);
        log.info("Assessment id={} (type={}) auto-converted to Client id={}",
                assessment.getId(), assessment.getTypeOfCare(), saved.getId());
    }
}