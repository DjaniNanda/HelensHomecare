package com.helenshomecare.service;

import com.helenshomecare.entity.Assessment;
import com.helenshomecare.entity.CaregiverApplication;
import com.helenshomecare.enums.TypeOfCare;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.name}")
    private String adminName;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // ─── SVG Icons (inline, email-safe) ──────────────────────────────────────

    private static final String ICON_PHONE = """
            <span style="display:inline-block;vertical-align:middle;margin-right:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="#4A9BB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07
                         A19.5 19.5 0 0 1 4.07 13 19.79 19.79 0 0 1 1 4.18 2 2 0 0 1 2.96 2
                         h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11
                         L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45
                         c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            """;

    private static final String ICON_MAIL = """
            <span style="display:inline-block;vertical-align:middle;margin-right:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="#4A9BB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            """;

    private static final String ICON_USER = """
            <span style="display:inline-block;vertical-align:middle;margin-right:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="#4A9BB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            """;

    private static final String ICON_MAP_PIN = """
            <span style="display:inline-block;vertical-align:middle;margin-right:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="#4A9BB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            """;

    private static final String ICON_BRIEFCASE = """
            <span style="display:inline-block;vertical-align:middle;margin-right:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="#4A9BB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </span>
            """;

    private static final String ICON_CLOCK = """
            <span style="display:inline-block;vertical-align:middle;margin-right:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="#4A9BB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </span>
            """;

    private static final String ICON_CHECK = """
            <span style="display:inline-block;vertical-align:middle;margin-right:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                   fill="none" stroke="#2C6E8A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            """;

    /**
     * Sends confirmation email to the submitter and notification email to admin.
     */
    @Async
    public void sendAssessmentEmails(Assessment assessment) {
        sendSubmitterConfirmation(assessment);
        sendAdminNotification(assessment);
    }

    // ─── Submitter Email ──────────────────────────────────────────────────────

    private void sendSubmitterConfirmation(Assessment assessment) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "Helen's Home Care");
            helper.setTo(assessment.getEmail());
            helper.setSubject(getSubmitterSubject(assessment.getTypeOfCare()));
            helper.setText(buildSubmitterBody(assessment), true);

            mailSender.send(message);
            log.info("Confirmation email sent to {}", assessment.getEmail());
        } catch (Exception e) {
            log.error("Failed to send confirmation email to {}: {}", assessment.getEmail(), e.getMessage());
        }
    }

    private String getSubmitterSubject(TypeOfCare typeOfCare) {
        return "Assessment Request Received - Helen's Home Care";
    }

    private String buildSubmitterBody(Assessment assessment) {
        String heading     = "Assessment Request Received";
        String intro       = "Thank you for reaching out to Helen's Home Care!";
        String bodyContent = """
                    <p style="color:#3a3a3a;line-height:1.7;margin:0 0 16px;">
                        Dear <strong style="color:#2C6E8A;">%s</strong>,
                    </p>
                    <p style="color:#3a3a3a;line-height:1.7;margin:0 0 16px;">
                        We have received your home care assessment request and we are glad
                        you reached out to us.
                    </p>
                    <div style="background:#F5EDD6;border-left:4px solid #D4A843;
                                padding:16px 20px;margin:24px 0;">
                        %s
                        <span style="color:#2C6E8A;font-weight:bold;">
                            One of our care coordinators will call you within 24 hours at
                            <span style="color:#D4A843;">%s</span> to discuss your needs.
                        </span>
                    </div>
                    <p style="color:#3a3a3a;line-height:1.7;margin:0;">
                        We look forward to speaking with you soon.
                    </p>
                    """.formatted(assessment.getFullName(), ICON_CHECK, assessment.getPhoneNumber());

        return buildHtmlEmail(heading, intro, bodyContent);
    }

    // ─── Admin Email ──────────────────────────────────────────────────────────

    private void sendAdminNotification(Assessment assessment) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "Helen's Home Care System");
            helper.setTo(adminEmail);
            helper.setSubject("New Lead: %s - %s".formatted(
                    formatTypeOfCare(assessment.getTypeOfCare()),
                    assessment.getFullName()
            ));
            helper.setText(buildAdminBody(assessment), true);

            mailSender.send(message);
            log.info("Admin notification sent for assessment id={}", assessment.getId());
        } catch (Exception e) {
            log.error("Failed to send admin notification: {}", e.getMessage());
        }
    }

    private String buildAdminBody(Assessment assessment) {
        String callButton = """
                <a href="tel:%s"
                   style="display:inline-block;padding:12px 22px;background:#2C6E8A;color:#ffffff;
                          border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">
                   Call %s
                </a>
                """.formatted(assessment.getPhoneNumber(), assessment.getFullName());

        String emailButton = """
                <a href="mailto:%s"
                   style="display:inline-block;padding:12px 22px;background:#4A9BB5;color:#ffffff;
                          border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;
                          margin-left:12px;">
                   Email %s
                </a>
                """.formatted(assessment.getEmail(), assessment.getFullName());

        String details = """
                <table style="width:100%%;border-collapse:collapse;margin-bottom:28px;">
                  <tr>
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;width:38%%;">
                      %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;
                        letter-spacing:.5px;">Name</span>
                    </td>
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;
                               color:#2C6E8A;font-weight:bold;">
                      %s
                    </td>
                  </tr>
                  <tr style="background:#F8F6F1;">
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                      %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;
                        letter-spacing:.5px;">Phone</span>
                    </td>
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;color:#3a3a3a;">
                      %s
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                      %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;
                        letter-spacing:.5px;">Email</span>
                    </td>
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;color:#3a3a3a;">
                      %s
                    </td>
                  </tr>
                  <tr style="background:#F8F6F1;">
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                      %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;
                        letter-spacing:.5px;">Location</span>
                    </td>
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;color:#3a3a3a;">
                      %s, %s
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                      %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;
                        letter-spacing:.5px;">Type of Care</span>
                    </td>
                    <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                      <span style="background:#F5EDD6;color:#a07828;font-weight:bold;font-size:12px;
                                   padding:3px 10px;border-radius:12px;text-transform:uppercase;
                                   letter-spacing:.5px;">
                        %s
                      </span>
                    </td>
                  </tr>
                  <tr style="background:#F8F6F1;">
                    <td style="padding:10px 14px;">
                      %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;
                        letter-spacing:.5px;">Submitted</span>
                    </td>
                    <td style="padding:10px 14px;color:#888888;font-size:13px;">
                      %s
                    </td>
                  </tr>
                </table>
                <div>
                  %s %s
                </div>
                """.formatted(
                ICON_USER,       assessment.getFullName(),
                ICON_PHONE,      assessment.getPhoneNumber(),
                ICON_MAIL,       assessment.getEmail(),
                ICON_MAP_PIN,    assessment.getCity(), assessment.getCounty(),
                ICON_BRIEFCASE,  formatTypeOfCare(assessment.getTypeOfCare()),
                ICON_CLOCK,      assessment.getSubmittedAt(),
                callButton,      emailButton
        );

        return buildHtmlEmail("New Lead Submitted", "Action Required", details);
    }

    // ─── Caregiver Application Emails ────────────────────────────────────────

    @Async
    public void sendCaregiverApplicationEmails(CaregiverApplication application) {
        sendCaregiverConfirmation(application);
        sendCaregiverAdminNotification(application);
    }

    private void sendCaregiverConfirmation(CaregiverApplication application) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "Helen's Home Care");
            helper.setTo(application.getEmail());
            helper.setSubject("Application Received - Helen's Home Care");

            String days = application.getAvailableDays() != null
                    ? String.join(", ", application.getAvailableDays())
                    : "Not specified";

            String bodyContent = """
                    <p style="color:#3a3a3a;line-height:1.7;margin:0 0 16px;">
                        Dear <strong style="color:#2C6E8A;">%s</strong>,
                    </p>
                    <p style="color:#3a3a3a;line-height:1.7;margin:0 0 16px;">
                        We have received your caregiver application and truly appreciate
                        your interest in joining the Helen's Home Care family.
                    </p>
                    <div style="background:#F5EDD6;border-left:4px solid #D4A843;
                                padding:16px 20px;margin:24px 0;">
                        %s
                        <span style="color:#2C6E8A;font-weight:bold;">
                            A member of our recruitment team will call you within one business day at
                            <span style="color:#D4A843;">%s</span> to schedule your interview.
                        </span>
                    </div>
                    <p style="color:#3a3a3a;line-height:1.7;margin:0 0 16px;">
                        <strong>Your availability:</strong> %s
                    </p>
                    <p style="color:#3a3a3a;line-height:1.7;margin:0;">
                        We look forward to speaking with you soon.
                    </p>
                    """.formatted(application.getFullName(), ICON_CHECK, application.getPhoneNumber(), days);

            helper.setText(buildHtmlEmail("Application Received", "Thank you for applying!", bodyContent), true);
            mailSender.send(message);
            log.info("Caregiver confirmation email sent to {}", application.getEmail());
        } catch (Exception e) {
            log.error("Failed to send caregiver confirmation email to {}: {}", application.getEmail(), e.getMessage());
        }
    }

    private void sendCaregiverAdminNotification(CaregiverApplication application) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "Helen's Home Care System");
            helper.setTo(adminEmail);
            helper.setSubject("New Caregiver Application: " + application.getFullName());

            String days = application.getAvailableDays() != null
                    ? String.join(", ", application.getAvailableDays())
                    : "Not specified";

            String callButton = """
                    <a href="tel:%s"
                       style="display:inline-block;padding:12px 22px;background:#2C6E8A;color:#ffffff;
                              border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">
                       Call %s
                    </a>
                    """.formatted(application.getPhoneNumber(), application.getFullName());

            String emailButton = """
                    <a href="mailto:%s"
                       style="display:inline-block;padding:12px 22px;background:#4A9BB5;color:#ffffff;
                              border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;
                              margin-left:12px;">
                       Email %s
                    </a>
                    """.formatted(application.getEmail(), application.getFullName());

            String details = """
                    <table style="width:100%%;border-collapse:collapse;margin-bottom:28px;">
                      <tr>
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;width:38%%;">
                          %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;">Name</span>
                        </td>
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;color:#2C6E8A;font-weight:bold;">%s</td>
                      </tr>
                      <tr style="background:#F8F6F1;">
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                          %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;">Phone</span>
                        </td>
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;color:#3a3a3a;">%s</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                          %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;">Email</span>
                        </td>
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;color:#3a3a3a;">%s</td>
                      </tr>
                      <tr style="background:#F8F6F1;">
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                          %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;">Location</span>
                        </td>
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;color:#3a3a3a;">%s, %s</td>
                      </tr>
                      <tr>
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                          %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;">Available Days</span>
                        </td>
                        <td style="padding:10px 14px;border-bottom:1px solid #e8e0d0;">
                          <span style="background:#F5EDD6;color:#a07828;font-weight:bold;font-size:12px;
                                       padding:3px 10px;border-radius:12px;">%s</span>
                        </td>
                      </tr>
                      <tr style="background:#F8F6F1;">
                        <td style="padding:10px 14px;">
                          %s<span style="color:#888888;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:.5px;">Submitted</span>
                        </td>
                        <td style="padding:10px 14px;color:#888888;font-size:13px;">%s</td>
                      </tr>
                    </table>
                    <div>%s %s</div>
                    """.formatted(
                    ICON_USER,    application.getFullName(),
                    ICON_PHONE,   application.getPhoneNumber(),
                    ICON_MAIL,    application.getEmail(),
                    ICON_MAP_PIN, application.getCity(), application.getCounty(),
                    ICON_CLOCK,   days,
                    ICON_CLOCK,   application.getSubmittedAt(),
                    callButton,   emailButton
            );

            helper.setText(buildHtmlEmail("New Caregiver Application", "Action Required", details), true);
            mailSender.send(message);
            log.info("Admin notified of caregiver application id={}", application.getId());
        } catch (Exception e) {
            log.error("Failed to send caregiver admin notification: {}", e.getMessage());
        }
    }

    // ─── HTML Template ────────────────────────────────────────────────────────

    private String buildHtmlEmail(String heading, String intro, String content) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width,initial-scale=1">
                </head>
                <body style="font-family:Arial,Helvetica,sans-serif;background:#F8F6F1;margin:0;padding:0;">
                  <table width="100%%" cellpadding="0" cellspacing="0" border="0"
                         style="background:#F8F6F1;">
                    <tr>
                      <td align="center" style="padding:40px 16px;">
                        <table width="600" cellpadding="0" cellspacing="0" border="0"
                               style="background:#ffffff;border-radius:10px;
                                      max-width:600px;width:100%%;">

                          <!-- Header -->
                          <tr>
                            <td style="background:#2C6E8A;padding:28px 32px;border-radius:10px 10px 0 0;">
                              <p style="margin:0;font-size:22px;color:#ffffff;font-weight:bold;">
                                Helen's Home Care
                              </p>
                              <p style="margin:5px 0 0;font-size:13px;color:#c8e0ea;">
                                Quality Care in the Comfort of Your Home
                              </p>
                            </td>
                          </tr>

                          <!-- Sub-header bar -->
                          <tr>
                            <td style="background:#4A9BB5;padding:12px 32px;">
                              <p style="margin:0;font-size:12px;color:#F8F6F1;font-weight:bold;
                                        text-transform:uppercase;letter-spacing:1px;">%s</p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="padding:32px;background:#ffffff;">
                              <h2 style="color:#2C6E8A;margin:0 0 20px;font-size:20px;">%s</h2>
                              %s
                            </td>
                          </tr>

                          <!-- Gold divider -->
                          <tr>
                            <td style="padding:0 32px;background:#ffffff;">
                              <table width="100%%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="height:2px;background:#D4A843;width:40px;"></td>
                                  <td style="height:1px;background:#e8e0d0;"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="background:#F5EDD6;padding:18px 32px;text-align:center;
                                       border-radius:0 0 10px 10px;">
                              <p style="margin:0;font-size:12px;color:#8a7a5a;">
                                &copy; 2026 Helen's Home Care &nbsp;&middot;&nbsp; Gwinnett County, Georgia
                              </p>
                            </td>
                          </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(intro, heading, content);
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private String formatTypeOfCare(TypeOfCare typeOfCare) {
        return switch (typeOfCare) {
            case HOME_CARE -> "Home Care";
            case UNSURE    -> "Unsure";
        };
    }
}