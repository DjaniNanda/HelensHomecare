FROM maven:3.9.6-eclipse-temurin-17 AS builder
 
WORKDIR /build
 
# Cache dependency downloads separately from source code
COPY pom.xml .
RUN mvn dependency:go-offline -q
 
# Copy source and build (skip tests for the image build)
COPY src ./src
RUN mvn package -DskipTests -q
 
# ─────────────────────────────────────────
# Stage 2 – Minimal runtime image
# ─────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine
 
WORKDIR /app
 
# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
 
# Copy the fat JAR from the builder stage
COPY --from=builder /build/target/helens-home-care-1.0.0.jar app.jar
 
# Give ownership to the non-root user
RUN chown appuser:appgroup app.jar
 
USER appuser
 
# Expose the default port (Render overrides this with $PORT at runtime)
EXPOSE 8080
 
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]