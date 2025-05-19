import React, { useState, useEffect } from "react";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import TabSystem from "./components/TabSystem";
import Breadcrumbs from "./components/Breadcrumbs";
import SkeletonLoader from "./components/SkeletonLoader";
import AddToCartModal from "./components/AddToCartModal";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API call with timeout
    const fetchProductData = async () => {
      setLoading(true);
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProduct(mockProductData);
        setError(null);
      } catch (err) {
        setError("Failed to load product data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const handleAddToCart = () => {
    // In a real app, this would make an API call to add the item to cart
    setShowModal(true);
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Simulate API call again
    setTimeout(() => {
      setProduct(mockProductData);
      setLoading(false);
    }, 1500);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const breadcrumbItems = [
    { name: "Home", path: "/homepage" },
    { name: "Phones", path: "/product-listing-page" },
    { name: product?.name || "Product", path: "" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8" id="main-content">
        <Breadcrumbs items={breadcrumbItems} />
        
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                <Icon name="AlertTriangle" size={32} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load product</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button 
                variant="primary" 
                onClick={handleRetry}
                icon="RefreshCw"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              <ImageGallery images={product.images} />
              
              <ProductInfo 
                product={product} 
                onAddToCart={handleAddToCart} 
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
              />
            </div>
            
            <TabSystem 
              specifications={product.specifications} 
              reviews={product.reviews} 
            />
          </div>
        )}
      </main>
      
      <Footer variant="compact" />
      
      {showModal && (
        <AddToCartModal 
          product={product}
          quantity={quantity}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

// Mock data for the product
const mockProductData = {
  id: "iphone-13-pro-max",
  name: "iPhone 13 Pro Max",
  brand: "Apple",
  price: 1099.99,
  discountPrice: 999.99,
  rating: 4.8,
  reviewCount: 256,
  availability: "In Stock",
  sku: "APL-IPH13PMAX-128-GRN",
  description: `Experience the ultimate iPhone with the iPhone 13 Pro Max. Featuring a stunning 6.7-inch Super Retina XDR display with ProMotion technology for a faster, more responsive feel. Powered by the A15 Bionic chip, the fastest chip ever in a smartphone. Includes a pro camera system with new 12MP Telephoto, Wide, and Ultra Wide cameras that capture stunning photos and 4K Dolby Vision HDR video. Get up to 28 hours of video playback, the best battery life ever in an iPhone. And with Ceramic Shield, it's tougher than any smartphone glass.`,
  shortDescription: "Apple\'s flagship smartphone with a 6.7-inch display, A15 Bionic chip, and pro camera system.",
  features: [
    "6.7-inch Super Retina XDR display with ProMotion",
    "A15 Bionic chip with 5-core GPU",
    "Pro camera system: Telephoto, Wide, and Ultra Wide",
    "Up to 28 hours of video playback",
    "5G capable for faster downloads and streaming",
    "Ceramic Shield front for 4x better drop protection",
    "IP68 water resistance (up to 6m for 30 minutes)",
    "iOS 15 with new features for Maps, Photos, and more"
  ],
  colors: [
    { name: "Sierra Blue", code: "#9BB5CE" },
    { name: "Silver", code: "#F5F5F0" },
    { name: "Gold", code: "#F9E5C9" },
    { name: "Graphite", code: "#5F5F5F" }
  ],
  storage: [
    { size: "128GB", price: 999.99 },
    { size: "256GB", price: 1099.99 },
    { size: "512GB", price: 1299.99 },
    { size: "1TB", price: 1499.99 }
  ],
  images: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "iPhone 13 Pro Max - Front View"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1634618774956-36f5b1618be7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "iPhone 13 Pro Max - Back View"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1634618774956-36f5b1618be7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "iPhone 13 Pro Max - Side View"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1592813959730-5b8c5a2b2299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      alt: "iPhone 13 Pro Max - Camera Detail"
    }
  ],
  specifications: [
    {
      category: "Display",
      items: [
        { name: "Size", value: "6.7 inches" },
        { name: "Type", value: "Super Retina XDR OLED" },
        { name: "Resolution", value: "2778 x 1284 pixels at 458 ppi" },
        { name: "Technology", value: "ProMotion technology with adaptive refresh rate up to 120Hz" },
        { name: "Brightness", value: "1000 nits max brightness (typical); 1200 nits max brightness (HDR)" }
      ]
    },
    {
      category: "Performance",
      items: [
        { name: "Chip", value: "A15 Bionic" },
        { name: "CPU", value: "6-core CPU with 2 performance and 4 efficiency cores" },
        { name: "GPU", value: "5-core GPU" },
        { name: "Neural Engine", value: "16-core Neural Engine" }
      ]
    },
    {
      category: "Camera",
      items: [
        { name: "Rear Camera", value: "Pro 12MP camera system: Telephoto, Wide, and Ultra Wide cameras" },
        { name: "Telephoto", value: "ƒ/2.8 aperture, 3x optical zoom" },
        { name: "Wide", value: "ƒ/1.5 aperture" },
        { name: "Ultra Wide", value: "ƒ/1.8 aperture and 120° field of view" },
        { name: "Front Camera", value: "12MP TrueDepth camera with ƒ/2.2 aperture" }
      ]
    },
    {
      category: "Battery",
      items: [
        { name: "Video Playback", value: "Up to 28 hours" },
        { name: "Audio Playback", value: "Up to 95 hours" },
        { name: "Fast Charging", value: "Up to 50% charge in around 30 minutes with 20W adapter or higher" }
      ]
    },
    {
      category: "Storage",
      items: [
        { name: "Capacity", value: "128GB, 256GB, 512GB, 1TB" }
      ]
    },
    {
      category: "Connectivity",
      items: [
        { name: "5G", value: "Sub-6GHz and mmWave" },
        { name: "Wi-Fi", value: "Wi-Fi 6 (802.11ax) with 2x2 MIMO" },
        { name: "Bluetooth", value: "Bluetooth 5.0" },
        { name: "NFC", value: "Yes, with reader mode" },
        { name: "GPS", value: "Built-in GPS, GLONASS, Galileo, QZSS, and BeiDou" }
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      user: "John D.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: "2023-03-15",
      title: "Best iPhone I\'ve ever owned",
      comment: "The camera quality is incredible, and the battery life is a game-changer. I can go almost two full days without charging with moderate use. The ProMotion display is also very noticeable coming from an older iPhone."
    },
    {
      id: 2,
      user: "Sarah M.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      date: "2023-02-28",
      title: "Great phone but expensive",
      comment: "This is definitely the best smartphone I\'ve used, but the price is hard to justify. The camera system is amazing, especially the macro photography capabilities. Battery life is excellent. My only complaint is the weight - it\'s noticeably heavier than previous models."
    },
    {
      id: 3,
      user: "Robert J.",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5,
      date: "2023-02-10",
      title: "Worth every penny",
      comment: "The 120Hz display makes everything so smooth. Gaming is a pleasure on this device, and the A15 chip handles everything I throw at it without breaking a sweat. The camera system is professional quality - I\'ve stopped carrying my DSLR for most occasions."
    },
    {
      id: 4,
      user: "Emily L.",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 3,
      date: "2023-01-22",
      title: "Good but not a huge upgrade",
      comment: "Coming from the iPhone 12 Pro, this isn\'t a massive upgrade. Yes, the ProMotion display is nice and the battery is better, but I\'m not sure it was worth upgrading for. If you have an older iPhone though, this would be a significant improvement."
    }
  ]
};

export default ProductDetailPage;