package com.helenshomecare.service;

import com.helenshomecare.dto.EmployeeRequest;
import com.helenshomecare.entity.Assessment;
import com.helenshomecare.entity.CaregiverApplication;
import com.helenshomecare.entity.Employee;
import com.helenshomecare.enums.County;
import com.helenshomecare.enums.EmployeeStatus;
import com.helenshomecare.repository.AssessmentRepository;
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
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AssessmentRepository assessmentRepository;
    private final CaregiverApplicationRepository caregiverApplicationRepository;

    public List<Employee> getAll() {
        return employeeRepository.findAllByOrderByCreatedAtDesc();
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found: " + id));
    }

    public List<Employee> filterByStatus(EmployeeStatus status) {
        return employeeRepository.findByStatus(status);
    }

    public List<Employee> filterByZone(County county) {
        return employeeRepository.findByAssignedZonesContaining(county);
    }

    @Transactional
    public Employee create(EmployeeRequest request) {
        Assessment assessment = resolveAssessment(request.getAssessmentId());
        CaregiverApplication application = resolveCaregiverApplication(request.getCaregiverApplicationId());

        Employee employee = Employee.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .city(request.getCity())
                .assignedZones(request.getAssignedZones())
                .availableDays(request.getAvailableDays())
                .shift(request.getShift())
                .notes(request.getNotes())
                .status(request.getStatus() != null ? request.getStatus() : EmployeeStatus.ACTIVE)
                .assessment(assessment)
                .caregiverApplication(application)
                .build();

        Employee saved = employeeRepository.save(employee);
        log.info("Employee created: id={}, name={}", saved.getId(), saved.getFullName());
        return saved;
    }

    @Transactional
    public Employee update(Long id, EmployeeRequest request) {
        Employee employee = getById(id);
        Assessment assessment = resolveAssessment(request.getAssessmentId());
        CaregiverApplication application = resolveCaregiverApplication(request.getCaregiverApplicationId());

        employee.setFullName(request.getFullName());
        employee.setPhoneNumber(request.getPhoneNumber());
        employee.setEmail(request.getEmail());
        employee.setCity(request.getCity());
        employee.setAssignedZones(request.getAssignedZones());
        employee.setAvailableDays(request.getAvailableDays());
        employee.setShift(request.getShift());
        employee.setNotes(request.getNotes());
        if (request.getStatus() != null) employee.setStatus(request.getStatus());
        if (assessment != null) employee.setAssessment(assessment);
        if (application != null) employee.setCaregiverApplication(application);

        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee archive(Long id) {
        Employee employee = getById(id);
        employee.setStatus(EmployeeStatus.TERMINATED);
        return employeeRepository.save(employee);
    }

    @Transactional
    public void delete(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee not found: " + id);
        }
        employeeRepository.deleteById(id);
    }

    private Assessment resolveAssessment(Long assessmentId) {
        if (assessmentId == null) return null;
        return assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found: " + assessmentId));
    }

    private CaregiverApplication resolveCaregiverApplication(Long appId) {
        if (appId == null) return null;
        return caregiverApplicationRepository.findById(appId)
                .orElseThrow(() -> new EntityNotFoundException("Caregiver application not found: " + appId));
    }
}