package com.helenshomecare.controller;

import com.helenshomecare.dto.ClientRequest;
import com.helenshomecare.entity.Client;
import com.helenshomecare.enums.ClientStatus;
import com.helenshomecare.enums.County;
import com.helenshomecare.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/clients")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminClientController {

    private final ClientService clientService;

    /** GET /api/admin/clients?status=ACTIVE&county=GWINNETT */
    @GetMapping
    public ResponseEntity<List<Client>> list(
            @RequestParam(required = false) ClientStatus status,
            @RequestParam(required = false) County county) {
        if (status != null) return ResponseEntity.ok(clientService.filterByStatus(status));
        if (county != null) return ResponseEntity.ok(clientService.filterByCounty(county));
        return ResponseEntity.ok(clientService.getAll());
    }

    /** GET /api/admin/clients/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<Client> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getById(id));
    }

    /** POST /api/admin/clients */
    @PostMapping
    public ResponseEntity<Client> create(@Valid @RequestBody ClientRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.create(request));
    }

    /** PUT /api/admin/clients/{id} */
    @PutMapping("/{id}")
    public ResponseEntity<Client> update(
            @PathVariable Long id,
            @Valid @RequestBody ClientRequest request) {
        return ResponseEntity.ok(clientService.update(id, request));
    }

    /** PATCH /api/admin/clients/{id}/archive */
    @PatchMapping("/{id}/archive")
    public ResponseEntity<Client> archive(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.archive(id));
    }

    /** DELETE /api/admin/clients/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
