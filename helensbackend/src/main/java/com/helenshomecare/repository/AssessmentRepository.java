package com.helenshomecare.repository;

import com.helenshomecare.entity.Assessment;
import com.helenshomecare.enums.AssessmentStatus;
import com.helenshomecare.enums.County;
import com.helenshomecare.enums.TypeOfCare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {

    List<Assessment> findByTypeOfCare(TypeOfCare typeOfCare);

    List<Assessment> findByCounty(County county);

    List<Assessment> findByStatus(AssessmentStatus status);

    List<Assessment> findByTypeOfCareAndCounty(TypeOfCare typeOfCare, County county);

    List<Assessment> findByTypeOfCareAndStatus(TypeOfCare typeOfCare, AssessmentStatus status);

    List<Assessment> findByCountyAndStatus(County county, AssessmentStatus status);

    List<Assessment> findAllByOrderBySubmittedAtDesc();
}
