import React, { useState, useEffect } from "react";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import ProductCard from "./components/ProductCard"; 
import Pagination from "./components/Pagination";
import FilterSidebar from "./components/FilterSidebar";
import ProductSkeleton from "./components/ProductSkeleton";

const ViewAllPhone = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: { min: 0, max: 2000 }, 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPhoneFilterOpen, setIsPhoneFilterOpen] = useState(false); 
  const [sortBy, setSortBy] = useState("popularity");
  const productsPerPage = 12;

  
  const mockPhoneProducts = [
    {
        id: "iphone-15-pro-max",
        name: "Apple iPhone 15 Pro Max",
        brand: "Apple", 
        price: 1199.99,
        image: "/assets/images/Phones/Apple iPhone 15 Pro Max.webp",
        rating: 4.9,
        reviews: 450,
        discount: 10,
        isNew: true,
        specs: {
            storage: "256GB",
            chip: "Apple A17 Bionic",
            display: "6.7-inch Super Retina XDR",
            camera: "48MP Chính",
        },
        inStock: true,
    },
    {
        id: "samsung-galaxy-s24-ultra",
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung", 
        price: 1299.99,
        image: "/assets/images/Phones/Samsung Galaxy S24 Ultra.webp",
        rating: 4.8,
        reviews: 380,
        discount: 15,
        isNew: true,
        specs: {
            storage: "512GB",
            chip: "Snapdragon 8 Gen 3 for Galaxy",
            display: "6.8-inch Dynamic AMOLED 2X",
            camera: "200MP Chính",
        },
        inStock: true,
    },
    {
        id: "google-pixel-8-pro",
        name: "Google Pixel 8 Pro",
        brand: "Google",
        price: 999.99,
        image: "/assets/images/Phones/Google Pixel 8 Pro.webp",
        rating: 4.7,
        reviews: 310,
        discount: 5,
        isNew: false,
        specs: {
            storage: "128GB",
            chip: "Google Tensor G3",
            display: "6.7-inch OLED",
            camera: "50MP Chính",
        },
        inStock: true,
    },
    {
        id: "xiaomi-14-ultra",
        name: "Xiaomi 14 Ultra",
        brand: "Xiaomi", 
        price: 1099.00,
        image: "/assets/images/Phones/Xiaomi 14 Ultra.webp",
        rating: 4.8,
        reviews: 250,
        discount: 8,
        isNew: true,
        specs: {
            storage: "512GB",
            chip: "Snapdragon 8 Gen 3",
            display: "6.73-inch AMOLED",
            camera: "50MP Leica Chính",
        },
        inStock: true,
    },
    {
        id: "oppo-find-x7-ultra",
        name: "Oppo Find X7 Ultra",
        brand: "Oppo", 
        price: 1150.00,
        image: "/assets/images/Phones/Oppo Find X7 Ultra.webp",
        rating: 4.7,
        reviews: 190,
        discount: 0,
        isNew: true,
        specs: {
            storage: "256GB",
            chip: "Snapdragon 8 Gen 3",
            display: "6.82-inch AMOLED LTPO",
            camera: "50MP Hasselblad Chính",
        },
        inStock: true,
    },
    {
        id: "samsung-galaxy-z-fold-5",
        name: "Samsung Galaxy Z Fold 5",
        brand: "Samsung", 
        price: 1799.99,
        image: "/assets/images/Phones/Samsung Galaxy Z Fold 5.webp",
        rating: 4.6,
        reviews: 220,
        discount: 12,
        isNew: false,
        specs: {
            storage: "512GB",
            chip: "Snapdragon 8 Gen 2 for Galaxy",
            display: "7.6-inch Gập & 6.2-inch Phụ",
            camera: "50MP Chính",
        },
        inStock: true,
    },
    {
        id: "iphone-15",
        name: "Apple iPhone 15",
        brand: "Apple", 
        price: 799.99,
        image: "/assets/images/Phones/Apple iPhone 15.webp",
        rating: 4.7,
        reviews: 350,
        discount: 5,
        isNew: true,
        specs: {
            storage: "128GB",
            chip: "Apple A16 Bionic",
            display: "6.1-inch Super Retina XDR",
            camera: "48MP Chính",
        },
        inStock: true,
    },
    {
        id: "nothing-phone-2",
        name: "Nothing Phone 2",
        brand: "Nothing", 
        price: 699.00,
        image: "/assets/images/Phones/Nothing Phone 2.webp",
        rating: 4.5,
        reviews: 150,
        discount: 3,
        isNew: false,
        specs: {
            storage: "256GB",
            chip: "Snapdragon 8+ Gen 1",
            display: "6.7-inch OLED LTPO",
            camera: "50MP Chính",
        },
        inStock: true,
    },
  ];

  // Danh sách các thương hiệu có sẵn để lọc
  const availableBrands = ["Apple", "Samsung", "Google", "Xiaomi", "Oppo", "Nothing"];

  // Mô phỏng gọi API để lấy sản phẩm
  useEffect(() => {
    setLoading(true);
    
    // Mô phỏng độ trễ mạng
    const timer = setTimeout(() => {
      // Lọc sản phẩm dựa trên các bộ lọc đã chọn
      let filteredProducts = [...mockPhoneProducts];
      
      // Áp dụng bộ lọc thương hiệu
      if (filters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          filters.brands.includes(product.brand)
        );
      }
      
      // Áp dụng bộ lọc khoảng giá
      filteredProducts = filteredProducts.filter(product => 
        (product.price) >= filters.priceRange.min && 
        (product.price) <= filters.priceRange.max
      );
      
      // Áp dụng sắp xếp
      switch (sortBy) {
        case "price-low-high":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "popularity":
        default:
          // Sắp xếp mặc định theo reviews, có thể thay đổi logic này
          filteredProducts.sort((a, b) => b.reviews - a.reviews);
          break;
      }
      
      // Tính tổng số trang
      const totalFilteredPages = Math.ceil(filteredProducts.length / productsPerPage);
      setTotalPages(totalFilteredPages);
      
      // Điều chỉnh trang hiện tại nếu nó vượt quá tổng số trang mới
      if (currentPage > totalFilteredPages && totalFilteredPages > 0) {
        setCurrentPage(1);
      }
      
      // Phân trang kết quả
      const startIndex = (currentPage - 1) * productsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
      
      setProducts(paginatedProducts);
      setLoading(false);
    }, 1000); // Độ trễ 1 giây
    
    return () => clearTimeout(timer);
  }, [filters, currentPage, sortBy]);

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset về trang đầu tiên khi bộ lọc thay đổi
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Cuộn lên đầu lưới sản phẩm
    document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
  };

  // Xử lý thay đổi cách sắp xếp
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Xóa tất cả bộ lọc
  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: { min: 0, max: 2000 },
    });
    setCurrentPage(1);
  };

  // Bật/tắt sidebar lọc trên di động
  const toggleMobileFilter = () => {
    setIsPhoneFilterOpen(!isPhoneFilterOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Tiêu đề trang */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Điện thoại</h1>
            <p className="mt-1 text-sm text-gray-600">
              Khám phá bộ sưu tập điện thoại mới nhất của chúng tôi
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar lọc - cho desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <FilterSidebar 
                filters={filters}
                availableBrands={availableBrands}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
            
            {/* Nút lọc trên di động */}
            <div className="md:hidden mb-4">
              <Button 
                variant="secondary" 
                icon="SlidersHorizontal" 
                onClick={toggleMobileFilter}
                className="w-full"
              >
                Bộ lọc
              </Button>
            </div>
            
            {/* Sidebar lọc - cho di động */}
            {isPhoneFilterOpen && (
              <div className="fixed inset-0 z-40 flex md:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleMobileFilter}></div>
                <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-gray-900">Bộ lọc</h2>
                      <Button 
                        variant="icon" 
                        icon="X" 
                        onClick={toggleMobileFilter}
                        aria-label="Đóng bộ lọc"
                      />
                    </div>
                    <FilterSidebar 
                      filters={filters}
                      availableBrands={availableBrands}
                      onFilterChange={handleFilterChange}
                      onClearFilters={clearFilters}
                      isMobile={true}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Lưới sản phẩm */}
            <div className="flex-grow" id="product-grid">
              {/* Thông tin sắp xếp và kết quả */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-sm text-gray-600">
                  {loading ? (
                    "Đang tải sản phẩm..."
                  ) : products.length === 0 ? (
                    "Không tìm thấy sản phẩm"
                  ) : (
                    `Hiển thị ${(currentPage - 1) * productsPerPage + 1}-${Math.min(currentPage * productsPerPage, mockPhoneProducts.filter(p => (filters.brands.length === 0 || filters.brands.includes(p.brand)) && p.price >= filters.priceRange.min && p.price <= filters.priceRange.max).length)} của ${mockPhoneProducts.filter(p => (filters.brands.length === 0 || filters.brands.includes(p.brand)) && p.price >= filters.priceRange.min && p.price <= filters.priceRange.max).length} sản phẩm`
                  )}
                </p>
                
                <div className="flex items-center">
                  <label htmlFor="sort-by" className="mr-2 text-sm font-medium text-gray-700">Sắp xếp theo:</label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm rounded-md"
                  >
                    <option value="popularity">Phổ biến</option>
                    <option value="price-low-high">Giá: Thấp đến Cao</option>
                    <option value="price-high-low">Giá: Cao đến Thấp</option>
                    <option value="rating">Đánh giá</option>
                  </select>
                </div>
              </div>
              
              {/* Các bộ lọc đang hoạt động */}
              {(filters.brands.length > 0 || filters.priceRange.min > 0 || filters.priceRange.max < 2000) && (
                <div className="mb-6">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Bộ lọc đang áp dụng:</span>
                    
                    {filters.brands.map(brand => (
                      <span 
                        key={brand}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-600"
                      >
                        {brand}
                        <button
                          type="button"
                          onClick={() => {
                            const newBrands = filters.brands.filter(b => b !== brand);
                            handleFilterChange({...filters, brands: newBrands});
                          }}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-600 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                        >
                          <span className="sr-only">Xóa bộ lọc cho {brand}</span>
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                    
                    {(filters.priceRange.min > 0 || filters.priceRange.max < 2000) && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-600">
                        ${filters.priceRange.min} - ${filters.priceRange.max}
                        <button
                          type="button"
                          onClick={() => {
                            handleFilterChange({...filters, priceRange: { min: 0, max: 2000 }});
                          }}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-600 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                        >
                          <span className="sr-only">Xóa bộ lọc giá</span>
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="small" 
                      onClick={clearFilters}
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Lưới sản phẩm */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(productsPerPage)].map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map(product => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Icon name="SearchX" size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Không có sản phẩm nào phù hợp</h3>
                  <p className="text-gray-600 mb-6">Hãy thử điều chỉnh bộ lọc của bạn</p>
                  <Button 
                    variant="primary" 
                    onClick={clearFilters}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
              
              {/* Phân trang */}
              {!loading && products.length > 0 && totalPages > 1 && (
                <div className="mt-8">
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewAllPhone;