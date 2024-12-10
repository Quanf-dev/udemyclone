import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import UserPage from "./../pages/UserPage/index";
import PrizePage from "./../pages/PrizePage/index";
import CoursePage from "./../pages/CoursePage/index";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import AchievementPage from "../pages/AchievementPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="prize" element={<PrizePage />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="achievement" element={<AchievementPage />} />
          <Route path="*" element={<div>error</div>} />
        </Route>
        <Route index element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
