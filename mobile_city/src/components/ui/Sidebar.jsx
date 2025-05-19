import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from './Button';
import Input from './Input';

const Sidebar = ({
  variant = 'expanded',
  className = '',
  onClose,
  ...props
}) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    ratings: null,
  });
  const location = useLocation();

  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      subcategories: [
        { id: 'smartphones', name: 'Smartphones' },
        { id: 'laptops', name: 'Laptops' },
        { id: 'tablets', name: 'Tablets' },
        { id: 'accessories', name: 'Accessories' },
      ],
    },
    {
      id: 'clothing',
      name: 'Clothing',
      subcategories: [
        { id: 'mens', name: 'Men\'s' },
        { id: 'womens', name: 'Women\'s' },
        { id: 'kids', name: 'Kids' },
      ],
    },
    {
      id: 'home',
      name: 'Home & Garden',
      subcategories: [
        { id: 'furniture', name: 'Furniture' },
        { id: 'decor', name: 'Decor' },
        { id: 'kitchen', name: 'Kitchen' },
        { id: 'bath', name: 'Bath' },
      ],
    },
    {
      id: 'sports',
      name: 'Sports & Outdoors',
      subcategories: [
        { id: 'fitness', name: 'Fitness' },
        { id: 'camping', name: 'Camping' },
        { id: 'sports-equipment', name: 'Sports Equipment' },
      ],
    },
  ];

  const brands = [
    { id: 'apple', name: 'Apple' },
    { id: 'samsung', name: 'Samsung' },
    { id: 'nike', name: 'Nike' },
    { id: 'adidas', name: 'Adidas' },
    { id: 'ikea', name: 'IKEA' },
  ];

  const colors = [
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'red', name: 'Red', hex: '#FF0000' },
    { id: 'blue', name: 'Blue', hex: '#0000FF' },
    { id: 'green', name: 'Green', hex: '#00FF00' },
  ];

  const sizes = [
    { id: 'xs', name: 'XS' },
    { id: 's', name: 'S' },
    { id: 'm', name: 'M' },
    { id: 'l', name: 'L' },
    { id: 'xl', name: 'XL' },
  ];

  const ratings = [
    { id: 4, name: '4 Stars & Up' },
    { id: 3, name: '3 Stars & Up' },
    { id: 2, name: '2 Stars & Up' },
    { id: 1, name: '1 Star & Up' },
  ];

  useEffect(() => {
    // Set initial expanded state for categories
    const initialExpandedState = {};
    categories.forEach(category => {
      initialExpandedState[category.id] = false;
    });
    setExpandedCategories(initialExpandedState);
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value, 10) || 0;
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleFilterChange = (type, id) => {
    setSelectedFilters(prev => {
      if (type === 'ratings') {
        return { ...prev, [type]: id === prev[type] ? null : id };
      }
      
      const updatedFilters = [...prev[type]];
      const index = updatedFilters.indexOf(id);
      
      if (index === -1) {
        updatedFilters.push(id);
      } else {
        updatedFilters.splice(index, 1);
      }
      
      return { ...prev, [type]: updatedFilters };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      brands: [],
      colors: [],
      sizes: [],
      ratings: null,
    });
    setPriceRange({ min: 0, max: 1000 });
  };

  const baseClasses = 'bg-white';
  
  const variantClasses = {
    expanded: 'w-64 border-r border-gray-200',
    collapsed: 'w-16 border-r border-gray-200',
    'filter-panel': 'w-full md:w-72 border border-gray-200 rounded-lg shadow-sm',
  };

  const renderExpandedSidebar = () => (
    <div className={`${baseClasses} ${variantClasses.expanded} ${className} h-full overflow-y-auto`} {...props}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={clearAllFilters}
          >
            <span className="text-sm">Clear all</span>
          </button>
        </div>
        
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
          <ul className="space-y-2" role="tree">
            {categories.map(category => (
              <li key={category.id} role="treeitem" aria-expanded={expandedCategories[category.id]}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id={`category-${category.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                      checked={selectedFilters.categories.includes(category.id)}
                      onChange={() => handleFilterChange('categories', category.id)}
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-600">
                      {category.name}
                    </label>
                  </div>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => toggleCategory(category.id)}
                      aria-label={expandedCategories[category.id] ? `Collapse ${category.name}` : `Expand ${category.name}`}
                    >
                      <Icon name={expandedCategories[category.id] ? "ChevronDown" : "ChevronRight"} size={16} />
                    </button>
                  )}
                </div>
                
                {expandedCategories[category.id] && category.subcategories && (
                  <ul className="ml-6 mt-2 space-y-1" role="group">
                    {category.subcategories.map(subcategory => (
                      <li key={subcategory.id} role="treeitem">
                        <div className="flex items-center">
                          <input
                            id={`subcategory-${subcategory.id}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                            checked={selectedFilters.categories.includes(subcategory.id)}
                            onChange={() => handleFilterChange('categories', subcategory.id)}
                          />
                          <label htmlFor={`subcategory-${subcategory.id}`} className="ml-2 text-sm text-gray-600">
                            {subcategory.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={priceRange.min}
              onChange={(e) => handlePriceChange(e, 'min')}
              placeholder="Min"
              className="w-1/2"
            />
            <span className="text-gray-400">-</span>
            <Input
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(e, 'max')}
              placeholder="Max"
              className="w-1/2"
            />
          </div>
        </div>
        
        {/* Brands */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Brands</h3>
          <ul className="space-y-2">
            {brands.map(brand => (
              <li key={brand.id}>
                <div className="flex items-center">
                  <input
                    id={`brand-${brand.id}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                    checked={selectedFilters.brands.includes(brand.id)}
                    onChange={() => handleFilterChange('brands', brand.id)}
                  />
                  <label htmlFor={`brand-${brand.id}`} className="ml-2 text-sm text-gray-600">
                    {brand.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Colors */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <div key={color.id} className="flex flex-col items-center">
                <button
                  type="button"
                  className={`
                    h-8 w-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600
                    ${selectedFilters.colors.includes(color.id) ? 'border-primary-600' : 'border-gray-200'}
                  `}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleFilterChange('colors', color.id)}
                  aria-label={`Select ${color.name} color`}
                  aria-pressed={selectedFilters.colors.includes(color.id)}
                >
                  {selectedFilters.colors.includes(color.id) && (
                    <Icon 
                      name="Check" 
                      size={16} 
                      className={color.id === 'white' ? 'text-gray-900' : 'text-white'} 
                    />
                  )}
                </button>
                <span className="mt-1 text-xs text-gray-600">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sizes */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size.id}
                type="button"
                className={`
                  px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-600
                  ${selectedFilters.sizes.includes(size.id) 
                    ? 'bg-primary-100 border-primary-600 text-primary-600' :'border-gray-200 text-gray-600 hover:border-gray-300'}
                `}
                onClick={() => handleFilterChange('sizes', size.id)}
                aria-pressed={selectedFilters.sizes.includes(size.id)}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Ratings */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Ratings</h3>
          <ul className="space-y-2">
            {ratings.map(rating => (
              <li key={rating.id}>
                <div className="flex items-center">
                  <input
                    id={`rating-${rating.id}`}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                    checked={selectedFilters.ratings === rating.id}
                    onChange={() => handleFilterChange('ratings', rating.id)}
                  />
                  <label htmlFor={`rating-${rating.id}`} className="ml-2 text-sm text-gray-600 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < rating.id ? 'text-amber-500' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <span className="ml-1">{rating.name}</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <Button 
            variant="primary" 
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCollapsedSidebar = () => (
    <div className={`${baseClasses} ${variantClasses.collapsed} ${className} h-full overflow-y-auto`} {...props}>
      <div className="py-4">
        <div className="flex flex-col items-center space-y-6">
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-100"
            aria-label="Categories"
          >
            <Icon name="List" size={24} />
          </button>
          
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-100"
            aria-label="Price Range"
          >
            <Icon name="DollarSign" size={24} />
          </button>
          
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-100"
            aria-label="Brands"
          >
            <Icon name="Tag" size={24} />
          </button>
          
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-100"
            aria-label="Colors"
          >
            <Icon name="Palette" size={24} />
          </button>
          
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-100"
            aria-label="Sizes"
          >
            <Icon name="Ruler" size={24} />
          </button>
          
          <button
            type="button"
            className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-100"
            aria-label="Ratings"
          >
            <Icon name="Star" size={24} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderFilterPanel = () => (
    <div className={`${baseClasses} ${variantClasses['filter-panel']} ${className}`} {...props}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="flex space-x-2">
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-primary-600"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
            {onClose && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={onClose}
                aria-label="Close filters"
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>
        </div>
        
        {/* Active Filters */}
        {(selectedFilters.categories.length > 0 || 
          selectedFilters.brands.length > 0 || 
          selectedFilters.colors.length > 0 || 
          selectedFilters.sizes.length > 0 || 
          selectedFilters.ratings !== null) && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {selectedFilters.categories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId) || 
                                categories.flatMap(c => c.subcategories || []).find(s => s.id === categoryId);
                if (!category) return null;
                
                return (
                  <span 
                    key={`cat-${categoryId}`}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-100 text-primary-600"
                  >
                    {category.name}
                    <button
                      type="button"
                      className="ml-1 text-primary-600 hover:text-primary-700"
                      onClick={() => handleFilterChange('categories', categoryId)}
                      aria-label={`Remove ${category.name} filter`}
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                );
              })}
              
              {selectedFilters.brands.map(brandId => {
                const brand = brands.find(b => b.id === brandId);
                if (!brand) return null;
                
                return (
                  <span 
                    key={`brand-${brandId}`}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-100 text-primary-600"
                  >
                    {brand.name}
                    <button
                      type="button"
                      className="ml-1 text-primary-600 hover:text-primary-700"
                      onClick={() => handleFilterChange('brands', brandId)}
                      aria-label={`Remove ${brand.name} filter`}
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                );
              })}
              
              {selectedFilters.colors.map(colorId => {
                const color = colors.find(c => c.id === colorId);
                if (!color) return null;
                
                return (
                  <span 
                    key={`color-${colorId}`}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-100 text-primary-600"
                  >
                    {color.name}
                    <button
                      type="button"
                      className="ml-1 text-primary-600 hover:text-primary-700"
                      onClick={() => handleFilterChange('colors', colorId)}
                      aria-label={`Remove ${color.name} filter`}
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                );
              })}
              
              {selectedFilters.sizes.map(sizeId => {
                const size = sizes.find(s => s.id === sizeId);
                if (!size) return null;
                
                return (
                  <span 
                    key={`size-${sizeId}`}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-100 text-primary-600"
                  >
                    {size.name}
                    <button
                      type="button"
                      className="ml-1 text-primary-600 hover:text-primary-700"
                      onClick={() => handleFilterChange('sizes', sizeId)}
                      aria-label={`Remove ${size.name} filter`}
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </span>
                );
              })}
              
              {selectedFilters.ratings !== null && (
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-100 text-primary-600"
                >
                  {ratings.find(r => r.id === selectedFilters.ratings)?.name}
                  <button
                    type="button"
                    className="ml-1 text-primary-600 hover:text-primary-700"
                    onClick={() => handleFilterChange('ratings', selectedFilters.ratings)}
                    aria-label={`Remove rating filter`}
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Filter Sections */}
        <div className="space-y-4">
          {/* Categories */}
          <details className="group" open>
            {/* Content for categories detail */}
          </details>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'collapsed':
      return renderCollapsedSidebar();
    case 'filter-panel':
      return renderFilterPanel();
    default:
      return renderExpandedSidebar();
  }
};

export default Sidebar;