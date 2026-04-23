package com.helenshomecare.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Helen's Home Care API")
                        .description("""
                                Backend REST API for Helen's Home Care platform.
                                
                                **Public endpoints** (no auth required):
                                - `POST /api/assessments` — Submit a free assessment form
                                
                                **Admin endpoints** (login required):
                                - `/api/admin/assessments/**` — Manage assessment submissions
                                - `/api/admin/clients/**` — Manage client profiles
                                - `/api/admin/employees/**` — Manage employee profiles
                                
                                Use the **session cookie** after logging in via `/login` to access admin routes.
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Helen's Home Care")
                                .email("admin@helenshomecare.com")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Dev")))
                .addSecurityItem(new SecurityRequirement().addList("cookieAuth"))
                .components(new Components()
                        .addSecuritySchemes("cookieAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.COOKIE)
                                .name("JSESSIONID")
                                .description("Session cookie obtained after login via /login")));
    }
}