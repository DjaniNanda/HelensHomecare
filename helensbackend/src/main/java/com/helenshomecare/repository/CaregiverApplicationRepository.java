package com.helenshomecare.repository;

import com.helenshomecare.entity.CaregiverApplication;
import com.helenshomecare.enums.CaregiverApplicationStatus;
import com.helenshomecare.enums.County;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaregiverApplicationRepository extends JpaRepository<CaregiverApplication, Long> {

    List<CaregiverApplication> findAllByOrderBySubmittedAtDesc();

    List<CaregiverApplication> findByStatus(CaregiverApplicationStatus status);

    List<CaregiverApplication> findByCounty(County county);

    List<CaregiverApplication> findByStatusAndCounty(CaregiverApplicationStatus status, County county);
}