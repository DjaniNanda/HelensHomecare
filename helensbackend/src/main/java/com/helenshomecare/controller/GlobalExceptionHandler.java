package com.helenshomecare.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // ─── 400 — Validation ────────────────────────────────────────────────────

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getAllErrors().stream()
                .filter(e -> e instanceof FieldError)
                .map(e -> (FieldError) e)
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return respond(HttpStatus.BAD_REQUEST, "VALIDATION_FAILED", message);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Map<String, String>> handleMissingParam(MissingServletRequestParameterException ex) {
        return respond(HttpStatus.BAD_REQUEST, "MISSING_PARAMETER",
                "Required parameter '" + ex.getParameterName() + "' is missing");
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, String>> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String expected = ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "unknown";
        return respond(HttpStatus.BAD_REQUEST, "TYPE_MISMATCH",
                "Parameter '" + ex.getName() + "' should be of type " + expected
                        + " but received: '" + ex.getValue() + "'");
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleUnreadableBody() {
        return respond(HttpStatus.BAD_REQUEST, "MALFORMED_JSON",
                "Request body is missing or contains invalid JSON");
    }

    // ─── 401 — Authentication ────────────────────────────────────────────────

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials() {
        return respond(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS",
                "Invalid username or password");
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<Map<String, String>> handleDisabled() {
        return respond(HttpStatus.UNAUTHORIZED, "ACCOUNT_DISABLED",
                "This account has been disabled");
    }

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<Map<String, String>> handleLocked() {
        return respond(HttpStatus.UNAUTHORIZED, "ACCOUNT_LOCKED",
                "This account is locked");
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Map<String, String>> handleAuthentication() {
        return respond(HttpStatus.UNAUTHORIZED, "UNAUTHENTICATED",
                "Authentication required to access this resource");
    }

    // ─── 403 — Authorization ─────────────────────────────────────────────────

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> handleAccessDenied() {
        return respond(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
                "You do not have permission to access this resource");
    }

    // ─── 404 — Not Found ─────────────────────────────────────────────────────

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(EntityNotFoundException ex) {
        return respond(HttpStatus.NOT_FOUND, "NOT_FOUND", ex.getMessage());
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Map<String, String>> handleNoRoute(NoHandlerFoundException ex) {
        return respond(HttpStatus.NOT_FOUND, "ROUTE_NOT_FOUND",
                "No endpoint found for " + ex.getHttpMethod() + " " + ex.getRequestURL());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Map<String, String>> handleNoResource(NoResourceFoundException ex) {
        return respond(HttpStatus.NOT_FOUND, "ROUTE_NOT_FOUND",
                "No endpoint found for " + ex.getHttpMethod() + " /" + ex.getResourcePath());
    }

    // ─── 405 — Method Not Allowed ────────────────────────────────────────────

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Map<String, String>> handleMethodNotAllowed(HttpRequestMethodNotSupportedException ex) {
        return respond(HttpStatus.METHOD_NOT_ALLOWED, "METHOD_NOT_ALLOWED",
                "Method " + ex.getMethod() + " is not supported for this endpoint");
    }

    // ─── 415 — Unsupported Media Type ────────────────────────────────────────

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Map<String, String>> handleUnsupportedMedia(HttpMediaTypeNotSupportedException ex) {
        return respond(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "UNSUPPORTED_MEDIA_TYPE",
                "Content-Type '" + ex.getContentType() + "' is not supported. Use application/json");
    }

    // ─── 409 — Conflict ──────────────────────────────────────────────────────

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrity(
            DataIntegrityViolationException ex, HttpServletRequest req) {
        log.warn("Data integrity violation on {}: {}", req.getRequestURI(), ex.getMostSpecificCause().getMessage());
        return respond(HttpStatus.CONFLICT, "DATA_CONFLICT",
                "A record with this data already exists (duplicate or constraint violation)");
    }

    // ─── 500 — Internal Server Error ─────────────────────────────────────────

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneric(Exception ex, HttpServletRequest req) {
        log.error("Unhandled exception on {} {}: {}", req.getMethod(), req.getRequestURI(), ex.getMessage(), ex);
        return respond(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR",
                "An unexpected error occurred. Please try again later.");
    }

    // ─── Helper ──────────────────────────────────────────────────────────────

    private ResponseEntity<Map<String, String>> respond(HttpStatus status, String error, String message) {
        return ResponseEntity.status(status).body(Map.of("error", error, "message", message));
    }
}