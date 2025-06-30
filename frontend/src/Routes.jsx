
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Homepage from "./pages/homepage";
import PhonePage from "./pages/phonePage";
import ShoppingCart from "./pages/shopping-cart";
import ComputerPage from "pages/laptopPage";
import CameraPage from "pages/cameraPage";
import ViewAllPhone from "pages/ViewAllPhone";
import ViewAllLaptop from "pages/ViewAllLaptop";
import ViewAllCamera from "pages/ViewAllCamera";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Policy from "./pages/PolicyPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MyAccountPage from "pages/userInfo";
import AdminPage from "pages/adminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageProduct from "./pages/ManageProductPage";
import Authenticate from "./pages/Authenticate";
import SmartphoneDetailPage from "./pages/smartphone-detail-page";
import LaptopDetailPage from "./pages/laptop-detail-page";
import CameraDetailPage from "./pages/camera-detail-page";


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/phones" element={<PhonePage />} />
          <Route path="/laptops" element={<ComputerPage />} />
          <Route path="/cameras" element={<CameraPage />} />
          <Route path="/laptops/all" element={<ViewAllLaptop />} />
          <Route path="/cameras/all" element={<ViewAllCamera />} />
          <Route path="/phones/all" element={<ViewAllPhone />} />
          <Route path="/smartphone-detail-page/:id" element={<SmartphoneDetailPage />} />
          <Route path="/laptop-detail-page/:id" element={<LaptopDetailPage />} />
          <Route path="/camera-detail-page/:id" element={<CameraDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/authenticate" element={<Authenticate/>}/>
          
          <Route
            path="/account"
            element={
              <ProtectedRoute allowedRoles={['USER']}> 
                <MyAccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}> 
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/manage" element={<ManageProduct />} />
          
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;