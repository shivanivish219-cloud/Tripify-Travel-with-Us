import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any route's element with this to require login.
// Usage: <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Send them home, remembering where they tried to go (App.jsx can use
    // this later to auto-open the auth modal if desired).
    return <Navigate to="/" state={{ from: location.pathname, requireAuth: true }} replace />;
  }

  return children;
}
