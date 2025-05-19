import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const ProductInfo = ({ product, onAddToCart, quantity, onQuantityChange }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);
  const [addToCartError, setAddToCartError] = useState(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleAddToCart = () => {
    // Simulate potential error (1 in 10 chance)
    if (Math.random() < 0.1) {
      setAddToCartError("Unable to add to cart. Please try again.");
      setTimeout(() => setAddToCartError(null), 3000);
      return;
    }
    
    setAddToCartError(null);
    onAddToCart();
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            {[...Array(5)].map((_, i) => (
              <Icon 
                key={i} 
                name="Star" 
                size={18} 
                className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-600">
            {product.reviewCount} reviews
          </span>
        </div>
        <div className="flex items-baseline mb-4">
          {product.discountPrice ? (
            <>
              <span className="text-2xl font-bold text-gray-900">${product.discountPrice}</span>
              <span className="ml-2 text-lg text-gray-500 line-through">${product.price}</span>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
                Save ${(product.price - product.discountPrice).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          )}
        </div>
        <div className="flex items-center mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.availability === "In Stock" ?"bg-green-100 text-green-800" :"bg-red-100 text-red-800"
          }`}>
            <span className={`w-2 h-2 rounded-full mr-1 ${
              product.availability === "In Stock" ? "bg-green-600" : "bg-red-600"
            }`}></span>
            {product.availability}
          </span>
          <span className="ml-4 text-sm text-gray-600">SKU: {product.sku}</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700">{product.shortDescription}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-2">Key Features</h2>
        <ul className="space-y-1">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Icon name="Check" size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-2">Color</h2>
        <div className="flex space-x-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              className={`relative w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 ${
                selectedColor.name === color.name ? 'ring-2 ring-primary-600 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: color.code }}
              onClick={() => handleColorSelect(color)}
              aria-label={`Select ${color.name} color`}
              aria-pressed={selectedColor.name === color.name}
            >
              {selectedColor.name === color.name && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Icon 
                    name="Check" 
                    size={16} 
                    className={color.name.toLowerCase().includes('white') ? 'text-gray-900' : 'text-white'} 
                  />
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-1 text-sm text-gray-600">Selected: {selectedColor.name}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-2">Storage</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {product.storage.map((option) => (
            <button
              key={option.size}
              className={`px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                selectedStorage.size === option.size
                  ? 'bg-primary-100 border-primary-600 text-primary-700' :'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleStorageSelect(option)}
              aria-pressed={selectedStorage.size === option.size}
            >
              {option.size}
              <span className="block text-xs mt-1">${option.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-2">Quantity</h2>
        <div className="flex items-center">
          <button
            className="w-10 h-10 rounded-l-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600"
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Icon name="Minus" size={16} />
          </button>
          <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center text-gray-900 font-medium">
            {quantity}
          </div>
          <button
            className="w-10 h-10 rounded-r-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600"
            onClick={handleQuantityIncrease}
            aria-label="Increase quantity"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
      </div>

      {addToCartError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-center">
          <Icon name="AlertCircle" size={20} className="mr-2 flex-shrink-0" />
          <span className="text-sm">{addToCartError}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <Button
          variant="primary"
          size="large"
          icon="ShoppingCart"
          className="flex-1"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="large"
          icon="Heart"
          className="flex-1 sm:flex-none"
        >
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;