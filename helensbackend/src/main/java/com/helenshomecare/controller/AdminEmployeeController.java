package com.helenshomecare.controller;

import com.helenshomecare.dto.EmployeeRequest;
import com.helenshomecare.entity.Employee;
import com.helenshomecare.enums.County;
import com.helenshomecare.enums.EmployeeStatus;
import com.helenshomecare.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/employees")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminEmployeeController {

    private final EmployeeService employeeService;

    /** GET /api/admin/employees?status=ACTIVE&zone=GWINNETT */
    @GetMapping
    public ResponseEntity<List<Employee>> list(
            @RequestParam(required = false) EmployeeStatus status,
            @RequestParam(required = false) County zone) {
        if (status != null) return ResponseEntity.ok(employeeService.filterByStatus(status));
        if (zone != null) return ResponseEntity.ok(employeeService.filterByZone(zone));
        return ResponseEntity.ok(employeeService.getAll());
    }

    /** GET /api/admin/employees/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getById(id));
    }

    /** POST /api/admin/employees */
    @PostMapping
    public ResponseEntity<Employee> create(@Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.create(request));
    }

    /** PUT /api/admin/employees/{id} */
    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(employeeService.update(id, request));
    }

    /** PATCH /api/admin/employees/{id}/archive */
    @PatchMapping("/{id}/archive")
    public ResponseEntity<Employee> archive(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.archive(id));
    }

    /** DELETE /api/admin/employees/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
