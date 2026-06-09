package com.helenshomecare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ping")
public class HealthController {

    @GetMapping
    public ResponseEntity<?> ping() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }
}