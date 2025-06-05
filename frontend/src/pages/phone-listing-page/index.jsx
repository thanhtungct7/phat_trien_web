import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

// Components
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
// import FilterSidebar from "./components/FilterSidebar";
import ProductSkeleton from "./components/ProductSkeleton";

const PhoneListingPage = () => {
  const { brand: selectedBrandFromParams } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedBrandFromQuery = queryParams.get('brand');
  const initialBrand = selectedBrandFromParams || selectedBrandFromQuery;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brands: initialBrand ? [initialBrand] : [],
    priceRange: { min: 0, max: 2000 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const productsPerPage = 12;

  // Mock data for products
  const mockProducts = [
    { id: 1, name: "iPhone 13 Pro", brand: "Apple", price: 999, salePrice: 899, image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", rating: 4.8, specs: { storage: "128GB", screenSize: "6.1 inches", camera: "12MP Triple", battery: "3095 mAh" }, inStock: true },
    { id: 2, name: "Samsung Galaxy S21", brand: "Samsung", price: 799, salePrice: null, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", rating: 4.7, specs: { storage: "256GB", screenSize: "6.2 inches", camera: "64MP Triple", battery: "4000 mAh" }, inStock: true },
    { id: 3, name: "Google Pixel 6", brand: "Google", price: 599, salePrice: 549, image: "https://images.pexels.com/photos/12576276/pexels-photo-12576276.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.6, specs: { storage: "128GB", screenSize: "6.4 inches", camera: "50MP Dual", battery: "4614 mAh" }, inStock: true },
    { id: 4, name: "OnePlus 9 Pro", brand: "OnePlus", price: 899, salePrice: 799, image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.5, specs: { storage: "256GB", screenSize: "6.7 inches", camera: "48MP Quad", battery: "4500 mAh" }, inStock: true },
    { id: 5, name: "Xiaomi Mi 11", brand: "Xiaomi", price: 749, salePrice: 699, image: "https://images.pexels.com/photos/13438611/pexels-photo-13438611.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.4, specs: { storage: "128GB", screenSize: "6.81 inches", camera: "108MP Triple", battery: "4600 mAh" }, inStock: false },
    { id: 6, name: "iPhone 12", brand: "Apple", price: 799, salePrice: 749, image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", rating: 4.6, specs: { storage: "64GB", screenSize: "6.1 inches", camera: "12MP Dual", battery: "2815 mAh" }, inStock: true },
    { id: 7, name: "Samsung Galaxy Note 20", brand: "Samsung", price: 999, salePrice: 899, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", rating: 4.5, specs: { storage: "256GB", screenSize: "6.7 inches", camera: "64MP Triple", battery: "4300 mAh" }, inStock: true },
    { id: 8, name: "Google Pixel 5", brand: "Google", price: 699, salePrice: 649, image: "https://images.pexels.com/photos/13438612/pexels-photo-13438612.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.4, specs: { storage: "128GB", screenSize: "6.0 inches", camera: "12.2MP Dual", battery: "4080 mAh" }, inStock: true },
    { id: 9, name: "OnePlus 8T", brand: "OnePlus", price: 749, salePrice: 699, image: "https://images.pexels.com/photos/13438613/pexels-photo-13438613.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.3, specs: { storage: "128GB", screenSize: "6.55 inches", camera: "48MP Quad", battery: "4500 mAh" }, inStock: true },
    { id: 10, name: "Xiaomi Redmi Note 10 Pro", brand: "Xiaomi", price: 299, salePrice: 279, image: "https://images.pexels.com/photos/13438614/pexels-photo-13438614.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.2, specs: { storage: "128GB", screenSize: "6.67 inches", camera: "108MP Quad", battery: "5020 mAh" }, inStock: true },
    { id: 11, name: "iPhone SE (2020)", brand: "Apple", price: 399, salePrice: 349, image: "https://images.unsplash.com/photo-1592286927505-1def25115481?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", rating: 4.1, specs: { storage: "64GB", screenSize: "4.7 inches", camera: "12MP", battery: "1821 mAh" }, inStock: true },
    { id: 12, name: "Samsung Galaxy A52", brand: "Samsung", price: 399, salePrice: 379, image: "https://images.pexels.com/photos/13438615/pexels-photo-13438615.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.0, specs: { storage: "128GB", screenSize: "6.5 inches", camera: "64MP Quad", battery: "4500 mAh" }, inStock: true },
    { id: 13, name: "Google Pixel 4a", brand: "Google", price: 349, salePrice: 299, image: "https://images.pexels.com/photos/13438616/pexels-photo-13438616.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.2, specs: { storage: "128GB", screenSize: "5.81 inches", camera: "12.2MP", battery: "3140 mAh" }, inStock: false },
    { id: 14, name: "OnePlus Nord", brand: "OnePlus", price: 399, salePrice: 379, image: "https://images.pexels.com/photos/13438617/pexels-photo-13438617.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.3, specs: { storage: "128GB", screenSize: "6.44 inches", camera: "48MP Quad", battery: "4115 mAh" }, inStock: true },
    { id: 15, name: "Xiaomi Poco F3", brand: "Xiaomi", price: 349, salePrice: 329, image: "https://images.pexels.com/photos/13438618/pexels-photo-13438618.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.4, specs: { storage: "128GB", screenSize: "6.67 inches", camera: "48MP Triple", battery: "4520 mAh" }, inStock: true },
    { id: 16, name: "iPhone 11", brand: "Apple", price: 599, salePrice: 549, image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80", rating: 4.5, specs: { storage: "64GB", screenSize: "6.1 inches", camera: "12MP Dual", battery: "3110 mAh" }, inStock: true },
    { id: 17, name: "Samsung Galaxy Z Fold 3", brand: "Samsung", price: 1799, salePrice: 1699, image: "https://images.pexels.com/photos/13438619/pexels-photo-13438619.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.6, specs: { storage: "256GB", screenSize: "7.6 inches", camera: "12MP Triple", battery: "4400 mAh" }, inStock: true },
    { id: 18, name: "Google Pixel 5a", brand: "Google", price: 449, salePrice: 399, image: "https://images.pexels.com/photos/13438620/pexels-photo-13438620.jpeg?auto=compress&cs=tinysrgb&w=1000", rating: 4.1, specs: { storage: "128GB", screenSize: "6.34 inches", camera: "12.2MP Dual", battery: "4680 mAh" }, inStock: true },
  ];

  // Available brands for filtering
  const availableBrands = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"];

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      let filteredProducts = [...mockProducts];

      // Lọc theo hãng từ URL params hoặc query params
      const selectedBrand = selectedBrandFromParams || selectedBrandFromQuery;
      if (selectedBrand) {
        filteredProducts = filteredProducts.filter(product =>
          product.brand.toLowerCase() === selectedBrand.toLowerCase()
        );
        // Cập nhật bộ lọc state để sidebar hiển thị đúng
        setFilters(prevFilters => ({
          ...prevFilters,
          brands: [selectedBrand]
        }));
      } else {
        // Áp dụng bộ lọc hãng thông thường từ sidebar
        if (filters.brands.length > 0) {
          filteredProducts = filteredProducts.filter(product =>
            filters.brands.includes(product.brand)
          );
        }
      }

      // Áp dụng bộ lọc giá
      filteredProducts = filteredProducts.filter(product =>
        (product.salePrice || product.price) >= filters.priceRange.min &&
        (product.salePrice || product.price) <= filters.priceRange.max
      );

      // Áp dụng sắp xếp
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
          break;
      }

      // Phân trang
      const totalFilteredPages = Math.ceil(filteredProducts.length / productsPerPage);
      setTotalPages(totalFilteredPages);
      if (currentPage > totalFilteredPages) {
        setCurrentPage(1);
      }
      const startIndex = (currentPage - 1) * productsPerPage;
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

      setProducts(paginatedProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters, currentPage, sortBy, selectedBrandFromParams, selectedBrandFromQuery]);

  const handleFilterChange = (newFilters) => {
    // Nếu bộ lọc brands thay đổi, cập nhật URL để đồng bộ (sử dụng query params)
    if (newFilters.brands !== filters.brands) {
      const searchParams = new URLSearchParams();
      if (newFilters.brands.length > 0) {
        searchParams.set('brand', newFilters.brands[0]); // Chỉ lấy hãng đầu tiên nếu có nhiều
      } else {
        searchParams.delete('brand');
      }
      navigate(`/phone-listing-page?${searchParams.toString()}`, { replace: true });
    }
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: { min: 0, max: 2000 },
    });
    const searchParams = new URLSearchParams();
    navigate(`/phone-listing-page?${searchParams.toString()}`, { replace: true });
    setCurrentPage(1);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Page header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Mobile Phones</h1>
            <p className="mt-1 text-sm text-gray-600">
              Browse our collection of the latest mobile phones
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
                selectedBrand={initialBrand}
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
            {isMobileFilterOpen && (
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
                      selectedBrand={initialBrand}
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
                    `Showing ${(currentPage - 1) * productsPerPage + 1}-${Math.min(currentPage * productsPerPage, mockProducts.length)} of ${mockProducts.length} products`
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
                          onClick={() => handleFilterChange({ ...filters, brands: filters.brands.filter(b => b !== brand) })}
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
                          onClick={() => handleFilterChange({ ...filters, priceRange: { min: 0, max: 2000 } })}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-600 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                        >
                          <span className="sr-only">Remove price filter</span>
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    )}
                    <Button variant="ghost" size="small" onClick={clearFilters}>
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

export default PhoneListingPage;