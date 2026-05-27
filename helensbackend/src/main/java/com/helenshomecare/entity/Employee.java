package com.helenshomecare.entity;

import com.helenshomecare.enums.County;
import com.helenshomecare.enums.EmployeeStatus;
import com.helenshomecare.enums.Shift;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "employees")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String city;

    // Assigned care zones (counties)
    @ElementCollection
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "employee_zones", joinColumns = @JoinColumn(name = "employee_id"))
    @Column(name = "county")
    private List<County> assignedZones;

    // Days available to work
    @ElementCollection
    @CollectionTable(name = "employee_available_days", joinColumns = @JoinColumn(name = "employee_id"))
    @Column(name = "day")
    private List<String> availableDays;

    @Enumerated(EnumType.STRING)
    private Shift shift;

    private String notes;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private EmployeeStatus status = EmployeeStatus.ACTIVE;

    // Link to original caregiver application (if hired via application flow)
    @OneToOne
    @JoinColumn(name = "caregiver_application_id")
    private CaregiverApplication caregiverApplication;

    // Link to original assessment (legacy)
    @OneToOne
    @JoinColumn(name = "assessment_id")
    private Assessment assessment;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}