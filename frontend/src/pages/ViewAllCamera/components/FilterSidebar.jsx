import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const FilterSidebar = ({ 
  filters, 
  availableBrands, 
  onFilterChange, 
  onClearFilters,
  isMobile = false
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceInputs, setPriceInputs] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max
  });
  const [isApplying, setIsApplying] = useState(false);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
    setPriceInputs({
      min: filters.priceRange.min,
      max: filters.priceRange.max
    });
  }, [filters]);

  // Handle brand checkbox change
  const handleBrandChange = (brand) => {
    const newBrands = [...localFilters.brands];
    const brandIndex = newBrands.indexOf(brand);
    
    if (brandIndex === -1) {
      newBrands.push(brand);
    } else {
      newBrands.splice(brandIndex, 1);
    }
    
    const newFilters = {
      ...localFilters,
      brands: newBrands
    };
    
    setLocalFilters(newFilters);
    
    // Apply filters immediately
    applyFilters(newFilters);
  };

  // Handle price input change
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setPriceInputs({
      ...priceInputs,
      [type]: value
    });
  };

  // Apply price range when input loses focus
  const handlePriceBlur = () => {
    // Ensure min is not greater than max
    let min = priceInputs.min;
    let max = priceInputs.max;
    
    if (min > max) {
      min = max;
      setPriceInputs({ min, max });
    }
    
    const newFilters = {
      ...localFilters,
      priceRange: { min, max }
    };
    
    setLocalFilters(newFilters);
    
    // Apply filters
    applyFilters(newFilters);
  };

  // Apply filters with loading indicator
  const applyFilters = (newFilters) => {
    setIsApplying(true);
    
    // Simulate API delay
    setTimeout(() => {
      onFilterChange(newFilters);
      setIsApplying(false);
    }, 500);
  };

  // Clear all filters
  const handleClearFilters = () => {
    onClearFilters();
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${isMobile ? '' : 'sticky top-6'}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          {isApplying && (
            <Icon name="Loader" size={18} className="text-primary-600 animate-spin" />
          )}
        </div>
      </div>
      
      {/* Brand filter */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Brand</h3>
        <div className="space-y-2">
          {availableBrands.map(brand => (
            <div key={brand} className="flex items-center">
              <input
                id={`brand-${brand}`}
                name={`brand-${brand}`}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                checked={localFilters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <label htmlFor={`brand-${brand}`} className="ml-3 text-sm text-gray-600">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price range filter */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="flex items-center space-x-2">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="price-min"
              id="price-min"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full pl-7 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Min"
              value={priceInputs.min}
              onChange={(e) => handlePriceChange(e, 'min')}
              onBlur={handlePriceBlur}
              min="0"
              max={priceInputs.max}
            />
          </div>
          <span className="text-gray-500">-</span>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="price-max"
              id="price-max"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full pl-7 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Max"
              value={priceInputs.max}
              onChange={(e) => handlePriceChange(e, 'max')}
              onBlur={handlePriceBlur}
              min={priceInputs.min}
            />
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="p-4">
        <Button
          variant="ghost"
          size="small"
          className="w-full mb-2"
          onClick={handleClearFilters}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;