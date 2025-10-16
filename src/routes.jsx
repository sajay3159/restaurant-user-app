import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPage from "./pages/Auth/ForgetPage";
import SignupPage from "./pages/Auth/SignupPage";
import Header from "./components/Common/Header";
import Layout from "./components/Layout/Layout";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget" element={<ForgetPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
