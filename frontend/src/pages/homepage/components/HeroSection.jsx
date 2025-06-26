// src/pages/homepage/components/HeroSection.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col items-center">
          <div className="w-full text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Chào mừng đến với Mobile City
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
              {/* Nút điều hướng */}
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
      </div>
    </section>
  );
};

export default HeroSection;