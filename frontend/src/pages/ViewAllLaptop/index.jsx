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

const ViewAllLaptop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: { min: 0, max: 2000 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLaptopFilterOpen, setLaptopFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const productsPerPage = 12;

  // Mock data for products
  const mockProducts = [
    {
      id: "macbook-air-m2-2024",
      name: "Apple Macbook Air M2 2024",
      brand: "Apple",
      price: 1299.99,
      image: "/assets/images/Laptops/Apple Macbook Air M2 2024.webp",
      rating: 4.9,
      reviews: 320,
      discount: 8,
      isNew: true,
      specs: {
        storage: "512GB SSD",
        cpu: "Apple M2",
        display: "13.6-inch Retina",
      },
      inStock: true,
    },
    {
      id: "asus-vivobook-15-x1504va-bq2076w",
      name: "Laptop Asus VivoBook 15 X1504VA-BQ2076W",
      brand: "Asus",
      price: 799.99,
      image: "/assets/images/Laptops/Laptop Asus VivoBook 15 X1504VA-BQ2076W.webp",
      rating: 4.7,
      reviews: 210,
      discount: 12,
      isNew: false,
      specs: {
        storage: "512GB SSD",
        cpu: "Intel Core i5",
        display: "15.6-inch FHD",
      },
      inStock: true,
    },
    {
      id: "asus-vivobook-s-16-oled-s5606ma-mx051w",
      name: "Laptop Asus VivoBook S 16 OLED S5606MA-MX051W",
      brand: "Asus",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop Asus VivoBook S 16 OLED S5606MA-MX051W.webp",
      rating: 4.8,
      reviews: 180,
      discount: 10,
      isNew: true,
      specs: {
        storage: "1TB SSD",
        cpu: "Intel Core i7",
        display: "16-inch OLED",
      },
      inStock: true,
    },
    {
      id: "acer-nitro-v-avn15-51-57b2",
      name: "Laptop Gaming Acer Nitro V AVN15-51-57B2",
      brand: "Acer",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop Gaming Acer Nitro V AVN15-51-57B2.webp",
      rating: 4.8,
      reviews: 180,
      discount: 10,
      isNew: true,
      specs: {
        storage: "512GB SSD",
        cpu: "Intel Core i5-13420H",
        display: "15.6-inch FULL HD",
      },
      inStock: true,
    },
    {
      id: "hp-15-fc0086au",
      name: "Laptop Hp 15-FC0086AU",
      brand: "HP",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop Hp 15-FC0086AU.webp",
      rating: 4.8,
      reviews: 180,
      discount: 10,
      isNew: true,
      specs: {
        storage: "512GB SSD",
        cpu: "R5-7430U",
        display: "15.6-inch FULL HD",
      },
      inStock: true,
    },
    {
      id: "hp-gaming-victus-15-fa1139tx-8y6w3pa",
      name: "Laptop HP Gaming Victus 15-FA1139TX 8Y6W3PA",
      brand: "HP",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop HP Gaming Victus 15-FA1139TX 8Y6W3PA.webp",
      rating: 4.8,
      reviews: 180,
      discount: 10,
      isNew: true,
      specs: {
        storage: "512GB SSD",
        cpu: "Intel Core i5-12450H",
        display: "15.6-inch FULL HD",
      },
      inStock: true,
    },
    {
      id: "lenovo-ideapad-slim-3-14irh10-83l00008vn",
      name: "Laptop Lenovo IdeaPad Slim 3 14IRH10 83L00008VN",
      brand: "Lenovo",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop Lenovo IdeaPad Slim 3 14IRH10 83L00008VN.webp",
      rating: 4.8,
      reviews: 180,
      discount: 10,
      isNew: true,
      specs: {
        storage: "512GB SSD",
        cpu: "Intel Core i5-13420H",
        display: "14-inch WUXGA",
      },
      inStock: true,
    },
    {
      id: "msi-modern-14-c12mo-660vn",
      name: "Laptop MSI Modern 14 C12MO-660VN",
      brand: "MSI",
      price: 1099.99,
      image: "/assets/images/Laptops/Laptop MSI Modern 14 C12MO-660VN.webp",
      rating: 4.8,
      reviews: 180,
      discount: 10,
      isNew: true,
      specs: {
        storage: "512GB SSD",
        cpu: "Intel Core i5-1235U",
        display: "14-inch FULL HD",
      },
      inStock: true,
    },
    {
      id: "asus-gaming-vivobook-k3605zc-rp564w",
      name: "Latop Asus Gaming VivoBook K3605ZC-RP564W",
      brand: "Asus",
      price: 1099.99,
      image: "/assets/images/Laptops/Latop Asus Gaming VivoBook K3605ZC-RP564W.webp",
      rating: 4.8,
      reviews: 180,
      discount: 10,
      isNew: true,
      specs: {
        storage: "512GB SSD",
        cpu: "Intel Core i5-12500H",
        display: "16-inch WUXGA",
      },
      inStock: true,
    },
    {
      id: "macbook-air-m4-13-inch-2025",
      name: "MacBook Air M4 13 inch 2025",
      brand: "Apple",
      price: 1099.99,
      image: "/assets/images/Laptops/MacBook Air M4 13 inch 2025.webp",
      rating: 4.8,
      reviews: 180,
      discount: 10,
      isNew: true,
      specs: {
        storage: "256GB SSD",
        cpu: "Apple M4",
        display: "13.6-inch 2.5K",
      },
      inStock: true,
    },
  ];

  // Available brands for filtering
  const availableBrands = ["Apple", "Dell", "Asus", "Lenovo", "HP", "MSI"];

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
    setLaptopFilterOpen(!isLaptopFilterOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Page header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Laptops</h1>
            <p className="mt-1 text-sm text-gray-600">
              Browse our collection of the latest laptops for work, gaming, and study
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

export default ViewAllLaptop;