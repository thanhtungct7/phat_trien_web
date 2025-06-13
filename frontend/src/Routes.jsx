import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Homepage from "./pages/homepage";
import ProductDetailPage from "./pages/product-detail-page";
import ProductListingPage from "./pages/product-listing-page";
import ShoppingCart from "./pages/shopping-cart";
import ComputerPage from "pages/laptopPage";
import CameraPage from "pages/cameraPage";
import ViewAllLaptop from "pages/ViewAllLaptop";
import ViewAllCamera from "pages/ViewAllCamera";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Policy from "./pages/PolicyPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/product-listing-page" element={<ProductListingPage />} />
          <Route path="/product-detail-page" element={<ProductDetailPage />} />
          <Route path="/laptops" element={<ComputerPage />} />
          <Route path="/cameras" element={<CameraPage />} />
          <Route path="/laptops/all" element={<ViewAllLaptop />} />
          <Route path="/cameras/all" element={<ViewAllCamera />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;