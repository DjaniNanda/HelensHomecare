// ─────────────────────────────────────────────────────────────
//  API CONFIGURATION — set API_URL in your .env file
// ─────────────────────────────────────────────────────────────

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Endpoint map — derived from BASE_URL so you never need to
// update any other file when the server address changes.
export const API = {
  // Public
  assessments:          `${BASE_URL}/api/assessments`,
  caregiverApplications:`${BASE_URL}/api/caregiver-applications`,

  // Auth
  login:             `${BASE_URL}/api/auth/login`,
  logout:            `${BASE_URL}/api/auth/logout`,

  // Admin — Assessments
  adminAssessments:  `${BASE_URL}/api/admin/assessments`,
  adminAssessment:   (id) => `${BASE_URL}/api/admin/assessments/${id}`,
  adminAssessmentStatus: (id) => `${BASE_URL}/api/admin/assessments/${id}/status`,

  // Admin — Clients
  adminClients:      `${BASE_URL}/api/admin/clients`,
  adminClient:       (id) => `${BASE_URL}/api/admin/clients/${id}`,
  adminClientArchive:(id) => `${BASE_URL}/api/admin/clients/${id}/archive`,

  // Admin — Employees
  adminEmployees:    `${BASE_URL}/api/admin/employees`,
  adminEmployee:     (id) => `${BASE_URL}/api/admin/employees/${id}`,
  adminEmployeeArchive:(id)=>`${BASE_URL}/api/admin/employees/${id}/archive`,
};