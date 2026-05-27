package com.helenshomecare.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * One-time data migration: remap legacy LOOKING_FOR_WORK assessments to UNSURE
 * so the removed enum value no longer causes deserialization errors.
 * Safe to run repeatedly — affects 0 rows after first execution.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataMigration {

    private final JdbcTemplate jdbc;

    @PostConstruct
    public void migrate() {
        int rows = jdbc.update(
                "UPDATE assessments SET type_of_care = 'UNSURE' WHERE type_of_care = 'LOOKING_FOR_WORK'"
        );
        if (rows > 0) {
            log.info("DataMigration: remapped {} LOOKING_FOR_WORK assessment(s) to UNSURE", rows);
        }
    }
}