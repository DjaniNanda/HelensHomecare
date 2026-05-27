package com.helenshomecare.repository;

import com.helenshomecare.entity.Assessment;
import com.helenshomecare.entity.CaregiverApplication;
import com.helenshomecare.entity.Employee;
import com.helenshomecare.enums.County;
import com.helenshomecare.enums.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByStatus(EmployeeStatus status);

    List<Employee> findByAssignedZonesContaining(County county);

    List<Employee> findAllByOrderByCreatedAtDesc();

    Optional<Employee> findByAssessment(Assessment assessment);

    Optional<Employee> findByCaregiverApplication(CaregiverApplication caregiverApplication);
}