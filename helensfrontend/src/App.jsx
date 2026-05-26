import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Footer         from "./components/Footer";
import Navbar         from "./components/Navbar";
import Home           from "./components/Home";
import AboutUs        from "./components/AboutUs";
import AssessmentPage          from "./components/AssessmentPage";
import CaregiverInterviewPage  from "./components/CaregiverInterviewPage";
import LoginPage      from "./components/LoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import JobInfo        from "./components/JobInfo";
import HiringProcess  from "./components/HiringProcess";
import ReviewsPage    from "./components/ReviewsPage";
/* ── Service pages ── */
import SeniorHomeCare    from "./components/services/SeniorHomeCare";
import PersonalCare      from "./components/services/PersonalCare";
import InHomeCare        from "./components/services/InHomeCare";
import CompanionCare     from "./components/services/CompanionCare";
import HospitalToHome    from "./components/services/HospitalToHome";
import SurgeryAssistance from "./components/services/SurgeryAssistance";
import DementiaCare      from "./components/services/DementiaCare";
import AlzheimersCare    from "./components/services/AlzheimersCare";

/* Redirects to /login if not authenticated */
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

/* Public layout: Navbar + content + Footer */
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about"          element={<PublicLayout><AboutUs /></PublicLayout>} />
      <Route path="/reviews"         element={<PublicLayout><ReviewsPage /></PublicLayout>} />
      <Route path="/assessment"           element={<PublicLayout><AssessmentPage /></PublicLayout>} />
      <Route path="/caregiver-interview"  element={<PublicLayout><CaregiverInterviewPage /></PublicLayout>} />
      <Route path="/job-info"       element={<PublicLayout><JobInfo /></PublicLayout>} />
      <Route path="/hiring-process" element={<PublicLayout><HiringProcess /></PublicLayout>} />

      {/* ── Care Services ── */}
      <Route path="/services/senior-home-care"    element={<PublicLayout><SeniorHomeCare /></PublicLayout>} />
      <Route path="/services/personal-care"       element={<PublicLayout><PersonalCare /></PublicLayout>} />
      <Route path="/services/24-7-in-home-care"   element={<PublicLayout><InHomeCare /></PublicLayout>} />
      <Route path="/services/companion-care"      element={<PublicLayout><CompanionCare /></PublicLayout>} />
      <Route path="/services/hospital-to-home"    element={<PublicLayout><HospitalToHome /></PublicLayout>} />
      <Route path="/services/surgery-assistance"  element={<PublicLayout><SurgeryAssistance /></PublicLayout>} />
      <Route path="/services/dementia-care"       element={<PublicLayout><DementiaCare /></PublicLayout>} />
      <Route path="/services/alzheimers-care"     element={<PublicLayout><AlzheimersCare /></PublicLayout>} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin — no public Navbar/Footer */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}