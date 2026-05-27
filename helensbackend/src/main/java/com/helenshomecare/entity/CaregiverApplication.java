package com.helenshomecare.entity;

import com.helenshomecare.enums.County;
import com.helenshomecare.enums.CaregiverApplicationStatus;
import com.helenshomecare.enums.Shift;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "caregiver_applications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CaregiverApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private County county;

    @Column(nullable = false)
    private String city;

    @ElementCollection
    @CollectionTable(name = "caregiver_application_days",
            joinColumns = @JoinColumn(name = "application_id"))
    @Column(name = "day")
    private List<String> availableDays;

    @Enumerated(EnumType.STRING)
    private Shift shift;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private CaregiverApplicationStatus status = CaregiverApplicationStatus.PENDING;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime submittedAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}