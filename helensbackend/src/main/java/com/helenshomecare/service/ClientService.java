package com.helenshomecare.service;

import com.helenshomecare.dto.ClientRequest;
import com.helenshomecare.entity.Assessment;
import com.helenshomecare.entity.Client;
import com.helenshomecare.enums.ClientStatus;
import com.helenshomecare.enums.County;
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
public class ClientService {

    private final ClientRepository clientRepository;
    private final AssessmentRepository assessmentRepository;

    public List<Client> getAll() {
        return clientRepository.findAllByOrderByCreatedAtDesc();
    }

    public Client getById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found: " + id));
    }

    public List<Client> filterByStatus(ClientStatus status) {
        return clientRepository.findByStatus(status);
    }

    public List<Client> filterByCounty(County county) {
        return clientRepository.findByCounty(county);
    }

    @Transactional
    public Client create(ClientRequest request) {
        Assessment assessment = resolveAssessment(request.getAssessmentId());

        Client client = Client.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .county(request.getCounty())
                .city(request.getCity())
                .carePlan(request.getCarePlan())
                .notes(request.getNotes())
                .status(request.getStatus() != null ? request.getStatus() : ClientStatus.ACTIVE)
                .assessment(assessment)
                .build();

        Client saved = clientRepository.save(client);
        log.info("Client created: id={}, name={}", saved.getId(), saved.getFullName());
        return saved;
    }

    @Transactional
    public Client update(Long id, ClientRequest request) {
        Client client = getById(id);
        Assessment assessment = resolveAssessment(request.getAssessmentId());

        client.setFullName(request.getFullName());
        client.setPhoneNumber(request.getPhoneNumber());
        client.setEmail(request.getEmail());
        client.setCounty(request.getCounty());
        client.setCity(request.getCity());
        client.setCarePlan(request.getCarePlan());
        client.setNotes(request.getNotes());
        if (request.getStatus() != null) client.setStatus(request.getStatus());
        if (assessment != null) client.setAssessment(assessment);

        return clientRepository.save(client);
    }

    @Transactional
    public Client archive(Long id) {
        Client client = getById(id);
        client.setStatus(ClientStatus.INACTIVE);
        return clientRepository.save(client);
    }

    @Transactional
    public void delete(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new EntityNotFoundException("Client not found: " + id);
        }
        clientRepository.deleteById(id);
    }

    private Assessment resolveAssessment(Long assessmentId) {
        if (assessmentId == null) return null;
        return assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found: " + assessmentId));
    }
}
