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
import ManageProduct from "./pages/ManageProductPage";

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
          <Route path="/manage" element={<ManageProduct />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/phones/samsung" element={<PhonePage />} />
          <Route path="/phones/iphone" element={<PhonePage />} />
          <Route path="/phones/xiaomi" element={<PhonePage />} />
          <Route path="/phones/oppo" element={<PhonePage />} />
          <Route path="/phones/realme" element={<PhonePage />} />
          <Route path="/laptops/apple" element={<ComputerPage />} />
          <Route path="/laptops/dell" element={<ComputerPage />} />
          <Route path="/laptops/asus" element={<ComputerPage />} />
          <Route path="/laptops/lenovo" element={<ComputerPage />} />
          <Route path="/laptops/hp" element={<ComputerPage />} />
          <Route path="/cameras/ezviz" element={<CameraPage />} />
          <Route path="/cameras/tplink" element={<CameraPage />} />
          <Route path="/cameras/imou" element={<CameraPage />} />
          <Route path="/cameras/tiandy" element={<CameraPage />} />
          <Route path="/cameras365selection" element={<CameraPage />} /> */}
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;