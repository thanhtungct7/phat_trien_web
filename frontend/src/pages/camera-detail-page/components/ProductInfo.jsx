import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const ProductInfo = ({ product, onAddToCart, quantity, onQuantityChange }) => {
  const [addToCartError, setAddToCartError] = useState(null);

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
                className={i < Math.floor(product.rating || 0) ? "text-amber-500" : "text-gray-300"} 
                fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">{product.rating || 0}</span>
          </div>
          <span className="text-sm text-gray-600">
            {product.reviewCount || 0} reviews
          </span>
        </div>
        <div className="flex items-baseline mb-4">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            In Stock
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700">{product.description}</p>
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