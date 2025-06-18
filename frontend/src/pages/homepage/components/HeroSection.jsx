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
    <section className="bg-gradient-to-r from-primary-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Discover the Latest Mobile Technology
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Explore our wide selection of premium smartphones at competitive prices. 
              Find the perfect device that matches your lifestyle and needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/phonePage">
                <Button 
                  variant="primary" 
                  size="large" 
                  icon="Smartphone"
                  iconPosition="left"
                >
                  Browse Phones
                </Button>
              </Link>
              <Link to="/phonePage?category=accessories">
                <Button 
                  variant="outline" 
                  size="large"
                >
                  Shop Accessories
                </Button>
              </Link>
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;