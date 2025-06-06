import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import ShippingCalculator from "./components/ShippingCalculator";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    // Simulate loading cart data from localStorage or API
    const fetchCartData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock cart data
        const mockCartData = [
          {
            id: 1,
            name: "iPhone 13 Pro Max",
            price: 1099.99,
            quantity: 1,
            maxQuantity: 10,
            image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "6.7-inch Super Retina XDR display with ProMotion, A15 Bionic chip, 128GB storage",
          },
          {
            id: 2,
            name: "Samsung Galaxy S22 Ultra",
            price: 1199.99,
            quantity: 1,
            maxQuantity: 5,
            image: "https://images.pexels.com/photos/11772535/pexels-photo-11772535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 1, 256GB storage",
          },
          {
            id: 3,
            name: "Google Pixel 6 Pro",
            price: 899.99,
            quantity: 2,
            maxQuantity: 8,
            image: "https://images.pexels.com/photos/12464365/pexels-photo-12464365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "6.7-inch LTPO OLED display, Google Tensor chip, 128GB storage",
          }
        ];
        
        setCartItems(mockCartData);
        calculateTotals(mockCartData);
      } catch (err) {
        setError("Failed to load cart items. Please try again later.");
        console.error("Error fetching cart data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const calculateTotals = (items) => {
    const itemsSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const estimatedTax = itemsSubtotal * 0.08; // 8% tax rate
    
    setSubtotal(itemsSubtotal);
    setTax(estimatedTax);
    setTotal(itemsSubtotal + estimatedTax + shippingCost);
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      calculateTotals(updatedItems);
      return updatedItems;
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      calculateTotals(updatedItems);
      return updatedItems;
    });
  };

  const handleShippingCostUpdate = (cost) => {
    setShippingCost(cost);
    setTotal(subtotal + tax + cost);
  };

  // Skeleton loader for cart items
  const CartItemSkeleton = () => (
    <div className="animate-pulse flex p-4 border-b border-gray-200">
      <div className="bg-gray-200 h-24 w-24 rounded"></div>
      <div className="ml-4 flex-1">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-8"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8" id="main-content">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <div className="flex items-center mt-2">
            <Link to="/homepage" className="text-primary-600 hover:text-primary-700 flex items-center">
              <Icon name="Home" size={16} className="mr-1" />
              Home
            </Link>
            <Icon name="ChevronRight" size={16} className="mx-2 text-gray-400" />
            <span className="text-gray-600">Shopping Cart</span>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            {[1, 2, 3].map((i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Icon name="AlertCircle" size={48} className="mx-auto text-error mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button 
              variant="primary" 
              onClick={() => window.location.reload()}
              icon="RefreshCw"
            >
              Try Again
            </Button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <Icon name="ShoppingCart" size={96} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/phonehone-listing-page">
              <Button 
                variant="primary" 
                icon="ShoppingBag"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items ({cartItems.length})</h2>
                </div>
                
                {cartItems.map(item => (
                  <CartItem 
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
              
              <ShippingCalculator onShippingCostUpdate={handleShippingCostUpdate} />
            </div>
            
            <div className="lg:col-span-1 mt-6 lg:mt-0">
              <CartSummary 
                subtotal={subtotal}
                tax={tax}
                shipping={shippingCost}
                total={total}
              />
              
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Icon name="Truck" size={20} className="text-gray-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Shipping Information</h4>
                      <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Icon name="RotateCcw" size={20} className="text-gray-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Returns & Exchanges</h4>
                      <p className="text-sm text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Icon name="HelpCircle" size={20} className="text-gray-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Customer Support</h4>
                      <p className="text-sm text-gray-600">Available 24/7 at support@mobilecity.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ShoppingCart;