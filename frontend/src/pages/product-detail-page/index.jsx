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
      if (mockPhoneList.find(lap => lap.id === id)) {
        data = mockPhoneList.find(lap => lap.id === id);
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

  const isPhone = product?.sku?.toLowerCase().includes("phone") || product?.name?.toLowerCase().includes("phone");

  // Sửa lại breadcrumbItems như sau:
  const breadcrumbItems = [
    { name: "Home", path: "/homepage" },
    isLaptop
      ? { name: "Laptops", path: "/laptops" }
      : isCamera
        ? { name: "Cameras", path: "/cameras" }
        : isPhone
          ? { name: "Phones", path: "/phones" }
          : { name: "Products", path: "/products" },
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

const mockPhoneList = [
  {
    id: "iphone-15-pro-max",
    name: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199.99,
    discountPrice: 1079.99, // Giảm 10%
    rating: 4.9,
    reviewCount: 450,
    availability: "In Stock",
    sku: "APL-IPH15PMAX-256GB",
    description: "iPhone 15 Pro Max là một bước nhảy vọt về công nghệ với chip A17 Pro mang lại hiệu năng đồ họa chưa từng có. Khung viền Titan chuẩn hàng không vũ trụ không chỉ sang trọng mà còn bền bỉ, nhẹ hơn các thế hệ trước. Hệ thống camera Pro mở ra khả năng nhiếp ảnh và quay phim chuyên nghiệp, đặc biệt với khả năng zoom quang học 5x.",
    shortDescription: "Flagship cao cấp của Apple với khung Titan, chip A17 Pro và camera tele 5x.",
    features: [
      "Màn hình Super Retina XDR 6.7 inch với ProMotion",
      "Chip Apple A17 Pro mạnh mẽ",
      "Khung viền Titan chuẩn hàng không vũ trụ",
      "Hệ thống camera Pro với camera chính 48MP và zoom quang 5x",
      "Nút tác vụ (Action Button) tùy chỉnh nhanh",
      "Cổng kết nối USB-C hỗ trợ USB 3 cho tốc độ truyền tải siêu nhanh",
    ],
    colors: [
      { name: "Titan Tự Nhiên", code: "#8F8A81" },
      { name: "Titan Xanh", code: "#4D5A68" },
      { name: "Titan Trắng", code: "#F5F5F0" },
      { name: "Titan Đen", code: "#5F5F5F" },
    ],
    storage: [ // Giả lập các tùy chọn dung lượng khác
      { size: "256GB", price: 1199.99 },
      { size: "512GB", price: 1399.99 },
      { size: "1TB", price: 1599.99 },
    ],
    images: [
      { id: 1, src: "/assets/images/Phones/Apple iPhone 15 Pro Max.webp", alt: "iPhone 15 Pro Max - Mặt trước" },
      { id: 2, src: "/assets/images/Phones/Apple iPhone 15 Pro Max.webp", alt: "iPhone 15 Pro Max - Cụm camera" },
    ],
    specifications: [
      {
        category: "Màn hình",
        items: [
          { name: "Kích thước", value: "6.7 inch" },
          { name: "Công nghệ", value: "Super Retina XDR với ProMotion" },
          { name: "Tần số quét", value: "Thích ứng lên đến 120Hz" },
        ],
      },
      {
        category: "Hiệu năng",
        items: [
          { name: "Chip", value: "Apple A17 Pro" },
          { name: "CPU", value: "6 lõi" },
          { name: "GPU", value: "6 lõi" },
        ],
      },
      {
        category: "Camera",
        items: [
          { name: "Camera chính", value: "48MP, ƒ/1.78" },
          { name: "Camera Ultra Wide", value: "12MP, ƒ/2.2" },
          { name: "Camera Telephoto 5x", value: "12MP, ƒ/2.8" },
        ],
      },
    ],
    reviews: [],
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299.99,
    discountPrice: 1104.99, // Giảm 15%
    rating: 4.8,
    reviewCount: 380,
    availability: "In Stock",
    sku: "SAM-S24ULTRA-512GB",
    description: "Samsung Galaxy S24 Ultra định nghĩa lại trải nghiệm di động với Galaxy AI. Dịch trực tiếp cuộc gọi, khoanh vùng tìm kiếm thông minh và chỉnh sửa ảnh chuyên nghiệp bằng AI. Bút S Pen tích hợp mang đến sự chính xác tuyệt đối, kết hợp với camera 200MP và hiệu năng đỉnh cao từ Snapdragon 8 Gen 3 for Galaxy.",
    shortDescription: "Điện thoại AI cao cấp với camera 200MP và bút S Pen tích hợp.",
    features: [
      "Màn hình Dynamic AMOLED 2X 6.8 inch",
      "Chip Snapdragon 8 Gen 3 for Galaxy",
      "Tích hợp các tính năng Galaxy AI",
      "Camera chính 200MP với Space Zoom 100x",
      "Bút S Pen tích hợp sẵn trong thân máy",
      "Khung viền Titan bền bỉ",
    ],
    colors: [
      { name: "Xám Titan", code: "#8D8D8B" },
      { name: "Tím Titan", code: "#A49FAD" },
      { name: "Vàng Titan", code: "#E3DDBB" },
      { name: "Đen Titan", code: "#3E3D3B" },
    ],
    storage: [
      { size: "256GB", price: 1199.99 },
      { size: "512GB", price: 1299.99 },
      { size: "1TB", price: 1499.99 },
    ],
    images: [
      { id: 1, src: "/assets/images/Phones/Samsung Galaxy S24 Ultra.webp", alt: "Samsung Galaxy S24 Ultra - Mặt trước và bút S Pen" },
      { id: 2, src: "/assets/images/Phones/Samsung Galaxy S24 Ultra.webp", alt: "Samsung Galaxy S24 Ultra - Cụm camera sau" },
    ],
    specifications: [
      {
        category: "Màn hình",
        items: [
          { name: "Kích thước", value: "6.8 inch" },
          { name: "Công nghệ", value: "Dynamic AMOLED 2X" },
          { name: "Độ sáng", value: "2600 nits (tối đa)" },
        ],
      },
      {
        category: "Hiệu năng",
        items: [
          { name: "Chip", value: "Snapdragon 8 Gen 3 for Galaxy" },
          { name: "RAM", value: "12GB" },
        ],
      },
      {
        category: "Camera",
        items: [
          { name: "Camera chính", value: "200MP" },
          { name: "Camera góc siêu rộng", value: "12MP" },
          { name: "Camera Tele 1", value: "50MP (Zoom 5x)" },
          { name: "Camera Tele 2", value: "10MP (Zoom 3x)" },
        ],
      },
    ],
    reviews: [],
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 999.99,
    discountPrice: 949.99, // Giảm 5%
    rating: 4.7,
    reviewCount: 310,
    availability: "In Stock",
    sku: "GGL-PIX8PRO-128GB",
    description: "Pixel 8 Pro là chiếc điện thoại mạnh mẽ toàn diện từ Google. Với chip Google Tensor G3 và các tính năng AI độc quyền như Best Take, Magic Editor, đây là công cụ sáng tạo mạnh mẽ. Trải nghiệm Android gốc mượt mà và nhận cập nhật phần mềm trong 7 năm.",
    shortDescription: "Điện thoại thông minh từ Google với chip Tensor G3 và 7 năm cập nhật.",
    features: [
      "Màn hình Super Actua 6.7 inch 120Hz",
      "Chip Google Tensor G3 tùy chỉnh",
      "Hệ thống ba camera chuyên nghiệp",
      "Tính năng AI độc quyền: Best Take, Magic Editor, Audio Magic Eraser",
      "7 năm cập nhật hệ điều hành và bảo mật",
    ],
    colors: [
      { name: "Obsidian", code: "#181A1B" },
      { name: "Porcelain", code: "#F2E9DE" },
      { name: "Bay", code: "#A5C4DD" },
    ],
    storage: [
      { size: "128GB", price: 999.99 },
      { size: "256GB", price: 1059.99 },
    ],
    images: [
      { id: 1, src: "/assets/images/Phones/Google Pixel 8 Pro.webp", alt: "Google Pixel 8 Pro" }
    ],
    specifications: [
        { category: "Display", items: [{ name: "Size", value: "6.7-inch OLED" }, { name: "Chip", value: "Google Tensor G3" }] },
        { category: "Camera", items: [{ name: "Main", value: "50MP Chính" }, { name: "Storage", value: "128GB" }] },
    ],
    reviews: []
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    price: 1099.00,
    discountPrice: 1011.08, // Giảm 8%
    rating: 4.8,
    reviewCount: 250,
    availability: "In Stock",
    sku: "XIA-14ULTRA-512GB",
    description: "Hợp tác cùng Leica, Xiaomi 14 Ultra mang đến một kiệt tác nhiếp ảnh di động. Với cảm biến 1 inch và ống kính có thể thay đổi khẩu độ, bạn có toàn quyền kiểm soát sáng tạo. Màn hình All Around Liquid Display cho trải nghiệm xem đắm chìm.",
    shortDescription: "Camera Leica chuyên nghiệp với cảm biến 1-inch và hiệu năng hàng đầu.",
    features: [
        "Hệ thống camera Leica Vario-Summilux",
        "Cảm biến chính 1-inch LYT-900",
        "Màn hình 6.73-inch AMOLED C8 WQHD+",
        "Chip Snapdragon 8 Gen 3",
        "Sạc nhanh 90W có dây và 80W không dây",
    ],
    colors: [{ name: "Black", code: "#000000" }, { name: "White", code: "#FFFFFF" }],
    storage: [{ size: "512GB", price: 1099.00 }],
    images: [{ id: 1, src: "/assets/images/Phones/Xiaomi 14 Ultra.webp", alt: "Xiaomi 14 Ultra" }],
    specifications: [
        { category: "Performance", items: [{ name: "Chip", value: "Snapdragon 8 Gen 3" }, { name: "RAM", value: "16GB" }] },
        { category: "Camera", items: [{ name: "Main Sensor", value: "Sony LYT-900 1-inch" }, { name: "Aperture", value: "ƒ/1.63 to ƒ/4.0" }] },
    ],
    reviews: []
  },
  {
    id: "oppo-find-x7-ultra",
    name: "Oppo Find X7 Ultra",
    brand: "Oppo",
    price: 1150.00,
    discountPrice: 1150.00,
    rating: 4.7,
    reviewCount: 190,
    availability: "In Stock",
    sku: "OPP-FX7ULTRA-256GB",
    description: "Oppo Find X7 Ultra là điện thoại đầu tiên trên thế giới có hệ thống camera tele kép tiềm vọng, hợp tác cùng Hasselblad. Mang lại khả năng zoom vượt trội và chất lượng hình ảnh chuyên nghiệp. Màn hình ProXDR siêu sáng và hiệu năng mạnh mẽ.",
    shortDescription: "Camera tele kép tiềm vọng đầu tiên trên thế giới, hợp tác cùng Hasselblad.",
    features: [
      "Camera tele kép tiềm vọng",
      "Hệ thống camera tinh chỉnh bởi Hasselblad",
      "Màn hình 6.82-inch AMOLED LTPO QHD+",
      "Chip Snapdragon 8 Gen 3",
      "Sạc nhanh SUPERVOOC 100W",
    ],
    colors: [{ name: "Sepia Brown", code: "#7A5C4F" }, { name: "Ocean Blue", code: "#3B5998" }],
    storage: [{ size: "256GB", price: 1150.00 }, { size: "512GB", price: 1250.00 }],
    images: [{ id: 1, src: "/assets/images/Phones/Oppo Find X7 Ultra.webp", alt: "Oppo Find X7 Ultra" }],
    specifications: [
        { category: "Performance", items: [{ name: "Chip", value: "Snapdragon 8 Gen 3" }] },
        { category: "Camera", items: [{ name: "Main Camera", value: "50MP Hasselblad Chính" }, { name: "Telephoto", value: "Dual Periscope" }] },
    ],
    reviews: []
  },
  {
    id: "samsung-galaxy-z-fold-5",
    name: "Samsung Galaxy Z Fold 5",
    brand: "Samsung",
    price: 1799.99,
    discountPrice: 1583.99, // Giảm 12%
    rating: 4.6,
    reviewCount: 220,
    availability: "In Stock",
    sku: "SAM-ZFOLD5-512GB",
    description: "Mở ra một thế giới mới với Samsung Galaxy Z Fold 5. Màn hình gập lớn 7.6 inch cho trải nghiệm như máy tính bảng, lý tưởng cho đa nhiệm và giải trí. Bản lề Flex mới gập phẳng hơn, thiết kế mỏng nhẹ hơn và hỗ trợ bút S Pen.",
    shortDescription: "Điện thoại gập đa nhiệm với màn hình lớn và hỗ trợ bút S Pen.",
    features: [
      "Màn hình chính 7.6-inch Dynamic AMOLED 2X",
      "Màn hình phụ 6.2-inch",
      "Bản lề Flex gập không kẽ hở",
      "Chip Snapdragon 8 Gen 2 for Galaxy",
      "Thanh tác vụ thông minh cho đa nhiệm",
    ],
    colors: [{ name: "Icy Blue", code: "#A9D1E6" }, { name: "Phantom Black", code: "#181818" }],
    storage: [{ size: "512GB", price: 1799.99 }],
    images: [{ id: 1, src: "/assets/images/Phones/Samsung Galaxy Z Fold 5.webp", alt: "Samsung Galaxy Z Fold 5" }],
    specifications: [
        { category: "Display", items: [{ name: "Main", value: "7.6-inch Gập" }, { name: "Cover", value: "6.2-inch Phụ" }] },
        { category: "Performance", items: [{ name: "Chip", value: "Snapdragon 8 Gen 2 for Galaxy" }] },
    ],
    reviews: []
  },
  {
    id: "iphone-15",
    name: "Apple iPhone 15",
    brand: "Apple",
    price: 799.99,
    discountPrice: 759.99, // Giảm 5%
    rating: 4.7,
    reviewCount: 350,
    availability: "In Stock",
    sku: "APL-IPH15-128GB",
    description: "iPhone 15 mang đến những nâng cấp đáng giá với Dynamic Island, camera chính 48MP và cổng USB-C. Chip A16 Bionic mạnh mẽ đảm bảo hiệu năng mượt mà cho mọi tác vụ. Thiết kế viền bo cong cho cảm giác cầm nắm thoải mái.",
    shortDescription: "Nâng cấp đáng giá với Dynamic Island, camera 48MP và USB-C.",
    features: [
      "Màn hình Super Retina XDR 6.1 inch",
      "Dynamic Island hiển thị thông báo linh hoạt",
      "Chip Apple A16 Bionic",
      "Camera chính 48MP với zoom 2x",
      "Cổng kết nối USB-C",
    ],
    colors: [{ name: "Pink", code: "#FADADD" }, { name: "Blue", code: "#87CEEB" }, { name: "Green", code: "#90EE90" }],
    storage: [{ size: "128GB", price: 799.99 }, { size: "256GB", price: 899.99 }],
    images: [{ id: 1, src: "/assets/images/Phones/Apple iPhone 15.webp", alt: "Apple iPhone 15" }],
    specifications: [
        { category: "Performance", items: [{ name: "Chip", value: "Apple A16 Bionic" }] },
        { category: "Display", items: [{ name: "Size", value: "6.1-inch Super Retina XDR" }] },
    ],
    reviews: []
  },
  {
    id: "nothing-phone-2",
    name: "Nothing Phone (2)",
    brand: "Nothing",
    price: 699.00,
    discountPrice: 678.03, // Giảm 3%
    rating: 4.5,
    reviewCount: 150,
    availability: "In Stock",
    sku: "NOT-PHONE2-256GB",
    description: "Nothing Phone (2) nổi bật với thiết kế trong suốt độc đáo và giao diện Glyph Interface cải tiến. Hệ điều hành Nothing OS 2.0 mang đến trải nghiệm Android gốc được tùy biến tinh tế, tập trung vào sự tối giản và hiệu quả.",
    shortDescription: "Thiết kế trong suốt độc đáo và giao diện Glyph Interface.",
    features: [
      "Giao diện Glyph Interface với đèn LED thông báo",
      "Thiết kế mặt lưng trong suốt",
      "Hệ điều hành Nothing OS 2.0",
      "Màn hình 6.7-inch OLED LTPO",
      "Chip Snapdragon 8+ Gen 1",
    ],
    colors: [{ name: "White", code: "#FFFFFF" }, { name: "Dark Gray", code: "#A9A9A9" }],
    storage: [{ size: "256GB", price: 699.00 }],
    images: [{ id: 1, src: "/assets/images/Phones/Nothing Phone 2.webp", alt: "Nothing Phone (2)" }],
    specifications: [
        { category: "Performance", items: [{ name: "Chip", value: "Snapdragon 8+ Gen 1" }] },
        { category: "Display", items: [{ name: "Size", value: "6.7-inch OLED LTPO" }] },
    ],
    reviews: []
  },
];


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
export { mockLaptopList };
export { mockPhoneList };