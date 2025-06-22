import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFeaturedProducts(mockFeaturedProducts);
        setFeaturedLaptops(mockFeaturedLaptops);
        setFeaturedCameras(mockFeaturedCameras);
        setHasError(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRefresh = () => {
    const fetchAgain = async () => {
        setIsLoading(true);
        setHasError(false);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFeaturedProducts(mockFeaturedProducts);
        setFeaturedLaptops(mockFeaturedLaptops);
        setFeaturedCameras(mockFeaturedCameras);
        setIsLoading(false);
    };
    fetchAgain();
  };

  const mockFeaturedProducts = [
    {
      id: "iphone-15-pro-max",
      name: "Apple iPhone 15 Pro Max",
      price: 1199.99,
      image: "/assets/images/Phones/Apple iPhone 15 Pro Max.webp",
      rating: 4.9,
      reviews: 450,
      discount: 10,
      isNew: true,
      specs: { storage: "256GB", camera: "48MP", display: "6.7-inch" },
    },
    {
      id: "samsung-galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      price: 1299.99,
      image: "/assets/images/Phones/Samsung Galaxy S24 Ultra.webp",
      rating: 4.8,
      reviews: 380,
      discount: 15,
      isNew: true,
      specs: { storage: "512GB", camera: "200MP", display: "6.8-inch" },
    },
    {
      id: "google-pixel-8-pro",
      name: "Google Pixel 8 Pro",
      price: 999.99,
      image: "/assets/images/Phones/Google Pixel 8 Pro.webp",
      rating: 4.7,
      reviews: 310,
      discount: 5,
      isNew: true,
      specs: { storage: "128GB", camera: "50MP", display: "6.7-inch" },
    },
    {
      id: "xiaomi-14-ultra",
      name: "Xiaomi 14 Ultra",
      price: 1099.00,
      image: "/assets/images/Phones/Xiaomi 14 Ultra.webp",
      rating: 4.8,
      reviews: 250,
      discount: 8,
      isNew: false,
      specs: { storage: "512GB", camera: "1-inch Sensor", display: "6.73-inch" },
    },
    {
      id: "samsung-galaxy-z-fold-5",
      name: "Samsung Galaxy Z Fold 5",
      price: 1799.99,
      image: "/assets/images/Phones/Samsung Galaxy Z Fold 5.webp",
      rating: 4.6,
      reviews: 220,
      discount: 12,
      isNew: false,
      specs: { storage: "512GB", camera: "50MP", display: "7.6-inch Foldable" },
    },
  ];

  const mockFeaturedLaptops = [
    {
      id: "macbook-air-m2-2024",
      name: "Apple Macbook Air M2 2024",
      price: 1299.99,
      image: "/assets/images/Laptops/Apple Macbook Air M2 2024.webp",
      rating: 4.9,
      reviews: 120,
      discount: 8,
      isNew: true,
      specs: { storage: "512GB SSD", display: "13.6-inch", cpu: "Apple M2" },
    },
    {
      id: "asus-vivobook-s-16-oled-s5606ma-mx051w",
      name: "Asus VivoBook S 16 OLED",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop Asus VivoBook S 16 OLED S5606MA-MX051W.webp",
      rating: 4.8,
      reviews: 180,
      discount: 9,
      isNew: true,
      specs: { storage: "1TB SSD", display: "16-inch OLED", cpu: "Intel Core i7" },
    },
    {
      id: "acer-nitro-v-avn15-51-57b2",
      name: "Acer Nitro V Gaming",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop Gaming Acer Nitro V AVN15-51-57B2.webp",
      rating: 4.8,
      reviews: 180,
      discount: 5,
      isNew: false,
      specs: { storage: "512GB SSD", display: "15.6-inch", cpu: "Intel Core i5" },
    },
    {
      id: "hp-gaming-victus-15-fa1139tx-8y6w3pa",
      name: "HP Gaming Victus 15",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop HP Gaming Victus 15-FA1139TX 8Y6W3PA.webp",
      rating: 4.8,
      reviews: 180,
      discount: 5,
      isNew: false,
      specs: { storage: "512GB SSD", display: "15.6-inch", cpu: "Intel Core i5" },
    },
  ];

  const mockFeaturedCameras = [
    {
      id: "camera-ip-hong-ngoai-khong-day-5mp-imou-ipc-a52p",
      name: "Imou IPC-A52P 5MP",
      price: 135,
      image: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-5mp-imou-ipc-a52p.webp",
      rating: 4.9,
      reviews: 150,
      discount: 15,
      isNew: true,
      specs: { resolution: "5MP", type: "Wireless", video: "2K" },
    },
    {
      id: "camera-ip-hong-ngoai-khong-day-5mp-ezviz-h6c-pro",
      name: "EZVIZ H6C Pro 5MP",
      price: 129,
      image: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-5mp-ezviz-h6c-pro.webp",
      rating: 4.7,
      reviews: 98,
      discount: 8,
      isNew: false,
      specs: { resolution: "5MP", type: "Wireless", video: "2K" },
    },
    {
      id: "camera-ip-wifi-ai-reoqoo-xt-x31b-2-5k-ngoai-troi",
      name: "Reoqoo XT-X31B 2.5K Outdoor",
      price: 169,
      image: "/assets/images/Cameras/camera-ip-wifi-ai-reoqoo-xt-x31b-2-5k-ngoai-troi.webp",
      rating: 4.9,
      reviews: 130,
      discount: 13,
      isNew: true,
      specs: { resolution: "2.5K", type: "Outdoor AI", video: "2.5K" },
    },
    {
      id: "camera-ip-ngoai-troi-wifi-365-selection-oc1-2k_8_",
      name: "365 Selection OC1 2K Outdoor",
      price: 149,
      image: "/assets/images/Cameras/camera-ip-ngoai-troi-wifi-365-selection-oc1-2k_8_.webp",
      rating: 4.7,
      reviews: 90,
      discount: 10,
      isNew: false,
      specs: { resolution: "2K", type: "Outdoor", video: "2K" },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="default" />

      <main className="flex-grow" id="main-content">
        <HeroSection />

        <FeaturedProducts
          products={featuredProducts}
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
          isLoading={isLoading}
          hasError={hasError}
          onRefresh={handleRefresh}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          title="Laptop nổi bật"
          subtitle="Các mẫu laptop mới và mạnh mẽ"
          viewAllLink="/laptops"
        />

        <FeaturedProducts
          products={featuredCameras}
          isLoading={isLoading}
          hasError={hasError}
          onRefresh={handleRefresh}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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