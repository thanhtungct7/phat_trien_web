import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const ShippingCalculator = ({ onShippingCostUpdate }) => {
  const [zipCode, setZipCode] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState(null);
  const [shippingOptions, setShippingOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
    setError(null);
  };

  const calculateShipping = async (e) => {
    e.preventDefault();
    
    // Basic ZIP code validation
    if (!zipCode || zipCode.length < 5) {
      setError("Please enter a valid ZIP code");
      return;
    }
    
    setIsCalculating(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock shipping options based on ZIP code
      const mockOptions = [
        {
          id: 1,
          name: "Standard Shipping",
          price: 5.99,
          estimatedDelivery: "3-5 business days"
        },
        {
          id: 2,
          name: "Express Shipping",
          price: 12.99,
          estimatedDelivery: "1-2 business days"
        },
        {
          id: 3,
          name: "Free Shipping",
          price: 0,
          estimatedDelivery: "5-7 business days",
          minimumOrder: 50
        }
      ];
      
      setShippingOptions(mockOptions);
    } catch (err) {
      setError("Failed to calculate shipping. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onShippingCostUpdate(option.price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Estimate Shipping</h2>
      </div>
      
      <div className="p-6">
        <form onSubmit={calculateShipping}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                label="ZIP Code"
                placeholder="Enter your ZIP code"
                value={zipCode}
                onChange={handleZipCodeChange}
                error={error}
                icon="MapPin"
                iconPosition="left"
                required
              />
            </div>
            <div className="sm:self-end">
              <Button
                type="submit"
                variant="secondary"
                isLoading={isCalculating}
                className="w-full sm:w-auto"
              >
                Calculate
              </Button>
            </div>
          </div>
        </form>
        
        {shippingOptions && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Available Shipping Options</h3>
            <div className="space-y-3">
              {shippingOptions.map(option => (
                <div 
                  key={option.id}
                  className={`
                    border rounded-md p-3 cursor-pointer transition-colors
                    ${selectedOption?.id === option.id 
                      ? 'border-primary-600 bg-primary-100' :'border-gray-200 hover:border-gray-300'}
                  `}
                  onClick={() => handleSelectOption(option)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`
                        w-4 h-4 rounded-full border flex items-center justify-center
                        ${selectedOption?.id === option.id 
                          ? 'border-primary-600' :'border-gray-400'}
                      `}>
                        {selectedOption?.id === option.id && (
                          <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                        )}
                      </div>
                      <span className="ml-2 font-medium text-gray-900">{option.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {option.price === 0 ? "FREE" : `$${option.price.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="mt-1 ml-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {option.estimatedDelivery}
                    </div>
                    {option.minimumOrder && (
                      <div className="text-xs text-primary-600 mt-1">
                        Free shipping on orders over ${option.minimumOrder}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingCalculator;