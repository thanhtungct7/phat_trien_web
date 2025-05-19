import React, { useState, useEffect, useCallback } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  }, [handleNext, handlePrevious]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setMousePosition({ x, y });
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div 
        className="relative overflow-hidden rounded-lg bg-gray-100 h-96 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onClick={handleZoomToggle}
      >
        <div 
          className={`transition-transform duration-200 ease-out w-full h-full flex items-center justify-center ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          style={isZoomed ? {
            transform: 'scale(2)',
            transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`
          } : {}}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="object-contain w-full h-full"
          />
        </div>
        
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          aria-label="Previous image"
        >
          <Icon name="ChevronLeft" size={24} className="text-gray-800" />
        </button>
        
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next image"
        >
          <Icon name="ChevronRight" size={24} className="text-gray-800" />
        </button>
        
        <button
          className="absolute right-3 bottom-3 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
          onClick={(e) => {
            e.stopPropagation();
            handleZoomToggle();
          }}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} className="text-gray-800" />
        </button>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-600 ${
              currentIndex === index ? 'ring-2 ring-primary-600' : 'ring-1 ring-gray-200'
            }`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View ${image.alt}`}
            aria-current={currentIndex === index ? 'true' : 'false'}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;