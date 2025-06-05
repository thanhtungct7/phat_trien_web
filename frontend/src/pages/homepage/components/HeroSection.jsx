import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const HeroSection = () => {
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
              <Link to="/phone-listing-page">
                <Button 
                  variant="primary" 
                  size="large" 
                  icon="Smartphone"
                  iconPosition="left"
                >
                  Browse Phones
                </Button>
              </Link>
              <Link to="/phone-listing-page?category=accessories">
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
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800&q=80"
                alt="Latest smartphones display"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New Arrivals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;