import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import UserPage from "./../pages/UserPage/index";
import CoursePage from "./../pages/CoursePage/index";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import AchievementPage from "../pages/AchievementPage";
import VoucherPage from "../pages/VoucherPage";
import StudyPage from "../pages/StudyPage";
import PrivateRoute from "./private.route";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="voucher" element={<VoucherPage />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="achievement" element={<AchievementPage />} />
          <Route path="study" element={<StudyPage />} />
          <Route path="*" element={<div>error</div>} />
        </Route>
        <Route index element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
