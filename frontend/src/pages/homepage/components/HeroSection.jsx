// src/pages/homepage/components/HeroSection.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const IconChevronLeft = ({size = 24, color = "currentColor"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

const IconChevronRight = ({size = 24, color = "currentColor"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
    </svg>
);

const sliderImages = [
    {
        src: "/assets/images/HomePageImg/SlideImg/iphone-15 pro max.webp",
        alt: "Latest smartphones display",
        label: "New Arrivals",
    },
    {
        src: "/assets/images/HomePageImg/SlideImg/MacBook-Air-12.jpg",
        alt: "Laptop collection",
        label: "Hot Laptops",
    },
    {
        src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&h=800&q=80",
        alt: "Camera collection",
        label: "Best Cameras",
    },
    {
        src: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1000&h=800&q=80",
        alt: "Accessories",
        label: "Cool Accessories",
    },
    {
        src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&h=800&q=80",
        alt: "Tablet collection",
        label: "Tablets",
    },
    {
        src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1000&h=800&q=80",
        alt: "Smartwatch collection",
        label: "Smartwatches",
    }
];

const HeroSection = () => {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    // Tự động chuyển ảnh
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % sliderImages.length);
        }, 3000);
        return () => clearTimeout(timeoutRef.current);
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
                            Chào mừng đến với Mobile City
                        </h1>
                        <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                            Khám phá những sản phẩm công nghệ mới nhất và ưu đãi hấp dẫn.
                            <br/>
                            Tìm kiếm các sản phẩm yêu thích của bạn và tận hưởng trải nghiệm mua sắm trực tuyến tuyệt vời nhất.
                        </p>
                    </div>
                    <div className="w-full lg:w-11/12 mt-12 relative group">
                        <div className="relative h-56 sm:h-72 md:h-[24rem] w-full rounded-lg shadow-xl overflow-hidden"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Slider */}
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
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {img.label}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                            {/* Dots indicator */}
                            <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
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
                            {/* Nút prev */}
                            <button
                                aria-label="Previous"
                                onClick={handlePrev}
                                className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow
                                    transition-all duration-300
                                    ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                                style={{ pointerEvents: isHovered ? "auto" : "none" }}
                            >
                                <IconChevronLeft size={28} />
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
                                <IconChevronRight size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;