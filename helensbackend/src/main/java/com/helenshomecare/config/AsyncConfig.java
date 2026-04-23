package com.helenshomecare.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class AsyncConfig {
    // Enables @Async on EmailService methods
    // Default SimpleAsyncTaskExecutor is fine for this volume.
    // For production, define a custom ThreadPoolTaskExecutor bean here.
}
