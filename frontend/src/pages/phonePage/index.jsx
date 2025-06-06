// DÁN TOÀN BỘ ĐOẠN CODE NÀY VÀO FILE: src/pages/phonePage/index.js

import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import FeaturedProducts from "./components/FeaturedProducts";
import { mockPhoneList } from "../product-detail-page"; 

const PhonePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Mô phỏng việc tải dữ liệu
    setTimeout(() => {
      try {
        setFeaturedProducts(mockPhoneList.slice(0, 5)); 
        setHasError(false);
      } catch (err) {
        console.error("Failed to load products:", err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setFeaturedProducts(mockPhoneList.slice(0, 88));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="default" />
      <main className="flex-grow" id="main-content">
        <FeaturedProducts
          products={featuredProducts}
          isLoading={isLoading}
          hasError={hasError}
          onRefresh={handleRefresh}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
        />
      </main>
      <Footer variant="compact" />
    </div>
  );
};

export default PhonePage;