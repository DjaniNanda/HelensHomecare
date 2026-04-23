package com.helenshomecare.entity;

import com.helenshomecare.enums.ClientStatus;
import com.helenshomecare.enums.County;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "clients")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Client {

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

    @Column(columnDefinition = "TEXT")
    private String carePlan;

    private String notes;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ClientStatus status = ClientStatus.ACTIVE;

    // Link to original assessment if converted
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
