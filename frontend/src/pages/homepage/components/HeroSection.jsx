
// src/pages/homepage/components/HeroSection.jsx

import React, { useState, useEffect } from 'react';

// --- THAY THẾ ICON TỪ THƯ VIỆN BẰNG SVG TRỰC TIẾP ---
// Tạo 2 component icon nhỏ ngay trong file để sử dụng.
// Cách này không cần cài đặt bất cứ thư viện nào.
const IconChevronLeft = ({ size = 24, color = "currentColor" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const IconChevronRight = ({ size = 24, color = "currentColor" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);


// Dữ liệu cho các slide ảnh
const slideImages = [
  {
    src: "https://ringkevietnam.com/wp-content/uploads/2025/02/2400x800_main-banner-2.jpg",
    alt: "iPhone 15 Pro Max Promotion",
    tag: "Ưu đãi đặc biệt"
  },
  {
    src: "https://ringkevietnam.com/wp-content/uploads/2025/03/2400x800_main_banner_copy_36f40106-c63b-4d4a-a4db-01daae177070.webp-1024x341.jpeg",
    alt: "Google Pixel 9a",
    tag: "Siêu phẩm AI"
  },
  {
    src: "https://ringkevietnam.com/wp-content/uploads/2024/09/2400_800_banner_iphone-16-series-ringkevietnam.webp",
    alt: "Iphone 16 Series",
    tag: "Chuyên gia chân dung"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const sliderImages = [
  {
    src: "/assets/images/HomePageImg/SlideImg/iphone-15 pro max.webp",
    alt: "Latest smartphones display",
    label: "New Arrivals",
    link: "/product-detail-page?id=iphone-15-pro-max"
  },
  {
    src: "/assets/images/HomePageImg/SlideImg/MacBook-Air-12.jpg",
    alt: "Laptop collection",
    label: "Hot Laptops",
    link: "/product-detail-page?id=macbook-air-m2-2024"
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&h=800&q=80",
    alt: "Camera collection",
    label: "Best Cameras",
    link: "/cameras"
  },
  {
    src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1000&h=800&q=80",
    alt: "Accessories",
    label: "Cool Accessories",
    link: "/accessories"
  },
  {
    src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&h=800&q=80",
    alt: "Tablet collection",
    label: "Tablets",
    link: "/tablets"
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1000&h=800&q=80",
    alt: "Smartwatch collection",
    label: "Smartwatches",
    link: "/smartwatches"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setTimeout(handleNext, 4000);
    return () => clearTimeout(timer);
  }, [currentSlide]);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  // Tự động chuyển ảnh
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 3000);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, [current]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  };

  const handleDotClick = (idx) => {
    if (idx === current) return;
    setCurrent(idx);
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col items-center">
          
          <div className="w-full text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Chào mừng đến với ShopHub
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Khám phá những sản phẩm công nghệ mới nhất và ưu đãi hấp dẫn. 
              <br/>
              Tìm kiếm các sản phẩm yêu thích của bạn và tận hưởng trải nghiệm mua sắm trực tuyến tuyệt vời nhất.
            </p>
          </div>
          
          <div className="w-full lg:w-11/12 mt-12 relative group">
            <div className="relative h-56 sm:h-72 md:h-[24rem] w-full rounded-lg shadow-xl overflow-hidden">
              {slideImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {image.tag}
                    </span>
                  </div>
                </div>
              ))}
          <div className="md:w-1/2 relative">
            <div
              className="relative rounded-lg overflow-hidden shadow-xl group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Ảnh slider với hiệu ứng slide */}
              <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${current * 100}%)`
                  }}
                >
                  {sliderImages.map((img, idx) => (
                    <Link
                      key={idx}
                      to={img.link}
                      tabIndex={idx === current ? 0 : -1}
                      className="w-full h-full block"
                      style={{ minWidth: "100%" }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover flex-shrink-0"
                      />
                    </Link>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {sliderImages[current].label}
                  </span>
                </div>
                {/* Dots indicator */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {sliderImages.map((_, idx) => (
                    <button
                      key={idx}
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => handleDotClick(idx)}
                      className={`w-2 h-2 rounded-full border border-primary-600 transition
                        ${idx === current ? "bg-primary-600" : "bg-white/70"}
                      `}
                    />
                  ))}
                </div>
              </div>
              {/* Nút prev */}
              <button
                aria-label="Previous"
                onClick={handlePrev}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow
                  transition-all duration-300
                  ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                style={{ pointerEvents: isHovered ? "auto" : "none" }}
              >
                <Icon name="ChevronLeft" size={28} className="text-primary-600" />
              </button>
              {/* Nút next */}
              <button
                aria-label="Next"
                onClick={handleNext}
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow
                  transition-all duration-300
                  ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                style={{ pointerEvents: isHovered ? "auto" : "none" }}
              >
                <Icon name="ChevronRight" size={28} className="text-primary-600" />
              </button>
            </div>

            {/* Sử dụng các component IconChevronLeft và IconChevronRight vừa tạo */}
            <button 
              onClick={handlePrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 hover:bg-white/90 text-gray-800 p-2 rounded-full shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Previous Slide"
            >
              <IconChevronLeft />
            </button>
            <button 
              onClick={handleNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 hover:bg-white/90 text-gray-800 p-2 rounded-full shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Next Slide"
            >
              <IconChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;