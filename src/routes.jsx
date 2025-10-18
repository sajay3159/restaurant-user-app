import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPage from "./pages/Auth/ForgetPage";
import SignupPage from "./pages/Auth/SignupPage";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import PublicRoute from "./pages/Auth/PublicRoute";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import CategoryRecipesPage from "./pages/Categories/CategoryRecipesPage";
import Cart from "./components/Cart/Cart";
import ProfilePage from "./pages/Profile/ProfilePage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrderHistory from "./pages/history/OrderHistory";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forget"
        element={
          <PublicRoute>
            <ForgetPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="category/:categoryId" element={<CategoryRecipesPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orderHistory" element={<OrderHistory />} />
      </Route>
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
