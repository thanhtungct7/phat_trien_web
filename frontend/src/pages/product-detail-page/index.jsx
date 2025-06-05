import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let data = null;
      if (id === "iphone-13-pro-max") {
        data = mockProductData;
      } else if (mockLaptopList.find(lap => lap.id === id)) {
        data = mockLaptopList.find(lap => lap.id === id);
      } else if (mockCameraList.find(cam => cam.id === id)) {
        data = mockCameraList.find(cam => cam.id === id);
      }
      if (data) {
        setProduct(data);
        setError(null);
      } else {
        setError("Không tìm thấy sản phẩm.");
      }
      setLoading(false);
    }, 1000);
  }, [id]);

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

  const isLaptop = product?.sku?.toLowerCase().includes("laptop") || product?.name?.toLowerCase().includes("laptop") || product?.name?.toLowerCase().includes("macbook");

  // Thêm dòng này để xác định sản phẩm là camera
  const isCamera = product?.sku?.toLowerCase().includes("camera") || product?.name?.toLowerCase().includes("camera");

  // Sửa lại breadcrumbItems như sau:
  const breadcrumbItems = [
    { name: "Home", path: "/homepage" },
    isLaptop
      ? { name: "Laptops", path: "/laptops" }
      : isCamera
        ? { name: "Cameras", path: "/cameras" }
        : { name: "Phones", path: "/product-listing-page" },
    { name: product?.name || "Product", path: "" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8" id="main-content">
        <Breadcrumbs items={breadcrumbItems} />
        
        {loading ? (
          <SkeletonLoader />
        ) : error && !loading ? (
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

// Mock data for the laptop
const mockLaptopList = [
  {
    id: "macbook-air-m2-2024",
    name: "Apple Macbook Air M2 2024",
    brand: "Apple",
    price: 1299.99,
    discountPrice: 1199.99,
    rating: 4.9,
    reviewCount: 120,
    availability: "In Stock",
    sku: "APL-MBAIR2024-512GB",
    description: "The latest Macbook Air with M2 chip, ultra-thin design, and all-day battery life.",
    shortDescription: "Apple's flagship ultrabook with M2 chip and Retina display.",
    features: [
      "13.6-inch Liquid Retina display",
      "Apple M2 chip",
      "Up to 18 hours battery life",
      "Fanless design",
      "MagSafe charging",
      "Thunderbolt / USB 4 ports"
    ],
    colors: [
      { name: "Midnight", code: "#24292F" },
      { name: "Starlight", code: "#F3E8D7" },
      { name: "Space Gray", code: "#6E6E73" }
    ],
    storage: [
      { size: "256GB", price: 1199.99 },
      { size: "512GB", price: 1299.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Apple Macbook Air M2 2024.webp",
        alt: "Macbook Air M2 - Front"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "13.6 inches" },
          { name: "Type", value: "Liquid Retina" },
          { name: "Resolution", value: "2560 x 1664" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "Chip", value: "Apple M2" },
          { name: "CPU", value: "8-core" },
          { name: "GPU", value: "8-core" }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Alice N.",
        avatar: "https://randomuser.me/api/portraits/women/50.jpg",
        rating: 5,
        date: "2024-05-10",
        title: "Best Macbook ever",
        comment: "Super light, super fast, and the battery lasts all day. Perfect for work and travel!"
      }
    ]
  },
  {
    id: "asus-vivobook-15-x1504va-bq2076w",
    name: "Laptop Asus VivoBook 15 X1504VA-BQ2076W",
    brand: "Asus",
    price: 799.99,
    discountPrice: 749.99,
    rating: 4.7,
    reviewCount: 210,
    availability: "In Stock",
    sku: "ASUS-VB15-X1504VA-BQ2076W",
    description: "Laptop Asus VivoBook 15 với thiết kế mỏng nhẹ, hiệu năng ổn định cho học tập và làm việc.",
    shortDescription: "Mỏng nhẹ, hiệu năng ổn định, màn hình 15.6 inch FHD.",
    features: [
      "15.6-inch FHD display",
      "Intel Core i5",
      "512GB SSD",
      "8GB RAM",
      "Windows 11"
    ],
    colors: [
      { name: "Silver", code: "#C0C0C0" }
    ],
    storage: [
      { size: "512GB", price: 799.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Laptop Asus VivoBook 15 X1504VA-BQ2076W.webp",
        alt: "Asus VivoBook 15"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "15.6 inches" },
          { name: "Type", value: "FHD" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "CPU", value: "Intel Core i5" },
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "asus-vivobook-s-16-oled-s5606ma-mx051w",
    name: "Laptop Asus VivoBook S 16 OLED S5606MA-MX051W",
    brand: "Asus",
    price: 1099.99,
    discountPrice: 999.99,
    rating: 4.8,
    reviewCount: 180,
    availability: "In Stock",
    sku: "ASUS-VB-S16-OLED-S5606MA-MX051W",
    description: "Laptop Asus VivoBook S 16 OLED với màn hình OLED sắc nét, hiệu năng mạnh mẽ.",
    shortDescription: "Màn hình OLED 16 inch, Intel Core i7, 1TB SSD.",
    features: [
      "16-inch OLED display",
      "Intel Core i7",
      "1TB SSD",
      "16GB RAM"
    ],
    colors: [
      { name: "Black", code: "#222" }
    ],
    storage: [
      { size: "1TB", price: 1099.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Laptop Asus VivoBook S 16 OLED S5606MA-MX051W.webp",
        alt: "Asus VivoBook S 16 OLED"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "16 inches" },
          { name: "Type", value: "OLED" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "CPU", value: "Intel Core i7" },
          { name: "RAM", value: "16GB" },
          { name: "Storage", value: "1TB SSD" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "acer-nitro-v-avn15-51-57b2",
    name: "Laptop Gaming Acer Nitro V AVN15-51-57B2",
    brand: "Acer",
    price: 1099.99,
    discountPrice: 1049.99,
    rating: 4.8,
    reviewCount: 180,
    availability: "In Stock",
    sku: "ACER-NITRO-V-AVN15-51-57B2",
    description: "Laptop gaming mạnh mẽ với card đồ họa rời, màn hình 15.6 inch FULL HD.",
    shortDescription: "Gaming, Intel Core i5-13420H, 512GB SSD, 8GB RAM.",
    features: [
      "15.6-inch FULL HD display",
      "Intel Core i5-13420H",
      "512GB SSD",
      "8GB RAM",
      "NVIDIA GeForce RTX"
    ],
    colors: [
      { name: "Black", code: "#222" }
    ],
    storage: [
      { size: "512GB", price: 1099.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Laptop Gaming Acer Nitro V AVN15-51-57B2.webp",
        alt: "Acer Nitro V"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "15.6 inches" },
          { name: "Type", value: "FULL HD" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "CPU", value: "Intel Core i5-13420H" },
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "512GB SSD" },
          { name: "GPU", value: "NVIDIA GeForce RTX" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "hp-15-fc0086au",
    name: "Laptop Hp 15-FC0086AU",
    brand: "HP",
    price: 1099.99,
    discountPrice: 1049.99,
    rating: 4.8,
    reviewCount: 180,
    availability: "In Stock",
    sku: "HP-15-FC0086AU",
    description: "Laptop HP 15 với thiết kế hiện đại, hiệu năng ổn định cho công việc và học tập.",
    shortDescription: "15.6-inch FULL HD, R5-7430U, 512GB SSD.",
    features: [
      "15.6-inch FULL HD display",
      "AMD Ryzen 5 7430U",
      "512GB SSD",
      "8GB RAM"
    ],
    colors: [
      { name: "Silver", code: "#C0C0C0" }
    ],
    storage: [
      { size: "512GB", price: 1099.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Laptop Hp 15-FC0086AU.webp",
        alt: "HP 15"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "15.6 inches" },
          { name: "Type", value: "FULL HD" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "CPU", value: "AMD Ryzen 5 7430U" },
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "hp-gaming-victus-15-fa1139tx-8y6w3pa",
    name: "Laptop HP Gaming Victus 15-FA1139TX 8Y6W3PA",
    brand: "HP",
    price: 1099.99,
    discountPrice: 1049.99,
    rating: 4.8,
    reviewCount: 180,
    availability: "In Stock",
    sku: "HP-GAMING-VICTUS-15-FA1139TX-8Y6W3PA",
    description: "Laptop gaming HP Victus với hiệu năng mạnh mẽ, card đồ họa rời.",
    shortDescription: "15.6-inch FULL HD, Intel Core i5-12450H, 512GB SSD.",
    features: [
      "15.6-inch FULL HD display",
      "Intel Core i5-12450H",
      "512GB SSD",
      "8GB RAM",
      "NVIDIA GeForce RTX"
    ],
    colors: [
      { name: "Black", code: "#222" }
    ],
    storage: [
      { size: "512GB", price: 1099.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Laptop HP Gaming Victus 15-FA1139TX 8Y6W3PA.webp",
        alt: "HP Gaming Victus 15"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "15.6 inches" },
          { name: "Type", value: "FULL HD" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "CPU", value: "Intel Core i5-12450H" },
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "512GB SSD" },
          { name: "GPU", value: "NVIDIA GeForce RTX" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "lenovo-ideapad-slim-3-14irh10-83l00008vn",
    name: "Laptop Lenovo IdeaPad Slim 3 14IRH10 83L00008VN",
    brand: "Lenovo",
    price: 1099.99,
    discountPrice: 1049.99,
    rating: 4.8,
    reviewCount: 180,
    availability: "In Stock",
    sku: "LENOVO-IDEAPAD-SLIM-3-14IRH10-83L00008VN",
    description: "Laptop Lenovo IdeaPad Slim 3 với thiết kế mỏng nhẹ, hiệu năng ổn định.",
    shortDescription: "14-inch WUXGA, Intel Core i5-13420H, 512GB SSD.",
    features: [
      "14-inch WUXGA display",
      "Intel Core i5-13420H",
      "512GB SSD",
      "8GB RAM"
    ],
    colors: [
      { name: "Gray", code: "#888" }
    ],
    storage: [
      { size: "512GB", price: 1099.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Laptop Lenovo IdeaPad Slim 3 14IRH10 83L00008VN.webp",
        alt: "Lenovo IdeaPad Slim 3"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "14 inches" },
          { name: "Type", value: "WUXGA" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "CPU", value: "Intel Core i5-13420H" },
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "msi-modern-14-c12mo-660vn",
    name: "Laptop MSI Modern 14 C12MO-660VN",
    brand: "MSI",
    price: 1099.99,
    discountPrice: 1049.99,
    rating: 4.8,
    reviewCount: 180,
    availability: "In Stock",
    sku: "MSI-MODERN-14-C12MO-660VN",
    description: "Laptop MSI Modern 14 với thiết kế hiện đại, hiệu năng ổn định.",
    shortDescription: "14-inch FULL HD, Intel Core i5-1235U, 512GB SSD.",
    features: [
      "14-inch FULL HD display",
      "Intel Core i5-1235U",
      "512GB SSD",
      "8GB RAM"
    ],
    colors: [
      { name: "Gray", code: "#888" }
    ],
    storage: [
      { size: "512GB", price: 1099.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Laptop MSI Modern 14 C12MO-660VN.webp",
        alt: "MSI Modern 14"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "14 inches" },
          { name: "Type", value: "FULL HD" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "CPU", value: "Intel Core i5-1235U" },
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "512GB SSD" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "asus-gaming-vivobook-k3605zc-rp564w",
    name: "Latop Asus Gaming VivoBook K3605ZC-RP564W",
    brand: "Asus",
    price: 1099.99,
    discountPrice: 1049.99,
    rating: 4.8,
    reviewCount: 180,
    availability: "In Stock",
    sku: "ASUS-GAMING-VB-K3605ZC-RP564W",
    description: "Laptop Asus Gaming VivoBook với hiệu năng mạnh mẽ, màn hình lớn.",
    shortDescription: "16-inch WUXGA, Intel Core i5-12500H, 512GB SSD.",
    features: [
      "16-inch WUXGA display",
      "Intel Core i5-12500H",
      "512GB SSD",
      "8GB RAM",
      "NVIDIA GeForce RTX"
    ],
    colors: [
      { name: "Black", code: "#222" }
    ],
    storage: [
      { size: "512GB", price: 1099.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/Latop Asus Gaming VivoBook K3605ZC-RP564W.webp",
        alt: "Asus Gaming VivoBook"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "16 inches" },
          { name: "Type", value: "WUXGA" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "CPU", value: "Intel Core i5-12500H" },
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "512GB SSD" },
          { name: "GPU", value: "NVIDIA GeForce RTX" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "macbook-air-m4-13-inch-2025",
    name: "MacBook Air M4 13 inch 2025",
    brand: "Apple",
    price: 1399.99,
    discountPrice: 1299.99,
    rating: 4.9,
    reviewCount: 80,
    availability: "In Stock",
    sku: "APL-MBAIR-M4-13-2025",
    description: "MacBook Air M4 13 inch 2025 với chip Apple M4, thiết kế siêu mỏng nhẹ.",
    shortDescription: "13.6-inch 2.5K, Apple M4, 256GB SSD.",
    features: [
      "13.6-inch 2.5K display",
      "Apple M4 chip",
      "256GB SSD",
      "8GB RAM"
    ],
    colors: [
      { name: "Silver", code: "#C0C0C0" }
    ],
    storage: [
      { size: "256GB", price: 1299.99 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Laptops/MacBook Air M4 13 inch 2025.webp",
        alt: "MacBook Air M4 13 inch 2025"
      }
    ],
    specifications: [
      {
        category: "Display",
        items: [
          { name: "Size", value: "13.6 inches" },
          { name: "Type", value: "2.5K" }
        ]
      },
      {
        category: "Performance",
        items: [
          { name: "Chip", value: "Apple M4" },
          { name: "RAM", value: "8GB" },
          { name: "Storage", value: "256GB SSD" }
        ]
      }
    ],
    reviews: []
  }
];

const mockCameraList = [
  {
    id: "camera-imou-ipc-a32e-khong-day-3mp_2",
    name: "Camera Imou IPC-A32E Không Dây 3MP",
    brand: "Imou",
    price: 899,
    discountPrice: 799,
    rating: 4.8,
    reviewCount: 120,
    availability: "In Stock",
    sku: "IMOU-IPC-A32E-3MP",
    description: "Camera không dây Imou IPC-A32E độ phân giải 3MP, hỗ trợ thẻ nhớ 256GB.",
    shortDescription: "Camera WiFi 3MP, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    features: [
      "Độ phân giải 3MP",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 256GB",
      "Night Vision"
    ],
    colors: [
      { name: "White", code: "#fff" }
    ],
    storage: [
      { size: "256GB", price: 899 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-imou-ipc-a32e-khong-day-3mp_2.webp",
        alt: "Camera Imou IPC-A32E Không Dây 3MP"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "3MP" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 256GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-hong-ngoai-khong-day-5mp-ezviz-h6c-pro",
    name: "Camera IP Hồng Ngoại Không Dây 5MP EZVIZ H6C Pro",
    brand: "EZVIZ",
    price: 129,
    discountPrice: 119,
    rating: 4.7,
    reviewCount: 98,
    availability: "In Stock",
    sku: "EZVIZ-H6C-PRO-5MP",
    description: "Camera EZVIZ H6C Pro 5MP, hỗ trợ thẻ nhớ 512GB, Night Vision.",
    shortDescription: "Camera WiFi 5MP, hỗ trợ thẻ nhớ 512GB, Night Vision.",
    features: [
      "Độ phân giải 5MP",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 512GB",
      "Night Vision"
    ],
    colors: [
      { name: "White", code: "#fff" }
    ],
    storage: [
      { size: "512GB", price: 129 }
    ],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-5mp-ezviz-h6c-pro.webp",
        alt: "Camera IP Hồng Ngoại Không Dây 5MP EZVIZ H6C Pro"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "5MP" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 512GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-hong-ngoai-khong-day-5mp-imou-ipc-a52p",
    name: "Camera IP Hồng Ngoại Không Dây 5MP Imou IPC-A52P",
    brand: "Imou",
    price: 135,
    discountPrice: 115,
    rating: 4.9,
    reviewCount: 150,
    availability: "In Stock",
    sku: "IMOU-IPC-A52P-5MP",
    description: "Camera Imou IPC-A52P 5MP, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    shortDescription: "Camera WiFi 5MP, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    features: [
      "Độ phân giải 5MP",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 256GB",
      "Night Vision"
    ],
    colors: [{ name: "White", code: "#fff" }],
    storage: [{ size: "256GB", price: 135 }],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-5mp-imou-ipc-a52p.webp",
        alt: "Camera IP Hồng Ngoại Không Dây 5MP Imou IPC-A52P"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "5MP" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 256GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-hong-ngoai-khong-day-ezviz-c6n-3mp_3_",
    name: "Camera IP Hồng Ngoại Không Dây EZVIZ C6N 3MP",
    brand: "EZVIZ",
    price: 990,
    discountPrice: 910,
    rating: 4.6,
    reviewCount: 110,
    availability: "In Stock",
    sku: "EZVIZ-C6N-3MP",
    description: "Camera EZVIZ C6N 3MP, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    shortDescription: "Camera WiFi 3MP, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    features: [
      "Độ phân giải 3MP",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 256GB",
      "Night Vision"
    ],
    colors: [{ name: "White", code: "#fff" }],
    storage: [{ size: "256GB", price: 990 }],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-ezviz-c6n-3mp_3_.webp",
        alt: "Camera IP Hồng Ngoại Không Dây EZVIZ C6N 3MP"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "3MP" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 256GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-ngoai-troi-wifi-365-selection-oc1-2k_8_",
    name: "Camera IP Ngoài Trời Wifi 365 Selection OC1 2K",
    brand: "365 Selection",
    price: 149,
    discountPrice: 134,
    rating: 4.7,
    reviewCount: 90,
    availability: "In Stock",
    sku: "365-OC1-2K",
    description: "Camera ngoài trời 2K, hỗ trợ thẻ nhớ 128GB, Night Vision.",
    shortDescription: "Camera ngoài trời 2K, WiFi, Night Vision.",
    features: [
      "Độ phân giải 2K",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 128GB",
      "Night Vision"
    ],
    colors: [{ name: "White", code: "#fff" }],
    storage: [{ size: "128GB", price: 149 }],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-ngoai-troi-wifi-365-selection-oc1-2k_8_.webp",
        alt: "Camera IP Ngoài Trời Wifi 365 Selection OC1 2K"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "2K" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 128GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-wifi-2k-365-selection-c1.1",
    name: "Camera IP Wifi 2K 365 Selection C1.1",
    brand: "365 Selection",
    price: 119,
    discountPrice: 111,
    rating: 4.5,
    reviewCount: 80,
    availability: "In Stock",
    sku: "365-C1.1-2K",
    description: "Camera IP Wifi 2K 365 Selection C1.1, hỗ trợ thẻ nhớ 128GB, Night Vision.",
    shortDescription: "Camera WiFi 2K, hỗ trợ thẻ nhớ 128GB, Night Vision.",
    features: [
      "Độ phân giải 2K",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 128GB",
      "Night Vision"
    ],
    colors: [{ name: "White", code: "#fff" }],
    storage: [{ size: "128GB", price: 119 }],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-wifi-2k-365-selection-c1.1.webp",
        alt: "Camera IP Wifi 2K 365 Selection C1.1"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "2K" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 128GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-wifi-3k-365-selection-c2_5_",
    name: "Camera IP Wifi 3K 365 Selection C2",
    brand: "365 Selection",
    price: 159,
    discountPrice: 141,
    rating: 4.8,
    reviewCount: 105,
    availability: "In Stock",
    sku: "365-C2-3K",
    description: "Camera IP Wifi 3K 365 Selection C2, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    shortDescription: "Camera WiFi 3K, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    features: [
      "Độ phân giải 3K",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 256GB",
      "Night Vision"
    ],
    colors: [{ name: "White", code: "#fff" }],
    storage: [{ size: "256GB", price: 159 }],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-wifi-3k-365-selection-c2_5_.webp",
        alt: "Camera IP Wifi 3K 365 Selection C2"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "3K" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 256GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-wifi-4mp-imou-ipc-a43.1",
    name: "Camera IP Wifi 4MP Imou IPC-A43.1",
    brand: "Imou",
    price: 125,
    discountPrice: 114,
    rating: 4.7,
    reviewCount: 92,
    availability: "In Stock",
    sku: "IMOU-IPC-A43.1-4MP",
    description: "Camera Imou IPC-A43.1 4MP, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    shortDescription: "Camera WiFi 4MP, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    features: [
      "Độ phân giải 4MP",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 256GB",
      "Night Vision"
    ],
    colors: [{ name: "White", code: "#fff" }],
    storage: [{ size: "256GB", price: 125 }],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-wifi-4mp-imou-ipc-a43.1.webp",
        alt: "Camera IP Wifi 4MP Imou IPC-A43.1"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "4MP" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 256GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-wifi-ai-reoqoo-xt-x31b-2-5k-ngoai-troi",
    name: "Camera IP Wifi AI Reoqoo XT-X31B 2.5K Ngoài Trời",
    brand: "Reoqoo",
    price: 169,
    discountPrice: 147,
    rating: 4.9,
    reviewCount: 130,
    availability: "In Stock",
    sku: "REOQOO-XT-X31B-2.5K",
    description: "Camera ngoài trời AI Reoqoo XT-X31B 2.5K, hỗ trợ thẻ nhớ 256GB, Night Vision.",
    shortDescription: "Camera ngoài trời AI 2.5K, WiFi, Night Vision.",
    features: [
      "Độ phân giải 2.5K",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 256GB",
      "Night Vision"
    ],
    colors: [{ name: "White", code: "#fff" }],
    storage: [{ size: "256GB", price: 169 }],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-wifi-ai-reoqoo-xt-x31b-2-5k-ngoai-troi.webp",
        alt: "Camera IP Wifi AI Reoqoo XT-X31B 2.5K Ngoài Trời"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "2.5K" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 256GB" }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "camera-ip-wifi-imou-ipc-a23p",
    name: "Camera IP Wifi Imou IPC-A23P",
    brand: "Imou",
    price: 105,
    discountPrice: 97,
    rating: 4.6,
    reviewCount: 85,
    availability: "In Stock",
    sku: "IMOU-IPC-A23P-2MP",
    description: "Camera Imou IPC-A23P 2MP, hỗ trợ thẻ nhớ 128GB, Night Vision.",
    shortDescription: "Camera WiFi 2MP, hỗ trợ thẻ nhớ 128GB, Night Vision.",
    features: [
      "Độ phân giải 2MP",
      "Kết nối WiFi",
      "Hỗ trợ thẻ nhớ 128GB",
      "Night Vision"
    ],
    colors: [{ name: "White", code: "#fff" }],
    storage: [{ size: "128GB", price: 105 }],
    images: [
      {
        id: 1,
        src: "/assets/images/Cameras/camera-ip-wifi-imou-ipc-a23p.webp",
        alt: "Camera IP Wifi Imou IPC-A23P"
      }
    ],
    specifications: [
      {
        category: "Camera",
        items: [
          { name: "Độ phân giải", value: "2MP" },
          { name: "Kết nối", value: "WiFi" },
          { name: "Night Vision", value: "Có" },
          { name: "Lưu trữ", value: "Hỗ trợ thẻ nhớ 128GB" }
        ]
      }
    ],
    reviews: []
  }
];

export default ProductDetailPage;
export { mockCameraList };