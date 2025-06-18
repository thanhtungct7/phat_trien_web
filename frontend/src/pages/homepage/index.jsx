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
    setFeaturedProducts([]);
    setFeaturedLaptops([]);
    setFeaturedCameras([]);
    setIsLoading(true);
    setHasError(false);

    // Simulate refetch
    setTimeout(() => {
      setFeaturedProducts(mockFeaturedProducts);
      setFeaturedLaptops(mockFeaturedLaptops);
      setFeaturedCameras(mockFeaturedCameras);
      setIsLoading(false);
    }, 1000);
  };

  // Mock data for featured products
  const mockFeaturedProducts = [
    {
      id: 1,
      name: "iPhone 13 Pro",
      price: 999.99,
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.8,
      reviews: 245,
      discount: 10,
      isNew: true,
      specs: {
        storage: "128GB",
        camera: "12MP",
        display: "6.1-inch",
      },
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      price: 799.99,
      image:
        "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      rating: 4.6,
      reviews: 189,
      discount: 15,
      isNew: true,
      specs: {
        storage: "256GB",
        camera: "50MP",
        display: "6.2-inch",
      },
    },
    {
      id: 3,
      name: "Google Pixel 6",
      price: 699.99,
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.5,
      reviews: 156,
      discount: 0,
      isNew: false,
      specs: {
        storage: "128GB",
        camera: "50MP",
        display: "6.4-inch",
      },
    },
    {
      id: 4,
      name: "OnePlus 10 Pro",
      price: 899.99,
      image:
        "https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      rating: 4.7,
      reviews: 132,
      discount: 5,
      isNew: false,
      specs: {
        storage: "256GB",
        camera: "48MP",
        display: "6.7-inch",
      },
    },
    {
      id: 5,
      name: "Xiaomi Mi 12",
      price: 749.99,
      image:
        "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.4,
      reviews: 98,
      discount: 12,
      isNew: true,
      specs: {
        storage: "128GB",
        camera: "108MP",
        display: "6.3-inch",
      },
    },
    {
      id: 6,
      name: "Motorola Edge 30",
      price: 599.99,
      image:
        "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      rating: 4.3,
      reviews: 76,
      discount: 8,
      isNew: false,
      specs: {
        storage: "128GB",
        camera: "50MP",
        display: "6.5-inch",
      },
    },
  ];

  const mockFeaturedLaptops = [
    {
      id: 101,
      name: "MacBook Pro 14",
      price: 1999.99,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.9,
      reviews: 120,
      discount: 5,
      isNew: true,
      specs: {
        storage: "512GB SSD",
        display: "14-inch",
        cpu: "Apple M1 Pro",
      },
    },
    {
      id: 102,
      name: "Dell XPS 13",
      price: 1399.99,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.7,
      reviews: 98,
      discount: 10,
      isNew: false,
      specs: {
        storage: "256GB SSD",
        display: "13.3-inch",
        cpu: "Intel i7",
      },
    },
    {
      id: 103,
      name: "HP Spectre x360",
      price: 1599.99,
      image:
        "https://images.unsplash.com/photo-1521737604893-474e2e9f1f3b?auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.8,
      reviews: 110,
      discount: 7,
      isNew: true,
      specs: {
        storage: "1TB SSD",
        display: "13.5-inch",
        cpu: "Intel i7",
      },
    },
    {
      id: 104,
      name: "Lenovo ThinkPad X1 Carbon",
      price: 1399.99,
      image:
        "https://images.unsplash.com/photo-1584697964210-7b438f6e6f3b?auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.6,
      reviews: 95,
      discount: 10,
      isNew: false,
      specs: {
        storage: "512GB SSD",
        display: "14-inch",
        cpu: "Intel i7",
      },
    },
  ];

  const mockFeaturedCameras = [
    {
      id: 201,
      name: "Canon EOS R6",
      price: 2499.99,
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.8,
      reviews: 75,
      discount: 8,
      isNew: true,
      specs: {
        resolution: "20MP",
        type: "Mirrorless",
        video: "4K",
      },
    },
    {
      id: 202,
      name: "Sony Alpha a6400",
      price: 999.99,
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.6,
      reviews: 60,
      discount: 0,
      isNew: false,
      specs: {
        resolution: "24.2MP",
        type: "Mirrorless",
        video: "4K",
      },
    },
    {
      id: 203,
      name: "Nikon Z6",
      price: 1799.99,
      image:
        "https://images.unsplash.com/photo-1581093588365-4f3e6f3e6f3e?auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.7,
      reviews: 80,
      discount: 5,
      isNew: true,
      specs: {
        resolution: "24.5MP",
        type: "Mirrorless",
        video: "4K",
      },
    },
    {
      id: 204,
      name: "Fujifilm X-T4",
      price: 1699.99,
      image:
        "https://images.unsplash.com/photo-1581093588365-4f3e6f3e6f3e?auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.6,
      reviews: 70,
      discount: 0,
      isNew: false,
      specs: {
        resolution: "26.1MP",
        type: "Mirrorless",
        video: "4K",
      },
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
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          title="Laptop nổi bật"
          subtitle="Các mẫu laptop mới và mạnh mẽ"
          viewAllLink="/laptops"
        />

        <FeaturedProducts
          products={featuredCameras}
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