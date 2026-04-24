import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import { Toaster } from "sonner";

// Pages
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LeadsPage from "./pages/leads/LeadsPage";
import TracksPage from "./pages/tracks/TracksPage";
import TrackDetailPage from "./pages/tracks/TrackDetailPage";
import CohortsPage from "./pages/cohorts/CohortsPage";
import CohortDetailPage from "./pages/cohorts/CohortDetailPage";
import LessonPage from "./pages/lessons/LessonPage";
import StudentsPage from "./pages/students/StudentsPage";
import ResourcesPage from "./pages/resources/ResourcesPage";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import WalletPage from "./pages/wallet/WalletPage";
import OrganizationsPage from "./pages/organizations/OrganizationsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import SubmissionsPage from "./pages/submissions/SubmissionsPage";

// Admin / Dashboard
// Placeholder removed as real components are imported above

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" expand={false} richColors />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />

          {/* Protected App Routes */}
          <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="leads" element={<ProtectedRoute role="admin"><LeadsPage /></ProtectedRoute>} />
            <Route path="tracks" element={<TracksPage />} />
            <Route path="tracks/:id" element={<TrackDetailPage />} />
            <Route path="cohorts" element={<CohortsPage />} />
            <Route path="cohorts/:id" element={<CohortDetailPage />} />
            <Route path="cohorts/:id/lesson/:lessonId" element={<LessonPage />} />
            <Route path="students" element={<ProtectedRoute role="admin"><StudentsPage /></ProtectedRoute>} />
            <Route path="submissions" element={<ProtectedRoute role="admin"><SubmissionsPage /></ProtectedRoute>} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="organizations" element={<ProtectedRoute role="admin"><OrganizationsPage /></ProtectedRoute>} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Organizations and Settings can be added later or stay as placeholders */}
            
            {/* Phase 2: Other routes will be mapped here as we build them */}
            <Route path="*" element={<div>Page coming soon...</div>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
