package com.helenshomecare.config;

import com.helenshomecare.entity.AdminUser;
import com.helenshomecare.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminProperties adminProperties;

    @Override
    public void run(String... args) {
        if (adminUserRepository.findByUsername(adminProperties.getUsername()).isEmpty()) {
            AdminUser admin = AdminUser.builder()
                    .username(adminProperties.getUsername())
                    .passwordHash(passwordEncoder.encode(adminProperties.getPassword()))
                    .email(adminProperties.getEmail())
                    .enabled(true)
                    .build();

            adminUserRepository.save(admin);
            log.info("========================================================");
            log.info("  Default admin account created:");
            log.info("  Username : {}", adminProperties.getUsername());
            log.info("  Password : [PROTECTED]");
            log.info("========================================================");
        }
    }
}
