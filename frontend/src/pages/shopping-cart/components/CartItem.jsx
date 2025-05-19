import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    
    if (newQuantity > item.maxQuantity) {
      setError(`Sorry, only ${item.maxQuantity} units available`);
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setError(null);
    setIsUpdating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      onQuantityChange(item.id, newQuantity);
    } catch (err) {
      setError("Failed to update quantity. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      onRemove(item.id);
    } catch (err) {
      setError("Failed to remove item. Please try again.");
      setIsUpdating(false);
    }
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="p-4 border-b border-gray-200 relative">
      {isUpdating && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
          <div className="w-full h-full rounded-md overflow-hidden">
            <Image 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="sm:ml-4 flex-1">
          <div className="flex flex-col sm:flex-row justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
            
            <div className="mt-2 sm:mt-0 text-right">
              <p className="text-lg font-semibold text-gray-900">${itemTotal}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <div className="flex items-center">
              <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
              <div className="flex items-center border border-gray-200 rounded-md">
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={isUpdating || item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Icon name="Minus" size={16} />
                </button>
                
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  max={item.maxQuantity}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-12 text-center border-0 focus:ring-0"
                  aria-label={`Quantity for ${item.name}`}
                />
                
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isUpdating || item.quantity >= item.maxQuantity}
                  aria-label="Increase quantity"
                >
                  <Icon name="Plus" size={16} />
                </button>
              </div>
              
              {error && (
                <p className="text-xs text-error ml-2">{error}</p>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="small"
              icon="Trash2"
              className="mt-2 sm:mt-0 text-gray-600 hover:text-error"
              onClick={handleRemove}
              disabled={isUpdating}
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;