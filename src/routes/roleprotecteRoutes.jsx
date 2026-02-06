// src/routes/RoleProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const [cookies] = useCookies([
    "seeker_token",
    "employer_token",
    "role",
  ]);

  const { seeker_token, employer_token, role } = cookies;

  if(!seeker_token && allowedRoles.includes("seeker")){
    return <Navigate to="/seeker-login" replace />;
  }

  if(!employer_token && allowedRoles.includes("employer")){
    return <Navigate to="/employer-login" replace />;
  }

  // ❌ Role mismatch → unauthorized
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Access granted
  return children;
}
