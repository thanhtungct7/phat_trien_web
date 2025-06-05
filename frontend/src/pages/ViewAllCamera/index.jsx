import React, { useState, useEffect } from "react";

import Header from "../../components/ui/Header";


import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";


// Components
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import FilterSidebar from "./components/FilterSidebar";
import ProductSkeleton from "./components/ProductSkeleton";
import { View } from "lucide-react";

const ViewAllCamera = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: { min: 0, max: 2000 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLaptopFilterOpen, setIsCameraFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const productsPerPage = 12;

  // Mock data for products
  const mockProducts = [
    {
      id: "camera-imou-ipc-a32e-khong-day-3mp_2",
      name: "Camera Imou IPC-A32E Không Dây 3MP",
      brand: "Imou",
      price: 899,
      image: "/assets/images/Cameras/camera-imou-ipc-a32e-khong-day-3mp_2.webp",
      rating: 4.8,
      reviews: 120,
      discount: 10,
      isNew: true,
      specs: {
        resolution: "3MP",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 256GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-hong-ngoai-khong-day-5mp-ezviz-h6c-pro",
      name: "Camera IP Hồng Ngoại Không Dây 5MP EZVIZ H6C Pro",
      brand: "EZVIZ",
      price: 129,
      image: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-5mp-ezviz-h6c-pro.webp",
      rating: 4.7,
      reviews: 98,
      discount: 12,
      isNew: false,
      specs: {
        resolution: "5MP",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 512GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-hong-ngoai-khong-day-5mp-imou-ipc-a52p",
      name: "Camera IP Hồng Ngoại Không Dây 5MP Imou IPC-A52P",
      brand: "Imou",
      price: 135,
      image: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-5mp-imou-ipc-a52p.webp",
      rating: 4.9,
      reviews: 150,
      discount: 15,
      isNew: true,
      specs: {
        resolution: "5MP",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 256GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-hong-ngoai-khong-day-ezviz-c6n-3mp_3_",
      name: "Camera IP Hồng Ngoại Không Dây EZVIZ C6N 3MP",
      brand: "EZVIZ",
      price: 990,
      image: "/assets/images/Cameras/camera-ip-hong-ngoai-khong-day-ezviz-c6n-3mp_3_.webp",
      rating: 4.6,
      reviews: 110,
      discount: 8,
      isNew: false,
      specs: {
        resolution: "3MP",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 256GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-ngoai-troi-wifi-365-selection-oc1-2k_8_",
      name: "Camera IP Ngoài Trời Wifi 365 Selection OC1 2K",
      brand: "365 Selection",
      price: 149,
      image: "/assets/images/Cameras/camera-ip-ngoai-troi-wifi-365-selection-oc1-2k_8_.webp",
      rating: 4.7,
      reviews: 90,
      discount: 10,
      isNew: true,
      specs: {
        resolution: "2K",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 128GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-wifi-2k-365-selection-c1.1",
      name: "Camera IP Wifi 2K 365 Selection C1.1",
      brand: "365 Selection",
      price: 119,
      image: "/assets/images/Cameras/camera-ip-wifi-2k-365-selection-c1.1.webp",
      rating: 4.5,
      reviews: 80,
      discount: 7,
      isNew: false,
      specs: {
        resolution: "2K",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 128GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-wifi-3k-365-selection-c2_5_",
      name: "Camera IP Wifi 3K 365 Selection C2",
      brand: "365 Selection",
      price: 159,
      image: "/assets/images/Cameras/camera-ip-wifi-3k-365-selection-c2_5_.webp",
      rating: 4.8,
      reviews: 105,
      discount: 11,
      isNew: true,
      specs: {
        resolution: "3K",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 256GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-wifi-4mp-imou-ipc-a43.1",
      name: "Camera IP Wifi 4MP Imou IPC-A43.1",
      brand: "Imou",
      price: 125,
      image: "/assets/images/Cameras/camera-ip-wifi-4mp-imou-ipc-a43.1.webp",
      rating: 4.7,
      reviews: 92,
      discount: 9,
      isNew: false,
      specs: {
        resolution: "4MP",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 256GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-wifi-ai-reoqoo-xt-x31b-2-5k-ngoai-troi",
      name: "Camera IP Wifi AI Reoqoo XT-X31B 2.5K Ngoài Trời",
      brand: "Reoqoo",
      price: 169,
      image: "/assets/images/Cameras/camera-ip-wifi-ai-reoqoo-xt-x31b-2-5k-ngoai-troi.webp",
      rating: 4.9,
      reviews: 130,
      discount: 13,
      isNew: true,
      specs: {
        resolution: "2.5K",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 256GB",
      },
      inStock: true,
    },
    {
      id: "camera-ip-wifi-imou-ipc-a23p",
      name: "Camera IP Wifi Imou IPC-A23P",
      brand: "Imou",
      price: 105,
      image: "/assets/images/Cameras/camera-ip-wifi-imou-ipc-a23p.webp",
      rating: 4.6,
      reviews: 85,
      discount: 8,
      isNew: false,
      specs: {
        resolution: "2MP",
        connection: "WiFi",
        nightVision: "Có",
        storage: "Hỗ trợ thẻ nhớ 128GB",
      },
      inStock: true,
    },
  ];

  // Available brands for filtering
  const availableBrands = ["Imou", "Reoqoo", "365 Selection", "EZVIZ"];

  // Simulate API call to fetch products
  useEffect(() => {
    setLoading(true);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      // Filter products based on selected filters
      let filteredProducts = [...mockProducts];
      
      // Apply brand filter
      if (filters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
          filters.brands.includes(product.brand)
        );
      }
      
      // Apply price range filter
      filteredProducts = filteredProducts.filter(product => 
        (product.salePrice || product.price) >= filters.priceRange.min && 
        (product.salePrice || product.price) <= filters.priceRange.max
      );
      
      // Apply sorting
      switch (sortBy) {
        case "price-low-high":
          filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
          break;
        case "price-high-low":
          filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "popularity":
        default:
          // Already sorted by popularity in the mock data
          break;
      }
      
      // Calculate total pages
      const totalFilteredPages = Math.ceil(filteredProducts.length / productsPerPage);
      setTotalPages(totalFilteredPages);
      
      // Adjust current page if it exceeds the new total pages
      if (currentPage > totalFilteredPages) {
        setCurrentPage(1);
      }
      
      // Paginate results
      const startIndex = (currentPage - 1) * productsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
      
      setProducts(paginatedProducts);
      setLoading(false);
    }, 1000); // 1 second delay to simulate network request
    
    return () => clearTimeout(timer);
  }, [filters, currentPage, sortBy]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of product grid
    document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: { min: 0, max: 2000 },
    });
    setCurrentPage(1);
  };

  // Toggle mobile filter sidebar
  const toggleMobileFilter = () => {
    setIsCameraFilterOpen(!isLaptopFilterOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Page header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Cameras</h1>
            <p className="mt-1 text-sm text-gray-600">
              Browse our collection of the latest Cameras
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filter sidebar - desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <FilterSidebar 
                filters={filters}
                availableBrands={availableBrands}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
            
            {/* Mobile filter button */}
            <div className="md:hidden mb-4">
              <Button 
                variant="secondary" 
                icon="SlidersHorizontal" 
                onClick={toggleMobileFilter}
                className="w-full"
              >
                Filters
              </Button>
            </div>
            
            {/* Mobile filter sidebar */}
            {isLaptopFilterOpen && (
              <div className="fixed inset-0 z-40 flex md:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleMobileFilter}></div>
                <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <Button 
                        variant="icon" 
                        icon="X" 
                        onClick={toggleMobileFilter}
                        aria-label="Close filters"
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
            
            {/* Product grid */}
            <div className="flex-grow" id="product-grid">
              {/* Sort and results info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <p className="text-sm text-gray-600">
                  {loading ? (
                    "Loading products..."
                  ) : products.length === 0 ? (
                    "No products found"
                  ) : (
                    `Showing ${(currentPage - 1) * productsPerPage + 1}-${Math.min(currentPage * productsPerPage, (totalPages - 1) * productsPerPage + products.length)} of ${(totalPages - 1) * productsPerPage + products.length} products`
                  )}
                </p>
                
                <div className="flex items-center">
                  <label htmlFor="sort-by" className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm rounded-md"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
              
              {/* Active filters */}
              {(filters.brands.length > 0 || filters.priceRange.min > 0 || filters.priceRange.max < 2000) && (
                <div className="mb-6">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    
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
                          <span className="sr-only">Remove filter for {brand}</span>
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
                          <span className="sr-only">Remove price filter</span>
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="small" 
                      onClick={clearFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Products grid */}
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products match your criteria</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                  <Button 
                    variant="primary" 
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
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

export default ViewAllCamera;