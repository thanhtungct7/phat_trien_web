import React, { useState, useEffect } from "react";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";


import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFeaturedProducts(mockFeaturedProducts);
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
    setIsLoading(true);
    setHasError(false);
    
    // Simulate refetch
    setTimeout(() => {
      setFeaturedProducts(mockFeaturedProducts);
      setIsLoading(false);
    }, 1000);
  };

  // Mock data for featured products
  const mockFeaturedProducts = [
    {
      id: 1,
      name: "iPhone 13 Pro",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.8,
      reviews: 245,
      discount: 10,
      isNew: true,
      specs: {
        storage: "128GB",
        camera: "12MP",
        display: "6.1-inch"
      }
    },
    {
      id: 2,
      name: "Samsung Galaxy S22",
      price: 799.99,
      image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      rating: 4.6,
      reviews: 189,
      discount: 15,
      isNew: true,
      specs: {
        storage: "256GB",
        camera: "50MP",
        display: "6.2-inch"
      }
    },
    {
      id: 3,
      name: "Google Pixel 6",
      price: 699.99,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.5,
      reviews: 156,
      discount: 0,
      isNew: false,
      specs: {
        storage: "128GB",
        camera: "50MP",
        display: "6.4-inch"
      }
    },
    {
      id: 4,
      name: "OnePlus 10 Pro",
      price: 899.99,
      image: "https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      rating: 4.7,
      reviews: 132,
      discount: 5,
      isNew: false,
      specs: {
        storage: "256GB",
        camera: "48MP",
        display: "6.7-inch"
      }
    },
    {
      id: 5,
      name: "Xiaomi Mi 12",
      price: 749.99,
      image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      rating: 4.4,
      reviews: 98,
      discount: 12,
      isNew: true,
      specs: {
        storage: "128GB",
        camera: "108MP",
        display: "6.3-inch"
      }
    },
    {
      id: 6,
      name: "Motorola Edge 30",
      price: 599.99,
      image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      rating: 4.3,
      reviews: 76,
      discount: 8,
      isNew: false,
      specs: {
        storage: "128GB",
        camera: "50MP",
        display: "6.5-inch"
      }
    }
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
        />
      </main>
      
      <Footer variant="compact" />
    </div>
  );
};

export default Homepage;