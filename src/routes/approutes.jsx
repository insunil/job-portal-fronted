import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { useCookies } from "react-cookie";

import LandingPage from "../landing/landing";
import SeekerLogin from "../auth/seekerLogin/index";
import EmployerLogin from "../auth/employerLogin/index";
import Register from "../auth/seekerRegister/index";

import { SeekerRoutes } from "@seeker/routes/MainRoutes";
import { EmployerRoutes } from "@employer/routes/MainRoutes";

import RoleProtectedRoute from "./roleprotecteRoutes"; 
import Unauthorized from "./unauthorized";


export default function AppRoutes() {
  return (
    <Routes>

      {/* 🌐 Landing */}
      <Route path="/" element={<LandingPage />} />

     
      <Route path="/seeker-login" element={<SeekerLogin />} />
      <Route path="/employer-login" element={<EmployerLogin />} />
      <Route path="/seeker-register" element={<Register />} />

      {/* 🔐 Seeker protected */}
      <Route
        path="/seeker/*"
        element={
          <RoleProtectedRoute allowedRoles={["seeker"]}>
            <SeekerRoutes />
          </RoleProtectedRoute>
        }
      />

      {/* 🔐 Employer protected */}
      <Route
        path="/employer/*"
        element={
          <RoleProtectedRoute allowedRoles={["employer"]}>
            <EmployerRoutes />
          </RoleProtectedRoute>
        }
      />
      
      <Route path="/unauthorized" element={<Unauthorized />} />

     
      <Route path="*" element={<div style={{ textAlign: 'center', padding: '20px' }}>Page Not Found</div>} />

    </Routes>
  );
}
