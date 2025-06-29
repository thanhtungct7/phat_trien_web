import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredLaptops, setFeaturedLaptops] = useState([]);
  const [featuredCameras, setFeaturedCameras] = useState([]);

  // Hàm fetch dữ liệu từ backend
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const [phonesRes, laptopsRes, camerasRes] = await Promise.all([
        axios.get("/api/smartphones/"),
        axios.get("/api/laptops/"),
        axios.get("/api/cameras/"),
      ]);

      setFeaturedProducts((phonesRes.data.result || []).slice(0, 5));
      setFeaturedLaptops((laptopsRes.data.result || []).slice(0, 5));
      setFeaturedCameras((camerasRes.data.result || []).slice(0, 5));
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    fetchProducts();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="default" />

      <main className="flex-grow" id="main-content">
        <HeroSection />

        <FeaturedProducts
          products={featuredProducts}
          type="smartphones"
          isLoading={isLoading}
          hasError={hasError}
          onRefresh={handleRefresh}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          title="Điện thoại nổi bật"
          subtitle="Khám phá các mẫu điện thoại bán chạy nhất"
          viewAllLink="/phones"
        />

        <FeaturedProducts
          products={featuredLaptops}
          type="laptops"
          isLoading={isLoading}
          hasError={hasError}
          onRefresh={handleRefresh}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          title="Laptop nổi bật"
          subtitle="Các mẫu laptop mới và mạnh mẽ"
          viewAllLink="/laptops"
        />

        <FeaturedProducts
          products={featuredCameras}
          type="cameras"
          isLoading={isLoading}
          hasError={hasError}
          onRefresh={handleRefresh}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          title="Camera nổi bật"
          subtitle="Camera chất lượng cao, giá tốt"
          viewAllLink="/cameras"
        />
      </main>

      <Footer variant="compact" />
    </div>
  );
};

export default Homepage;