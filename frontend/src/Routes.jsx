import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Homepage from "./pages/homepage";
import ProductDetailPage from "./pages/product-detail-page";
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
import HelpCenterPage from "./pages/HelpCenterPage";

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
          <Route path="/product-detail-page" element={<ProductDetailPage />} />
          <Route path="/laptops" element={<ComputerPage />} />
          <Route path="/cameras" element={<CameraPage />} />
          <Route path="/laptops/all" element={<ViewAllLaptop />} />
          <Route path="/cameras/all" element={<ViewAllCamera />} />
          <Route path="/phones/all" element={<ViewAllPhone />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;