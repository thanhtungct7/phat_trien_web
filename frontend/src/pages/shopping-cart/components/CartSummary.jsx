import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";

const CartSummary = ({ subtotal, tax, shipping, total }) => {
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">${formatPrice(subtotal)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Tax</span>
            <span className="text-gray-900 font-medium">${formatPrice(tax)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900 font-medium">
              {shipping > 0 ? `$${formatPrice(shipping)}` : "Calculated at checkout"}
            </span>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-semibold text-gray-900">${formatPrice(total)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            variant="primary"
            className="w-full py-3"
            icon="CreditCard"
          >
            Proceed to Checkout
          </Button>
          
          <div className="mt-4">
            <Link 
              to="/phonePage"
              className="inline-flex items-center justify-center w-full text-primary-600 hover:text-primary-700 font-medium"
            >
              <span className="mr-2">Continue Shopping</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">We Accept</h3>
          <div className="flex space-x-2">
            <div className="p-2 border border-gray-200 rounded">
              <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="24" rx="4" fill="#016FD0"/>
                <path d="M18.5 15H21.5V9H18.5V15Z" fill="white"/>
                <path d="M18.9 7.5C19.3 7.1 19.9 6.9 20.5 6.9C21.1 6.9 21.7 7.1 22.1 7.5C22.5 7.9 22.7 8.4 22.7 9C22.7 9.6 22.5 10.1 22.1 10.5C21.7 10.9 21.1 11.1 20.5 11.1C19.9 11.1 19.3 10.9 18.9 10.5C18.5 10.1 18.3 9.6 18.3 9C18.3 8.4 18.5 7.9 18.9 7.5Z" fill="white"/>
                <path d="M26.5 9.8C26.5 9.3 26.2 9 25.7 9H23.5V15H25.7C26.2 15 26.5 14.7 26.5 14.2V9.8Z" fill="white"/>
                <path d="M13.5 9L11.3 15H13.7L14 14H16L16.3 15H18.7L16.5 9H13.5ZM14.5 12.5L15 11L15.5 12.5H14.5Z" fill="white"/>
              </svg>
            </div>
            <div className="p-2 border border-gray-200 rounded">
              <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="24" rx="4" fill="#EB001B" fillOpacity="0.15"/>
                <path d="M15 12C15 9.8 16.8 8 19 8H21C23.2 8 25 9.8 25 12C25 14.2 23.2 16 21 16H19C16.8 16 15 14.2 15 12Z" fill="#EB001B"/>
                <path d="M25 12C25 9.8 26.8 8 29 8H31C33.2 8 35 9.8 35 12C35 14.2 33.2 16 31 16H29C26.8 16 25 14.2 25 12Z" fill="#F79E1B"/>
                <path d="M22 12C22 10.3 23.3 9 25 9C26.7 9 28 10.3 28 12C28 13.7 26.7 15 25 15C23.3 15 22 13.7 22 12Z" fill="#FF5F00"/>
              </svg>
            </div>
            <div className="p-2 border border-gray-200 rounded">
              <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="24" rx="4" fill="#1434CB"/>
                <path d="M15 9.5L13 15H15.2L15.5 14H17.5L17.8 15H20L18 9.5H15ZM16 11L16.5 13H16L16 11Z" fill="white"/>
                <path d="M20 9.5V15H22V12.8L24 15H26.5L24 12.3L26.5 9.5H24L22 11.7V9.5H20Z" fill="white"/>
                <path d="M26.8 9.5L25 15H27.2L29 9.5H26.8Z" fill="white"/>
              </svg>
            </div>
            <div className="p-2 border border-gray-200 rounded">
              <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="24" rx="4" fill="#F7F7F7"/>
                <path d="M14.5 8.5C12 8.5 10 10.5 10 13C10 15.5 12 17.5 14.5 17.5C17 17.5 19 15.5 19 13C19 10.5 17 8.5 14.5 8.5Z" fill="#009DE2"/>
                <path d="M25.5 8.5C23 8.5 21 10.5 21 13C21 15.5 23 17.5 25.5 17.5C28 17.5 30 15.5 30 13C30 10.5 28 8.5 25.5 8.5Z" fill="#009DE2"/>
              </svg>
            </div>
          </div>
          
          <p className="mt-4 text-xs text-gray-600">
            Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;