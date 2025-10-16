import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPage from "./pages/Auth/ForgetPage";
import SignupPage from "./pages/Auth/SignupPage";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import CategoryDetails from "./components/categories/CategoryDetails";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="category/:categoryId" element={<CategoryDetails />} />
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
