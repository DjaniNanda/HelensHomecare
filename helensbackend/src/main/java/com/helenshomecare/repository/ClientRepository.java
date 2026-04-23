package com.helenshomecare.repository;

import com.helenshomecare.entity.Assessment;
import com.helenshomecare.entity.Client;
import com.helenshomecare.enums.ClientStatus;
import com.helenshomecare.enums.County;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    List<Client> findByStatus(ClientStatus status);

    List<Client> findByCounty(County county);

    List<Client> findAllByOrderByCreatedAtDesc();

    Optional<Client> findByAssessment(Assessment assessment);
}
