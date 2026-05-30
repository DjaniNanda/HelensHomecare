package com.helenshomecare.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * One-time data migrations run at startup. Safe to re-run — affects 0 rows after first execution.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataMigration {

    private final JdbcTemplate jdbc;

    @PostConstruct
    public void migrate() {
        // 1. Remap removed LOOKING_FOR_WORK enum value
        int rows1 = jdbc.update(
                "UPDATE assessments SET type_of_care = 'UNSURE' WHERE type_of_care = 'LOOKING_FOR_WORK'"
        );
        if (rows1 > 0) log.info("DataMigration: remapped {} LOOKING_FOR_WORK → UNSURE", rows1);

        // 2. Any assessments already linked to a client should become HHC_CLIENT status
        int rows2 = jdbc.update("""
            UPDATE assessments a
            SET status = 'HHC_CLIENT'
            WHERE EXISTS (SELECT 1 FROM clients c WHERE c.assessment_id = a.id)
              AND a.status != 'HHC_CLIENT'
        """);
        if (rows2 > 0) log.info("DataMigration: promoted {} existing client assessments → HHC_CLIENT", rows2);
    }
}