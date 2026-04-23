package com.helenshomecare.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Login and logout via REST")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    public record LoginRequest(
            @Schema(example = "admin") String username,
            @Schema(example = "Admin@2026!") String password
    ) {}

    @Operation(
            summary = "Login as admin",
            description = "Authenticates with username/password and returns a session cookie (JSESSIONID). " +
                    "Use this cookie in subsequent requests to access /api/admin/** endpoints.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Login successful — JSESSIONID cookie is set"),
                    @ApiResponse(responseCode = "401", description = "Bad credentials", content = @Content)
            }
    )
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );

            // Store authentication in a new session (session fixation protection)
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(auth);
            SecurityContextHolder.setContext(context);

            HttpSession session = httpRequest.getSession(true);
            session.setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    context
            );

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "username", auth.getName(),
                    "sessionId", session.getId()
            ));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }
    }

    @Operation(
            summary = "Logout",
            description = "Invalidates the current session and clears the JSESSIONID cookie."
    )
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}